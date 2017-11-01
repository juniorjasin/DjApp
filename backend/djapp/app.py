from bottle import Bottle, route, run, template, get, post, request, response
import sys
import json

from handlers import boliches
from handlers import tema_actual
from handlers import likes
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


# API 6 
@app.route('/boliches', method="POST")
@my_decorator
def insertar_boliche():        
    logger.debug("hola que tal")
    a = boliches.BolichesHandler(request)
    res = a.post()
    response.headers['Content-Type'] = 'application/json'
    return json.dumps(res)

@app.route('/boliches', method="GET")
@my_decorator
def consultar_boliches():
    a = boliches.BolichesHandler(request)
    b = a.get()
    response.headers['Content-Type'] = 'application/json'
    return json.dumps(b)


#API 7
@app.route('/boliches/<id_boliche>/tema_actual', method="GET")
@my_decorator
def consultar_tema_actual(id_boliche):
    a = tema_actual.TemaActualHandler(request)
    b = a.get(id_boliche)
    response.headers['Content-Type'] = 'application/json'
    return json.dumps(b)


@app.route('/boliches/<id_boliche>/tema_actual', method="POST")
@my_decorator
def insertar_actual(id_boliche):        
    a = tema_actual.TemaActualHandler(request)
    res = a.post(id_boliche)
    response.headers['Content-Type'] = 'application/json'
    return json.dumps(res)

#API 8 
@app.route('/likes', method="POST")
@my_decorator
def insertar_actual():        
    a = likes.LikesHandler(request)
    res = a.post()
    response.headers['Content-Type'] = 'application/json'
    return json.dumps(res)


run(app, host='0.0.0.0', port=LISTEN_PORT, reloader=True)