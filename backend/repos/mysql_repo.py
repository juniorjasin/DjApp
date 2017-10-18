import pymysql
import datetime

mysql_config = {
    'host': 'localhost',
    'db': 'djapp',
    'user': 'dev',
    'passwd': 'changeme'
}

"""
mysql_config = {
    'host': os.environ['MYSQL_ENDPOINT'],
    'db': os.environ['MYSQL_DATABASE'],
    'user': os.environ['MYSQL_USER'],
    'passwd': os.environ['MYSQL-PASSWORD']
    }
"""

class MySqlRepo:
    def __init__(self):
        self.cnx=None
        try:        
            self.cnx = pymysql.connect(**mysql_config)    
            print self.cnx    

        except pymysql.Error as err:
            msg = "Failed init database: {}".format(err)
            print msg
        except Exception as ex:
            pass

    def obtener_boliches(self,lat,lon):        
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
        return boliches
    
    def insertar_boliche(self,nombre,lat,lon):
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
            error = {"code":"400", "title":"FAIL", "detail":"No se pudo insertar en la base de datos"}
            result.append(error)
        return result

    
    # notar que puede retornar el tema con fecha mas actual pero hay que verificar que corresponda al
    # dia actual, sino puede ser el ultimo que se inserto otro dia
    def obtener_tema_actual(self, id_boliche):
        
        # print "repo obtener_tema_actual"
        temas = []
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
        
        return temas

    def insertar_tema_actual(self,nombre,lat,lon):
        print "repo insertar_tema_actual, nombre = {}, lat = {}, lon={}".format(nombre,lat,lon)
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
            error = {"code":"400", "title":"FAIL", "detail":"No se pudo insertar en la base de datos"}
            result.append(error)
        return result

