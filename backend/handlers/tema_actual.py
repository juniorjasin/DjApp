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
        response = {}

        print boliches
        print type(boliches)
        # print boliches.has_key('id')


        if len(boliches) > 0:
            
            for boliche in boliches:

                id_bol = boliche['id']
                if int(id_bol) == int(id_boliche):
                    print "BOLICHES IGUALES"
                    # ver que parametros le paso a obtener_tema_actual()
                    tema_actual = svc.obtener_tema_actual(id_bol)
                    response = tema_actual
                else:
                    print "BOLICHES NO IGUALES"
                    response = {} 
        else:
            response = {}

        return response


    def post(self):
        # nombre = self.request.query.nombre
        # latitud = self.request.query.lat
        # longitud = self.request.query.lon
        # print "post tema_actual, nombre = {}, lat = {}, lon={}".format(nombre,latitud,longitud)
        # repo = mysql_repo.MySqlRepo()
        # svc = service.Service(repo)
        # res = svc.insertar_tema_actual(nombre,latitud,longitud)
        return {"respuesta":"ok"}