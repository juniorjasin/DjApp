from domain import service
from repos import mysql_repo
from util import exception
from decorators.decorador import check_authorization

import json

class PropuestasHandler:
    def __init__(self,request):        
        print "__init__"
        self.request = request
        
    @check_authorization
    def post(self):
        data = self.request.json
        if not data.get('id_tema',None):
            raise exception.BadRequest("Falta argumento id_tema")
        id_tema = data["id_tema"]
        id_boliche = data["id_boliche"]
        repo = mysql_repo.MySqlRepo()
        svc = service.Service(repo)
        respuesta = svc.insertar_propuesta(id_boliche, id_tema)
        return {"status":respuesta }