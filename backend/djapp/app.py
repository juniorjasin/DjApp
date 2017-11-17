from bottle import Bottle, route, run, template, get, post, request, response
import sys
import json

from handlers import boliches
from handlers import tema_actual
from handlers import likes
from handlers import propuestas
from handlers import estadisticas
from handlers import temas_propuestos
from decorators.decorador import my_decorator
import logging
app = Bottle()

LISTEN_PORT = 9090

logger = logging.getLogger('app')
logger.setLevel(logging.DEBUG)
logger.propagate = False
ch = logging.StreamHandler()
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)


@app.hook('after_request')
def enable_cors():
    """
    You need to add some headers to each request.
    Don't use the wildcard '*' for Access-Control-Allow-Origin in production.
    """
    print "enable_cors"
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'PUT, GET, POST, DELETE, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token, X-LAT, X-LON'



# API 6 
@app.route('/boliches', method=['POST', 'OPTIONS'])
@my_decorator
def insertar_boliche():
    if request.method == 'OPTIONS':
        return 
    else:
        a = boliches.BolichesHandler(request)
        res = a.post()
        response.headers['Content-Type'] = 'application/json'
        return json.dumps(res)

@app.route('/boliches', method=['GET', 'OPTIONS'])
@my_decorator
def consultar_boliches():
    if request.method == 'OPTIONS':
        return 
    else:
        a = boliches.BolichesHandler(request)
        b = a.get()
        response.headers['Content-Type'] = 'application/json'
        return json.dumps(b)


#API 7
@app.route('/boliches/<id_boliche>/tema_actual', method=['GET', 'OPTIONS'])
@my_decorator
def consultar_tema_actual(id_boliche):

    if request.method == 'OPTIONS':
        return 
    else:
        a = tema_actual.TemaActualHandler(request)
        b = a.get(id_boliche)
        response.headers['Content-Type'] = 'application/json'
        return json.dumps(b)


#API 11
@app.route('/boliches/<id_boliche>/tema_actual', method=['POST', 'OPTIONS'])
@my_decorator
def insertar_actual(id_boliche):
    if request.method == 'OPTIONS':
        return 
    else:
        handler = tema_actual.TemaActualHandler(request)
        res = handler.post(id_boliche)
        response.headers['Content-Type'] = 'application/json'
        return json.dumps(res)

#API 8 
@app.route('/likes', method=['POST', 'OPTIONS'])
@my_decorator
def insertar_actual():
    if request.method == 'OPTIONS':
        return 
    else:        
        a = likes.LikesHandler(request)
        res = a.post()
        response.headers['Content-Type'] = 'application/json'
        return json.dumps(res)

# API 9
@app.route('/temas_propuestos/<boliche_id>', method= ['GET', 'OPTIONS'])
@my_decorator
def consultar_boliches(boliche_id):
    if request.method == 'OPTIONS':
        return 
    else:
        handler = temas_propuestos.TemasPropuestosHandler(request)
        res = handler.get(boliche_id)
        return res

# API 10
@app.route('/propuesta', method=['POST', 'OPTIONS'])
@my_decorator
def guardar_propuesta():
    if request.method == 'OPTIONS':
        return 
    else:
        a = propuestas.PropuestasHandler(request)
        res = a.post()
        response.headers['Content-Type'] = 'application/json'
        return json.dumps(res)

# --------------------------- API DJ --------------------------------------
@app.route('/estadisticas/<id_boliche>', method=['GET', 'OPTIONS'])
@my_decorator
def guardar_propuesta(id_boliche):
    if request.method == 'OPTIONS':
        return 
    else:
        a = estadisticas.EstadisticasHandler(request)
        res = a.get(id_boliche)
        response.headers['Content-Type'] = 'application/json'
        return json.dumps(res)




run(app, host='0.0.0.0', port=LISTEN_PORT, reloader=True)