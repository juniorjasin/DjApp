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


    def post(self):
        respuesta = []
        respuesta.append({"title": "API no implementada","user_message": "esta API no esta habilitada por el momento","developer_message":"todavia no se sabe como setear un tema actual"})
        return {"status":respuesta}