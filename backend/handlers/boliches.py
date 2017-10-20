from domain import service
from repos import mysql_repo
from util import exception

import json

# TODO: verificar en el caso que no vengan los parametros lat y lon porque sino rompe

class BolichesHandler:
    def __init__(self,request):        
        print "__init__"
        self.request = request

    def get(self):

        # raise exception.NotFound("recurso")
        # print self.request.query.get('lat')
        
        # if 'lat' in self.request:
        #     print "tiene lat"

        
        latitud = getattr(self.request.query, 'lat')
        longitud = getattr(self.request.query, 'lon')

        if not (latitud and longitud):
            raise exception.BadRequest("faltan argumento latitud o longitud")


        # print "get boliches, lat = {}, lon={}".format(latitud,longitud)
        repo = mysql_repo.MySqlRepo()
        svc = service.Service(repo)
        boliches = svc.listar_boliches(latitud,longitud)
        response = {"boliches":boliches}
        return response

    def post(self):        
        data = self.request.json
        
        # print 'nombre' in data.values()
        # if not data.get('nombre',None):
        #     print "no hay nombre"

        if not data.get('nombre',None):
            raise exception.BadRequest("Falta argumento nombre")
        elif not data.get('latitud',None):
            raise exception.BadRequest("Falta argumento latitud")
        elif not data.get('longitud',None):
            raise exception.BadRequest("Falta argumento longitud")

        nombre = data["nombre"]
        latitud = data["latitud"]
        longitud = data["longitud"]
        repo = mysql_repo.MySqlRepo()
        svc = service.Service(repo)
        respuesta = svc.insertar_boliche(nombre,latitud,longitud)
        return {"status":respuesta}