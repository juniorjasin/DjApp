from domain import service
from repos import mysql_repo
from util import exception
from decorators.decorador import check_authorization

class TemaActualHandler:
    def __init__(self,request):        
        print "__init__ TemaActualHandler"
        self.request = request
        
    @check_authorization
    def get(self, id_boliche):
        repo = mysql_repo.MySqlRepo()
        svc = service.Service(repo)
        respuesta = svc.obtener_tema_actual(id_boliche)
        return {"tema_actual":respuesta}


    @check_authorization
    def post(self, id_boliche):
        data = self.request.json
        if not data.get('id_tema',None):
            raise exception.BadRequest("Falta argumento id_tema")
        id_tema = data["id_tema"]
        repo = mysql_repo.MySqlRepo()
        svc = service.Service(repo)
        respuesta = svc.insertar_tema_actual(id_boliche, id_tema)
        return { "status":respuesta }