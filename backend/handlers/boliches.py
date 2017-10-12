from domain import service
from repos import mysql_repo
import json

class BolichesHandler:
    def __init__(self,request):        
        print "__init__"
        self.request = request

    def post(self):        
        data = self.request.json
        nombre = data["nombre"]
        latitud = data["lat"]
        longitud = data["lon"]
        repo = mysql_repo.MySqlRepo()
        svc = service.Service(repo)
        res = svc.insertar_boliche(nombre,latitud,longitud)
        return res


    def get(self):
        latitud = self.request.query.lat
        longitud = self.request.query.lon
        # print "get boliches, lat = {}, lon={}".format(latitud,longitud)
        repo = mysql_repo.MySqlRepo()
        svc = service.Service(repo)
        boliches = svc.listar_boliches(latitud,longitud)
        response = {"boliches":boliches}
        return response
