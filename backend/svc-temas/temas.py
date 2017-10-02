
#### abstract: servicio que proporciona el tema actual (tema que se esta escuchando)

""" 
TODO: 1) ver como hacer para usar el logger
      2) ver una forma mas elegante de obtener el nombre de la tupla
"""

from bottle import Bottle, route, run, template, get, post, request
import pymysql
import os
import datetime
import logging
import time
app = Bottle()

logger = logging.getLogger('svc-temas')
logger.setLevel(logging.DEBUG)
logger.propagate = False
ch = logging.StreamHandler()
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)


mysql_config = {
    'host': os.environ['MYSQL_ENDPOINT'],
    'db': os.environ['MYSQL_DATABASE'],
    'user': os.environ['MYSQL_USER'],
    'passwd': os.environ['MYSQL_PASSWORD']
}


def init_db():
    cnx = None
    try:
        cnx = pymysql.connect(**mysql_config)
        cursor = cnx.cursor()
        create_table = "create table if not exists djapp.temas (id_tema integer, nombre varchar(100), actual char CHECK (actual IN ('S','N')), PRIMARY KEY (id_tema))"
        cursor.execute(create_table)
        cursor.close
    except pymysql.Error as err:
        msg = "Failed init database {}".format(err)
    finally:
        if cnx:
            cnx.close()

def insert_test():

    cnx = None
    try:
        cnx = pymysql.connect(**mysql_config)
        cursor = cnx.cursor()
        
        insert_test = "INSERT INTO temas (id_tema, nombre, actual) VALUES (%s, %s, %s)"
        data = ("3", "Danny Ocean - Me Rehuso", "N") # tupla
        cursor.execute(insert_test, data)

        # cursor.execute("delete from temas where id_tema = 3");

        cnx.commit()
        cursor.close()
    except pymysql.Error as err:
        print "Failed to insert data: {}".format(err)
        ret = {"status": "FAIL", "msg": err}
    finally:
        if cnx:
            cnx.close()

"""
Busca en la base de datos djapp, el tema que tenga actual='S'.
NOTA: no controlo que que pasa si hay dos temas que tengan actual='S'.
TODO: podria mejorar la parte de como sacar el tema de la tupla y no hacerlo en un for.
"""
def searchTemaActual(temaActual, id_tema):
    cnx = None
    try:
        cnx = pymysql.connect(**mysql_config)
        cursor = cnx.cursor()
        cursor.execute ("select id_tema, nombre, actual from temas WHERE actual = 'S'")
        result_set = cursor.fetchall()
        print "tipo result_set: %s y valores:" % type(result_set)
        print (result_set)
        cursor.execute ("select id_tema, nombre, actual from temas WHERE actual = 'S'")
        
        # Si hago fetchone esto no funciona, lo dejo asi por ahora.
        # result_set2 = cursor.fetchone()
        # print "tipo result_set2: %s y valores2:" % type(result_set2)
        # print (result_set2)
        # # print "resut_set2:%s" % result_set2 # No se porque esto no funciona

        if result_set:
            for row in result_set:
                print "%s, %s, %s" % (row[0], row[1], row[2])
                id_tema = row[0]
                temaActual = row[1]
        else:
            print "@@@tabla temas vacia@@@"
            temaActual = ''
            id_tema = ''

        cursor.close()
    except pymysql.Error as err:
        print "Failed to select data: {}".format(err)
        # logger.info("Failed to insert data: {}".format(err))
        id_tema = ''
        temaActual = ''
    finally:
        if cnx:
            cnx.close()
    
    return temaActual, id_tema

"""
recibe la latitud y longitud de la ionic app, verifica que se encuentre y
dentro del boliche. 
Luego busca en la base de datos, en la tabla de temas, el que este marcado actual = 'S'.
@return: tema actual si lo encuentra, sino retorna string vacio.
"""
@app.route('/getTemaActual', method="GET")
def getTemaActual():

    latitud = request.query.lat
    longitud = request.query.lon

    # print "latitud:%s, type:%s" % (latitud, type(latitud))
    # print "longitud:%s" % longitud

    # ACA habria que pegarle al servicio que hizo andi, consultar si las latitudes y longitudes
    # estan el rango que corresponde y si todo bien seguir, sino retornar que no se encuentra en el boliche.
    
    id_tema = ''
    temaActual = ''
    tema, id = searchTemaActual(temaActual, id_tema)
    
    return {"id_tema": id, "tema_actual":tema}



init_db()
# insert_test()
run(app, host='0.0.0.0', port=8081)