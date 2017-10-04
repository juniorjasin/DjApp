import pymysql


mysql_config = {
    'host': 'localhost',
    'db': 'spt',
    'user': 'root', # or 'andresbalestrini'
    'passwd': '35260239' # '35260239'
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
        except pymysql.Error as err:
            msg = "Failed init database: {}".format(err)
        finally:
            if self.cnx:
                self.cnx.close()    
        

    def obtener_boliches(self,lat,lon):        
        print "repo obtener_boliches, lat = {}, lon={}".format(lat,lon)
        boliches = []
        cursor = self.cnx.cursor()
        query = "SELECT id, nombre FROM boliches WHERE lat = {} AND lon = {}".format(lat,lon)
        cursor.execute(query)
        cursor.close()
        # for row in rows:
        #   boliche = {"id":row[0],"nombre":row[1]}
        #   boliches.append(boliche)
        
        boliches = [
            {"id":1,"nombre":"boliche1"},
            {"id":2,"nombre":"boliche2"}
        ]
        return boliches        
    
    def insertar_boliche(self,nombre,lat,lon):
        print "repo insertar_boliches, nombre = {}, lat = {}, lon={}".format(nombre,lat,lon)
        return {"status":"Ok"}