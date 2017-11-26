import pymysql
import datetime
import os
import logging
from util import exception
from pygn import pygn
import json


clientID = '1452299036-F0D031687E6211257A4D81AFB1F7C81E' 
userID = '26838888848744272-F2E01985C6B9E075B52BAFD7FFCB39E4'


logger = logging.getLogger('mysql_repo')
logger.setLevel(logging.DEBUG)
logger.propagate = False
ch = logging.StreamHandler()
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)


mysql_config = {
    'host': os.environ['MYSQL_ENDPOINT'],
    'db': os.environ['MYSQL_DATABASE'],
    'user': os.environ['MYSQL_USER'],
    'passwd': os.environ['MYSQL_PASSWORD'],
    'port': 3307
    }
    

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
            query = "SELECT temas.id, temas.nombre, temas.album_art_url FROM (SELECT id_tema FROM temas_boliches WHERE id_boliche = {} ORDER BY id DESC LIMIT 1) as q JOIN temas ON q.id_tema = temas.id".format(id_boliche)
            cursor.execute(query)
            rows = cursor.fetchall()
            cursor.close()

            for row in rows:

                logger.debug("traigo nombre de tema:")
                logger.debug(row[1].decode('ISO-8859-1'))

                t = {"id":row[0],"nombre":row[1].decode('ISO-8859-1'),"album_art_url":row[2]}
                tema.append(t)
            logger.debug("Array de likes: {}".format(tema))

        except pymysql.Error as err:
             logger.error("fallo la consulta en obtener_tema_actual")
             raise exception.InternalServerError("fallo obtener_tema_actual")
        
        logger.debug("return tema: {}".format(tema))
        return tema

    def insertar_tema_actual(self,id_boliche, nombre_tema):
        global userID
        global clientID

        result = []
        
        autor_nombre = nombre_tema.split('-')
        # Si no le pongo la codificacion se rompe
        logger.debug("Buscar:" + (autor_nombre[0] + autor_nombre[1]).encode('ISO-8859-1').strip())

        metadata = pygn.search(clientID=clientID, userID=userID, artist=autor_nombre[1], track=autor_nombre[0])
        if metadata.get('ERROR',None):
            print "ERROR"
            userID = pygn.register(clientID)
            metadata = pygn.search(clientID=clientID, userID=userID, artist=autor_nombre[1], track=autor_nombre[0])

        # logger.debug("JSON api gracenote: {}".format(metadata))
        stringInfo = json.dumps(metadata, sort_keys=True, indent=4)
        songInfo = json.loads(stringInfo)

        album_art_url = songInfo["album_art_url"]
        track_title = songInfo["track_title"]
        album_artist_name = songInfo["album_artist_name"]
        nombre_artista = track_title + " - " + album_artist_name
        logger.debug(("inserto nombre_artista:" + nombre_artista).encode('ISO-8859-1').strip())

        try:
            cursor_1 = self.cnx.cursor()
            query_1 = "SELECT id FROM temas WHERE nombre = %s"
            cursor_1.execute(query_1,track_title)
            result_cursor_1 = cursor_1.fetchone()
            cursor_1.close()
            cursor_2 = self.cnx.cursor()
            if result_cursor_1 is None:
                query_2 = "INSERT INTO temas(nombre, album_art_url) values(%s,%s)"
                values_query_2 = (track_title, album_art_url)
                cursor_2.execute(query_2, values_query_2)
                id_tema_insertado = cursor_2.lastrowid 
                query_3 = "INSERT INTO temas_boliches (id_boliche, id_tema) values(%s,%s)"
                values_query_3 = (id_boliche, id_tema_insertado)
                cursor_2.execute(query_3, values_query_3)
                self.cnx.commit()
            else:
                query_4 = "INSERT INTO temas_boliches (id_boliche, id_tema) values(%s,%s)"
                id_tema = result_cursor_1[0]
                values_query_4 = (id_boliche, id_tema)
                cursor_2.execute(query_4, values_query_4)
                self.cnx.commit()
            cursor_2.close()
            respuesta = {"code":"200", "title":"OK", "detail":"se pudo insertar el tema en la base de datos"}
            result.append(respuesta)
        except pymysql.Error as err:
            print err
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
            query = "SELECT COUNT(*), temas.nombre, votos_propuestas.id_tema FROM votos_propuestas JOIN temas on votos_propuestas.id_tema = temas.id WHERE id_boliche = %s GROUP BY votos_propuestas.id_tema, temas.nombre, id_boliche"
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

        return {"tema_actual":likes_tema_actual, "propuestas":propuestas}

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
