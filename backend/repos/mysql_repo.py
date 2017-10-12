import pymysql


mysql_config = {
    'host': 'localhost',
    'db': 'djapp',
    'user': 'dev', # or 'andresbalestrini'
    'passwd': 'changeme' # '35260239'
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
            query = "SELECT id, nombre, latitud, longitud FROM boliches"
            cursor.execute(query)
            rows = cursor.fetchall()
            self.cnx.commit()
            cursor.close()
            if rows == None:            
                return boliches
            else:
                for row in rows:
                    boliche = {"id":row[0],"nombre":row[1], "latitud": row[2], "longitud": row[3]}
                    boliches.append(boliche)
        except pymysql.Error as err:
            msg = "Failed init database: {}".format(err)
        return boliches
    
    def insertar_boliche(self,nombre,lat,lon):
        # print "repo insertar_boliches, nombre = {}, lat = {}, lon={}".format(nombre,lat,lon)
        ret = {"status":"Ok"}
        try:
            cursor = self.cnx.cursor()
            query = "INSERT INTO boliches (nombre,latitud,longitud) VALUES (%s,%s,%s)"
            values = (nombre,lat,lon)
            # print values
            cursor.execute(query,values)
            self.cnx.commit()
            cursor.close()
        except pymysql.Error as err:
            ret = {"status":"Error", "message":"Failed insert database: {}".format(err)}
        return ret

    
    def obtener_tema_actual(self, id_boliche):
        
        print "repo obtener_tema_actual"
        temas = []
        cursor = self.cnx.cursor()
        query = "select id, nombre from temas_actuales WHERE id = {}".format(id_boliche)
        cursor.execute(query)
        rows = cursor.fetchall()
        cursor.close()

        for row in rows:
          tema = {"id":row[0],"nombre":row[1]}
          temas.append(tema)
        
        return temas

    def insertar_tema_actual(self,nombre,lat,lon):
        print "repo insertar_tema_actual, nombre = {}, lat = {}, lon={}".format(nombre,lat,lon)
        return {"status":"Ok"}





