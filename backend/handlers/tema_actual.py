from domain import service
from repos import mysql_repo
from util import exception

class TemaActualHandler:
    def __init__(self,request):        
        print "__init__ TemaActualHandler"
        self.request = request

    def get(self, id_boliche):

        # obtener parametros que vienen en el header

        latitud = self.request.get_header('X-LAT')
        if latitud is None:
            raise exception.BadRequest("Falta header X-LAT")

            
        longitud = self.request.get_header('X-LON')
        if longitud is None:
            raise exception.BadRequest("Falta header X-LON")


        # ver si el boliche que detecto con la latitud y longitud que viene es igual al id_boliche por parametro
        repo = mysql_repo.MySqlRepo()
        svc = service.Service(repo)
        boliches = svc.listar_boliches(latitud, longitud)
        result = []

        count = 0
        respuesta = []
        # Cuando hay un boliche en esa latitudo o longitud
        if len(boliches) > 0:
            for boliche in boliches:
                id_bol = boliche['id']
                if int(id_bol) == int(id_boliche):
                    count = count + 1
                    print "BOLICHES IGUALES"
                    respuesta = svc.obtener_tema_actual(id_bol)
        
        #     # TODO: encontrar una forma mas elegante de ver cuando el id_boliche no coincide
        #     # Cuando hay boliche en esa latitud o longitud PERO el id en la url no coincide
        #     if count == 0:
        #         print "CONTADOR == CERO"
        #         # respuesta.append({"code":400, "title":"bad request", "detail":"el id_boliche en la url no se corresponde con la ubicacion que se envio"})
        # # Cuando en la latitud y longitud que se envio no hay ningun boliche
        # else :
        #     # respuesta.append({"code":400, "title":"bad request", "detail":"no existen boliches cercanos a esas coordenadas"})
        #     pass
        
        return {"tema_actual":respuesta}


    def post(self):
        respuesta = []
        respuesta.append({"title": "API no implementada","user_message": "esta API no esta habilitada por el momento","developer_message":"todavia no se sabe como setear un tema actual"})
        return {"status":respuesta}