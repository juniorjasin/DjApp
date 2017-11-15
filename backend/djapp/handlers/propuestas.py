from domain import service
from repos import mysql_repo
from util import exception

import json

class PropuestasHandler:
    def __init__(self,request):        
        print "__init__"
        self.request = request
    
    def post(self):
        data = self.request.json

        if not data.get('id_tema',None):
            raise exception.BadRequest("Falta argumento id_tema")
        if not data.get('id_boliche',None):
            raise exception.BadRequest("Falta argumento id_boliche")

        latitud = self.request.get_header('X-LAT')
        if latitud is None:
            raise exception.BadRequest("Falta header X-LAT")

        longitud = self.request.get_header('X-LON')
        if longitud is None:
            raise exception.BadRequest("Falta header X-LON")
        
        id_tema = data["id_tema"]
        id_boliche = data["id_boliche"]

        repo = mysql_repo.MySqlRepo()
        svc = service.Service(repo)

        boliches = svc.listar_boliches(latitud, longitud)        
        
        count = 0
        respuesta = []
        if len(boliches) > 0:
            for boliche in boliches:
                id_bol = boliche['id']
                if int(id_bol) == int(id_boliche):
                    count = count + 1
                    respuesta = svc.insertar_propuesta(id_bol, id_tema)
            if count == 0:
                raise exception.BadRequest("el id_boliche no se corresponde con la ubicacion que se envio")
        else :
            raise exception.BadRequest("no existen boliches cercanos a esas coordenadas")



        return { "status":respuesta }