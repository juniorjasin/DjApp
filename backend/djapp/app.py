from bottle import Bottle, route, run, template, get, post, request, response
import bottle
import sys
import json

from handlers import boliches
from handlers import tema_actual
from handlers import likes
from handlers import propuestas
from handlers import estadisticas
from handlers import temas_propuestos
from handlers import recognicion
from decorators.decorador import my_decorator
import logging
app = Bottle()
bottle.BaseRequest.MEMFILE_MAX = 1024 * 1024 # (or whatever you want)

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



# Insertar un boliche
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

# Consultar boliche segun posicion 
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


# Obtener tema actual
@app.route('/boliches/<id_boliche>/tema_actual', method=['GET', 'OPTIONS'])
@my_decorator
def consultar_tema_actual(id_boliche):

    if request.method == 'OPTIONS':
        return 
    else:
        a = tema_actual.TemaActualHandler(request)
        b = a.get(id_boliche)
        response.headers['Content-Type'] = 'application/json'
        logger.debug("json:")
        logger.debug(json.dumps(b))
        return json.dumps(b)


# Insertar el tema actual en un boliche
@app.route('/boliches/<id_boliche>/tema_actual', method=['POST', 'OPTIONS'])
@my_decorator
def insertar_actual(id_boliche):
    
    print "intertar tema actual {}".format(request.json)

    if request.method == 'OPTIONS':
        return 
    else:        
        response.status = 400
        return {"code":"400", "title":"FAIL", "detail":"esta ruta ya no debe ser utiliza... usar /rec/<id_boliche>"}

# Insertar like/not-like del tema actual en un boliche
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

# Obtener los temas propuestos(temas que pueden ser sugeridos), para un boliche
@app.route('/temas_propuestos/<boliche_id>', method= ['GET', 'OPTIONS'])
@my_decorator
def consultar_boliches(boliche_id):
    if request.method == 'OPTIONS':
        return 
    else:
        handler = temas_propuestos.TemasPropuestosHandler(request)
        res = handler.get(boliche_id)
        return res

# Insertar el tema proupuesto (surgerido)
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
import logging
# --------------------------- API DJ --------------------------------------

# Obtiene estadisticas que va a visualizar el dj. 
# Cantidad de likes/not-like del tema actual y
# las sugerencias de los usuarios.
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

# A partir de un audio, reconoce que tema se esta escuchando.
@app.route('/rec/<id_boliche>', method=['POST', 'OPTIONS'])
@my_decorator
def guardar_propuesta(id_boliche):
    if request.method == 'OPTIONS':
        return 
    else:
        a = recognicion.RecognicionHandler(request)
        res = a.post(id_boliche)
        response.headers['Content-Type'] = 'application/json'
        return json.dumps(res)



run(app, host='0.0.0.0', port=LISTEN_PORT, reloader=True)