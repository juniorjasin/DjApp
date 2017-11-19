import pymysql
import datetime
import os
import logging
from util import exception

# mysql_config = {
#     'host': 'localhost',
#     'db': 'djapp',
#     'user': 'dev',
#     'passwd': 'changeme'
# }


logger = logging.getLogger('app')
logger.setLevel(logging.DEBUG)
logger.propagate = False
ch = logging.StreamHandler()
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)

# """
mysql_config = {
    'host': os.environ['MYSQL_ENDPOINT'],
    'db': os.environ['MYSQL_DATABASE'],
    'user': os.environ['MYSQL_USER'],
    'passwd': os.environ['MYSQL_PASSWORD'],
    'port': 3306
    }
# """

class MySqlRepo:
    def __init__(self):
        self.cnx=None
        try:        
            print mysql_config
            self.cnx = pymysql.connect(**mysql_config)    
            print self.cnx    

        except pymysql.Error as err:
            logger.error("No se pudo conectar a la base de datos, configuracion: {}, error mysql: {}".format(mysql_config, err))
            raise exception.InternalServerError("fallo conexion con base de datos")
        except Exception as ex:
            pass

    def obtener_boliches(self,lat,lon):        
        logger.debug("Comienza obtener obtener_boliches")
        # print "repo obtener_boliches, lat = {}, lon={}".format(lat,lon)
        boliches = []        
        
        try:        
            cursor = self.cnx.cursor()
            query = "SELECT id, nombre, latitud, longitud, id_tema_actual FROM boliches"
            cursor.execute(query)
            rows = cursor.fetchall()
            self.cnx.commit()
            cursor.close()
            if rows == None:            
                return boliches
            else:
                for row in rows:
                    boliche = {"id":row[0],"nombre":row[1], "latitud": row[2], "longitud": row[3],"id_tema_actual":row[4]}
                    boliches.append(boliche)
        except pymysql.Error as err:
            msg = "Failed init database: {}".format(err)
            raise exception.InternalServerError("fallo query obtener_boliches")
        return boliches
    
    def insertar_boliche(self,nombre,lat,lon):
        logger.debug("Comienza obtener obtener_tema_actual")
        logger.debug("Intenta insertar: nombre = {}, lat = {}, lon={}".format(nombre,lat,lon) )
        # print "repo insertar_boliches, nombre = {}, lat = {}, lon={}".format(nombre,lat,lon)
        result = []

        try:
            cursor = self.cnx.cursor()
            query = "INSERT INTO boliches (nombre,latitud,longitud) VALUES (%s,%s,%s)"
            values = (nombre,lat,lon)
            # print values
            cursor.execute(query,values)
            self.cnx.commit()
            cursor.close()
            respuesta = {"code":"200", "title":"OK", "detail":"se pudo insertar en la base de datos"}
            result.append(respuesta)
        except pymysql.Error as err:
            # error = {"code":"400", "title":"FAIL", "detail":"No se pudo insertar en la base de datos"}
            # result.append(error)
            raise exception.InternalServerError("fallo insertar_boliche")
        return result

    
    # notar que puede retornar el tema con fecha mas actual pero hay que verificar que corresponda al
    # dia actual, sino puede ser el ultimo que se inserto otro dia
    def obtener_tema_actual(self, id_boliche):
        logger.debug("Comienza obtener obtener_tema_actual")

        tema = []
        try:
            cursor = self.cnx.cursor()
            query = "SELECT temas.id, temas.nombre FROM  (SELECT id_tema FROM temas_boliches WHERE id_boliche = {} ORDER BY id DESC LIMIT 1) as q JOIN temas ON q.id_tema = temas.id".format(id_boliche)
            cursor.execute(query)
            rows = cursor.fetchall()
            # print rows
            # print type(rows)
            cursor.close()

            for row in rows:
                t = {"id":row[0],"nombre":row[1]}
                tema.append(t)
            logger.debug("Array de likes: {}".format(tema))

        except pymysql.Error as err:
             logger.error("fallo la consulta en obtener_tema_actual")
             raise exception.InternalServerError("fallo obtener_tema_actual")

        return tema

    def insertar_tema_actual(self,id_boliche, id_tema):
        result = []
        try:
            cursor = self.cnx.cursor()
            query = "INSERT INTO temas_boliches (id_boliche, id_tema) VALUES (%s,%s)"
            values = (id_boliche,id_tema)
            cursor.execute(query,values)
            self.cnx.commit()
            cursor.close()
            respuesta = {"code":"200", "title":"OK", "detail":"se pudo insertar el tema en la base de datos"}
            result.append(respuesta)
        except pymysql.Error as err:
            raise exception.InternalServerError("fallo insertar_tema_actual")
        return result


    def insertar_like(self,id_boliche,id_tema, tipo_like):
        # print "repo insertar_boliches, nombre = {}, lat = {}, lon={}".format(nombre,lat,lon)
        result = []
        try:
            cursor = self.cnx.cursor()
            query = "INSERT INTO likes (id_boliche, id_tema, fecha_hora, tipo_like) VALUES (%s,%s,%s,%s)"
            values = (id_boliche,id_tema, datetime.datetime.now(), tipo_like)
            # print values
            cursor.execute(query,values)
            self.cnx.commit()
            cursor.close()
            respuesta = {"code":"200", "title":"OK", "detail":"se pudo insertar en la base de datos"}
            result.append(respuesta)
        except pymysql.Error as err:
            # error = {"code":"400", "title":"FAIL", "detail":"No se pudo insertar en la base de datos"}
            # result.append(error)
            raise exception.InternalServerError("fallo insertar_like")
        return result



    def insertar_propuesta(self, id_boliche, id_tema):

        logger.debug("Comienza obtener insertar_propuesta")
        # print "repo insertar_boliches, nombre = {}, lat = {}, lon={}".format(nombre,lat,lon)
        result = []
        try:
            cursor = self.cnx.cursor()
            query = "INSERT INTO votos_propuestas (id_boliche, id_tema) VALUES (%s,%s)"
            values = (id_boliche,id_tema)
            cursor.execute(query,values)
            self.cnx.commit()
            cursor.close()
            respuesta = {"code":"200", "title":"OK", "detail":"se pudo insertar en la base de datos"}
            result.append(respuesta)
        except pymysql.Error as err:
            print err
            raise exception.InternalServerError("fallo insertar_propuesta")

        return [respuesta]



    def obtener_estadisticas(self, id_boliche):
        
        logger.debug("Comienza obtener_estadisticas")

        likes_tema_actual = []
        propuestas = []
        
        # como hago esto en menos pasos ?
        ta = self.obtener_tema_actual(id_boliche)
        tema_actual = ta[0]
        id_tema_actual = tema_actual["id"]
        logger.debug("obtener_estadisticas: tema_actual: {} en boliche: {}".format(tema_actual["id"], id_boliche))

        try:

            # Consulta: likes
            cursor = self.cnx.cursor()
            query = "SELECT COUNT(*), temas.nombre, tipo_like, id_tema FROM likes JOIN temas on likes.id_tema = temas.id WHERE id_boliche = %s AND id_tema = %s GROUP BY id_tema, temas.nombre, id_boliche, tipo_like"
            values = (id_boliche, id_tema_actual)
            cursor.execute(query,values)
            self.cnx.commit()   
            
            rows = cursor.fetchall()
            logger.debug("tupla de likes que obtengo de la base de datos: {}".format(rows))
            
            cant_likes = 0
            cant_not_likes = 0
            nombre = ""

            for row in rows:

                nombre = row[1]
                if row[2] == 'like':
                    cant_likes = row[0]
                else:
                    cant_not_likes = row[0]

                # like_tema = {"nombre":row[1], "id_tema":row[3], "id_boliche":id_boliche,"tipo":row[2], "cantidad":row[0]}
                # likes_tema_actual.append(like_tema)

            likes_tema_actual = {"id_tema":id_tema_actual, "nombre": nombre, "id_boliche":id_boliche, "likes":cant_likes, "not_like":cant_not_likes}
            logger.debug("Array de likes del tema actual: {}".format(likes_tema_actual))

            # Consulta: propuestas
            query = "SELECT COUNT(*), temas_propuestos.nombre, votos_propuestas.id_tema FROM votos_propuestas JOIN temas_propuestos on votos_propuestas.id_tema = temas_propuestos.id WHERE id_boliche = %s GROUP BY votos_propuestas.id_tema, temas_propuestos.nombre, id_boliche"
            values = (id_boliche)
            cursor.execute(query,values)
            self.cnx.commit()  

            rows = cursor.fetchall()
            logger.debug("tupla de propuestas que obtengo de la base de datos: {}".format(rows))
            for row in rows:
                propuesta_tema = {"nombre":row[1], "id_tema":row[2], "id_boliche":id_boliche, "cantidad":row[0]}
                propuestas.append(propuesta_tema)
            logger.debug("Array de propuestas: {}".format(propuestas))


            cursor.close()

        except pymysql.Error as err:
             logger.error("fallo una de las query para obtener las estadisticas")
             raise exception.InternalServerError("fallo obtener estadisticas")

        return {"tema_actual":likes_tema_actual, "prouestas":propuestas}

    def obtener_temas_propuestos(self, id_boliche):        
        temas_propuestos = []
        cantidad_temas = 4
        try:        
            cursor = self.cnx.cursor()
            query = "SELECT id, nombre FROM temas ORDER BY RAND() LIMIT " + str(cantidad_temas)
            cursor.execute(query)
            rows = cursor.fetchall()
            self.cnx.commit()
            cursor.close()
            if rows == None:            
                return temas_propuestos
            else:
                for row in rows:
                    tema_propuesto = {"id":row[0],"nombre":row[1]}
                    temas_propuestos.append(tema_propuesto)
        except pymysql.Error as err:
            msg = "Failed init database: {}".format(err)
            raise exception.InternalServerError("fallo conexion con base de datos")
        return temas_propuestos
    
    
    def insertar_tema_propuesto(self,nombre_tema,id_boliche):
        pass
