from domain import service
from repos import mysql_repo

class TemaActualHandler:
    def __init__(self,request):        
        print "__init__ TemaActualHandler"
        self.request = request

    def get(self, id_boliche):

        # obtener parametros que vienen en el header
        latitud = self.request.get_header('X-LAT')
        longitud = self.request.get_header('X-LON')
        print "get tema_actual, lat = {}, lon={}".format(latitud,longitud)

        # ver si el boliche que detecto con la latitud y longitud que viene es igual al id_boliche por parametro
        repo = mysql_repo.MySqlRepo()
        svc = service.Service(repo)
        boliches = svc.listar_boliches(latitud, longitud)
        result = []

        count = 0
        # Cuando hay un boliche en esa latitudo o longitud
        if len(boliches) > 0:
            for boliche in boliches:
                id_bol = boliche['id']
                if int(id_bol) == int(id_boliche):
                    count = count + 1
                    print "BOLICHES IGUALES"
                    tema_actual = svc.obtener_tema_actual(id_bol)
                    result = {"tema_actual":tema_actual}
        
            # TODO: encontrar una forma mas elegante de ver cuando el id_boliche no coincide
            # Cuando hay boliche en esa latitud o longitud PERO el id en la url no coincide
            if count == 0:
                print "CONTADOR == CERO"
                error = []
                status = "400"
                title = "bad request"
                detail = "el id_boliche en la url no se corresponde con la ubicacion que se envio"
                error.append(status)
                error.append(title)
                error.append(detail)
                result = {"errors":error}

        # Cuando en la latitud y longitud que se envio no hay ningun boliche
        else :
            error = []
            status = "400"
            title = "bad request"
            detail = "no existen boliches cercanos a esas coordenadas"
            error.append(status)
            error.append(title)
            error.append(detail)
            result = {"errors":error}

        return result


    def post(self):
        # nombre = self.request.query.nombre
        # latitud = self.request.query.lat
        # longitud = self.request.query.lon
        # print "post tema_actual, nombre = {}, lat = {}, lon={}".format(nombre,latitud,longitud)
        # repo = mysql_repo.MySqlRepo()
        # svc = service.Service(repo)
        # res = svc.insertar_tema_actual(nombre,latitud,longitud)
        return {"respuesta":"ok"}