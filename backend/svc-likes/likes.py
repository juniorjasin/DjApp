
# abstract: servicio que suma los me gusta/no me gusta de al app.

""" 
TODO: 1) ver como hacer para usar el logger
      2) saber si se pudo insertar en la tabla y avisar si no se pudo.
"""

from bottle import Bottle, route, run, template, get, post, request
import pymysql
import os
import datetime
import logging
from time import gmtime, strftime
import datetime

app = Bottle()


logger = logging.getLogger('svc-likes')
logger.setLevel(logging.DEBUG)
logger.propagate = False
ch = logging.StreamHandler()
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter(
    '%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)


mysql_config = {
    'host': os.environ['MYSQL_ENDPOINT'],
    'db': os.environ['MYSQL_DATABASE'],
    'user': os.environ['MYSQL_USER'],
    'passwd': os.environ['MYSQL_PASSWORD']
}


'''
mysql_config = {
    'host': 'mysql',
    'db': 'djapp',
    'user': 'dev',
    'passwd': 'changeme'
}
'''

"""
creo tablas boliches (ya la crea andi, pero sino no podia crear la otra tabla)
y la tabla votos_tema_actual (le puse asi para no confundir con votos del proximo tema)
"""
def init_db():
    cnx = None
    try:
        cnx = pymysql.connect(**mysql_config)
        cursor = cnx.cursor()
        cursor.execute("create table if not exists djapp.boliches (id_boliche integer, nombre varchar(100), latitud float, longitud float)")
        cursor.execute(create_table)
        create_table = "create table if not exists djapp.votos_tema_actual (id_tema integer REFERENCES djapp.temas(id_tema), id_boliche integer REFERENCES djapp.boliches(id_boliche), tipo_voto varchar(3) CHECK (tipo_voto IN ('mg','nmg')), fecha_hora datetime, PRIMARY KEY (id_tema, id_boliche))"
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
        
        # insert_test = "INSERT INTO temas (id_tema, nombre, actual) VALUES (%s, %s, %s)"
        # data = ("3", "Danny Ocean - Me Rehuso", "N") # tupla
        # cursor.execute(insert_test, data)
        # cursor.execute("drop table djapp.votos_tema_actual")

        cursor.execute("show tables in djapp")
        result = cursor.fetchall()

        for i in range(len(result)):
            print(result[i])


        # cursor.execute("delete from temas where id_tema = 3");

        cnx.commit()
        cursor.close()
    except pymysql.Error as err:
        print "Failed to drop table: {}".format(err)
        ret = {"status": "FAIL", "msg": err}
    finally:
        if cnx:
            cnx.close()


"""
Busca en la base de datos djapp, el tema que tenga actual='S'.
NOTA: no controlo que que pasa si hay dos temas que tengan actual='S'.
TODO: podria mejorar la parte de como sacar el tema de la tupla y no hacerlo en un for.
"""


def votarTemaActual(id_tema, id_boliche, estado):

    ret = ''
    cnx = None
    try:
        cnx = pymysql.connect(**mysql_config)
        cursor = cnx.cursor()

        insert = "insert into djapp.votos_tema_actual (id_tema, id_boliche, tipo_voto, fecha_hora) values (%s, %s, %s, %s)"
        data = (id_tema, id_boliche, estado, strftime("%Y-%m-%d %H:%M:%S", gmtime()) )
        cursor.execute(insert, data)
        
        ret = 'OK'
        # cursor.execute("select * from djapp.votos_tema_actual")
        # result_set = cursor.fetchall()

        # if result_set:
        #     print "tabla con algo"
        #     for row in result_set:
        #         print "%s, %s, %s, %s" % (row[0], row[1], row[2], row[3])
        #         id_tema = row[0]
        #         temaActual = row[1]
        # else:
        #     print "tabla temas vacia"

        cursor.close()
    except pymysql.Error as err:
        print "Failed to select data: {}".format(err)
        ret = 'FAIL'
    finally:
        if cnx:
            cnx.close()

    return ret


"""
recibe la latitud y longitud de la ionic app, verifica que se encuentre y
dentro del boliche. 
Luego busca en la base de datos, en la tabla de temas, el que este marcado actual = 'S'.
@return: tema actual si lo encuentra, sino retorna string vacio.
"""


@app.route('/votarTemaActual', method="GET")
def getTemaActual():

    latitud = request.query.lat
    longitud = request.query.lon

    # ACA habria que pegarle al servicio que hizo andi, consultar si las latitudes y longitudes
    # estan el rango que corresponde y si todo bien seguir, sino retornar que no se encuentra en el boliche.

    id_boliche = '1';
    id_tema = request.query.id_tema
    estado = request.query.estado

    ret = votarTemaActual(id_tema, id_boliche, estado)    

    return {"status": ret}


print strftime("%Y-%m-%d %H:%M:%S", gmtime()) # obtengo la fecha y hora

init_db()
insert_test()
run(app, host='0.0.0.0', port=8088)
