from domain import service
from repos import mysql_repo
import json
from decorators.decorador import my_decorator
from decorators.decorador import check_authorization

class TemasPropuestosHandler:
    def __init__(self,request):        
        print "__init__"
        self.request = request

    def post(self):        
        data = self.request.json
        nombre_tema = data["nombre_tema"]
        id_boliche = data["id_boliche"]
        repo = mysql_repo.MySqlRepo()
        svc = service.Service(repo)
        res = svc.insertar_tema_propuesto(nombre_tema,id_boliche)
        return res

    @check_authorization
    def get(self, boliche_id):
        repo = mysql_repo.MySqlRepo()
        svc = service.Service(repo)
        temas_propuestos = svc.listar_temas_propuestos(boliche_id)
        response = {"temas_propuestos":temas_propuestos}
        return response