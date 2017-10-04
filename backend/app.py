from bottle import Bottle, route, run, template, get, post, request
import sys
import json
# sys.path.insert(0,"/home/andres/Documentos/DjApp/backend/handlers")
from handlers import boliches
app = Bottle()


# logger = logging.getLogger('svc-temas')
# logger.setLevel(logging.DEBUG)
# logger.propagate = False
# ch = logging.StreamHandler()
# ch.setLevel(logging.DEBUG)
# formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
# ch.setFormatter(formatter)

@app.route('/boliches', method="POST")
def insertar_boliche():        
    a = boliches.BolichesHandler(request)
    res = a.post()
    return json.dumps(res)

@app.route('/boliches', method="GET")
def consultar_boliches():
    a = boliches.BolichesHandler(request)
    b = a.get()
    return json.dumps(b)

run(app, host='127.0.0.1', port=9090)