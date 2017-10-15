from bottle import Bottle, route, run, template, get, post, request,response
import sys
import json

from handlers import boliches
from handlers import tema_actual
from handlers import likes
app = Bottle()


# logger = logging.getLogger('svc-temas')
# logger.setLevel(logging.DEBUG)
# logger.propagate = False
# ch = logging.StreamHandler()
# ch.setLevel(logging.DEBUG)
# formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
# ch.setFormatter(formatter)

# API 6
@app.route('/boliches', method="POST")
def insertar_boliche():        
    a = boliches.BolichesHandler(request)
    res = a.post()
    response.headers['Content-Type'] = 'application/json'
    return json.dumps(res)

@app.route('/boliches', method="GET")
def consultar_boliches():
    a = boliches.BolichesHandler(request)
    b = a.get()
    response.headers['Content-Type'] = 'application/json'
    return json.dumps(b)


#API 7
@app.route('/boliches/<id_boliche>/tema_actual', method="GET")
def consultar_tema_actual(id_boliche):
    a = tema_actual.TemaActualHandler(request)
    b = a.get(id_boliche)
    response.headers['Content-Type'] = 'application/json'
    return json.dumps(b)


@app.route('/boliches/<id_boliche>/tema_actual', method="POST")
def insertar_actual(id_boliche):        
    a = tema_actual.TemaActualHandler(request)
    res = a.post(id_boliche)
    response.headers['Content-Type'] = 'application/json'
    return json.dumps(res)


#API 8 
@app.route('/likes', method="POST")
def insertar_actual():        
    a = likes.LikesHandler(request)
    res = a.post()
    response.headers['Content-Type'] = 'application/json'
    return json.dumps(res)



run(app, host='127.0.0.1', port=9090)