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
    'passwd': os.environ['MYSQL_PASSWORD']
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

        temas = []
        try:
            cursor = self.cnx.cursor()
            query = "SELECT temas.id, temas.nombre FROM  (SELECT id_tema FROM temas_boliches WHERE id_boliche = {} ORDER BY id DESC LIMIT 1) as q JOIN temas ON q.id_tema = temas.id".format(id_boliche)
            cursor.execute(query)
            rows = cursor.fetchall()
            # print rows
            # print type(rows)
            cursor.close()

            for row in rows:
                tema = {"id":row[0],"nombre":row[1]}
                temas.append(tema)
            #   temas.append(tema)
            #   pass
        except pymysql.Error as err:
             raise exception.InternalServerError("fallo obtener_tema_actual")

        return temas

    def insertar_tema_actual(self,nombre,lat,lon):
        logger.debug("Comienza obtener insertar_propuesta")
        logger.debug("Intento insertar nombre = {}, lat = {}, lon={}".format(nombre,lat,lon) )
        return {"status":"Ok"}


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
        
        # Retorno
        '''
        {
            "estadisticas": {
                "likes": [
                    {
                        "cantidad": 3,
                        "id_boliche": "1",
                        "id_tema": 1,
                        "nombre": "tema1",
                        "tipo": "like"
                    },
                    {
                        "cantidad": 1,
                        "id_boliche": "1",
                        "id_tema": 1,
                        "nombre": "tema1",
                        "tipo": "not-like"
                    }
                ],
                "prouestas": [
                    {
                        "cantidad": 1,
                        "id_boliche": "1",
                        "id_tema": 1,
                        "nombre": "tema1"
                    },
                    {
                        "cantidad": 1,
                        "id_boliche": "1",
                        "id_tema": 2,
                        "nombre": "tema2"
                    },
                    {
                        "cantidad": 1,
                        "id_boliche": "1",
                        "id_tema": 3,
                        "nombre": "tema3"
                    }
                ]
            }
        }
        '''

        likes = []
        propuestas = []
        
        logger.debug("Comienza obtener_estadisticas")
        try:

            # Consulta: likes
            cursor = self.cnx.cursor()
            query = "SELECT COUNT(*), temas.nombre, tipo_like, id_tema FROM likes JOIN temas on likes.id_tema = temas.id WHERE id_boliche = %s GROUP BY id_tema, temas.nombre, id_boliche, tipo_like"
            values = (id_boliche)
            cursor.execute(query,values)
            self.cnx.commit()   
            
            rows = cursor.fetchall()
            logger.debug("tupla de likes que obtengo de la base de datos: {}".format(rows))
            for row in rows:
                like_tema = {"nombre":row[1], "id_tema":row[3], "id_boliche":id_boliche,"tipo":row[2], "cantidad":row[0]}
                likes.append(like_tema)
            logger.debug("Array de likes: {}".format(likes))

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

        return {"likes":likes, "prouestas":propuestas}
