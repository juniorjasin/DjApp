from  bottle import Bottle, route, run, get, template, post, request, put
import pymysql
import json
import logging
import os
import time
from math import sin,cos,sqrt,asin,pi
import pyproj, sys

r = 6371000 #radio terrestre medio, en metros
 
c = pi/180 #constante para transformar grados en radianes

mysql_config = {
    'host': os.environ['MYSQL_ENDPOINT'],
    'db': os.environ['MYSQL_DATABASE'],
    'user': os.environ['MYSQL_USER'],
    'passwd': os.environ['MYSQL-PASSWORD']
    }

logger = logging.getLogger('gps-svc')
logger.setLevel(logging.DEBUG)
logger.propagete = False
ch = logging.StreamHandler()
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)

app = Bottle()

@app.post('/gps-svc/test')
def test():            
    ret = {}
    data = request.json    
    lat2 = data['latitud']
    long2 = data['longitud']    
        

    try:
        cnx = pymysql.connect(**mysql_config)
        cursor = cnx.cursor()
        insert_test = "SELECT * FROM boliches"        
        cursor.execute(insert_test)            
        res = cursor.fetchall();        
        cnx.commit()
        cursor.close()
        # ret = {"status":"OK","table":res}       
    except pymysql.OperationalError as err:        
        print "Failed to select data: {}".format(err)        
        ret = {"status":"ERROR"}
    finally:
        if cnx:
            cnx.close()       

    for i in range(len(res)):
        row = res[i]
        lat1 = float(row[2])
        long1 = float(row[3])
        geod = pyproj.Geod(ellps="WGS84")
        angle1,angle2,distance = geod.inv(long1, lat1, long2, lat2)
        #Formula de haversine
        d = 2*r*asin(sqrt(sin(c*(lat2-lat1)/2)**2 + cos(c*lat1)*cos(c*lat2)*sin(c*(long2-long1)/2)**2))
        if d < 100:
            ret = {"status":"OK", "lugar":row[0]}
            mssg = json.dumps(ret)
            return json.loads(mssg)
    ret = {"status":"ERROR", "lugar":"Ningun lugar cercano"}
    mssg = json.dumps(ret)
    return json.loads(mssg)



def init_db():
    logger.debug("inicializando db.......\n")
    cnx=None
    try:
        time.sleep(60) ## poco tiempo, revisar
        cnx = pymysql.connect(**mysql_config)
        cursor = cnx.cursor()
        create_table = "create table if not exists djapp.boliches( id_boliche integer, nombre varchar(100), latitud varchar(100), longitud varchar(100), primary key(id_boliche) );"
        cursor.execute(create_table)        
        cursor.close()
    except pymysql.Error as err:
        print "Failed init database: {}".format(err)    
    finally:
        if cnx:
            cnx.close()    

    logger.debug("inicializando db DONE....")    

def load_db():
    logger.debug("insertando en db.......\n")
    cnx=None
    try:
        cnx = pymysql.connect(**mysql_config)
        cursor = cnx.cursor()        
        insert_test = "INSERT INTO boliches (name, latitud,longitud) VALUES (%s, %s,%s)"
        data = ("estacionamiento","-31.338556", "-64.255559")
        cursor.execute(insert_test, data)
        cursor.close()
    except pymysql.Error as err:
        print "Failed init database: {}".format(err)
    except pymysql.IntegrityError as err:
        print "Failed to insert boliche: {}".format(err)
        ret = {"status":"ERR","msg":"El boliche ya existe"}
    finally:
        if cnx:
            cnx.close()    

    logger.debug("insertando en db DONE....")    


init_db()
load_db()
# run(app, host='127.0.0.1', port=6061)
run(app, host='0.0.0.0', port=6061)    