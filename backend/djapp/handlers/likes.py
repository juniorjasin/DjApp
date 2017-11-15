from domain import service
from repos import mysql_repo
from util import exception
from decorators.decorador import check_authorization

class LikesHandler:
    def __init__(self,request):        
        print "__init__ LikesHandler"
        self.request = request

    @check_authorization
    def post(self):
        result = []
        data = self.request.json
        print data
        if not data.get('id_tema',None):
            raise exception.BadRequest("Falta argumento id_tema")
        if not data.get('tipo_like',None):
            raise exception.BadRequest("Falta argumento tipo_like")
        tipo_like = data["tipo_like"]
        if not (tipo_like == "like" or tipo_like == "not-like"):
            raise exception.BadRequest("Valor de tipo_like incorrecto")
        id_tema = data["id_tema"]
        id_boliche = data["id_boliche"]
        repo = mysql_repo.MySqlRepo()
        svc = service.Service(repo)
        respuesta = svc.insertar_like(id_boliche, id_tema, tipo_like)
        return {"status": respuesta}
