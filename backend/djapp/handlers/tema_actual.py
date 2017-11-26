from domain import service
from repos import mysql_repo
from util import exception
from decorators.decorador import check_authorization
import logging

logger = logging.getLogger('temaActualHandler')
logger.setLevel(logging.DEBUG)
logger.propagate = False
ch = logging.StreamHandler()
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)

class TemaActualHandler:
    def __init__(self,request):        
        print "__init__ TemaActualHandler"
        self.request = request
        
    @check_authorization
    def get(self, id_boliche):
        repo = mysql_repo.MySqlRepo()
        svc = service.Service(repo)
        respuesta = svc.obtener_tema_actual(id_boliche)
        logger.debug(respuesta)
        return {"tema_actual":respuesta}


    @check_authorization
    def post(self, id_boliche):
        data = self.request.json
        if not data.get('nombre_tema',None):
            raise exception.BadRequest("Falta argumento nombre_tema")
        nombre_tema = data["nombre_tema"]
        repo = mysql_repo.MySqlRepo()
        svc = service.Service(repo)
        respuesta = svc.insertar_tema_actual(id_boliche, nombre_tema)
        return { "status":respuesta }