from domain import service
from repos import mysql_repo
from util import exception

class LikesHandler:
    def __init__(self,request):        
        print "__init__ LikesHandler"
        self.request = request

    def post(self):

        result = []
        data = self.request.json
        print data
        if not data.get('id_tema',None):
            raise exception.BadRequest("Falta argumento id_tema")
        if not data.get('id_boliche',None):
            raise exception.BadRequest("Falta argumento id_boliche")
        if not data.get('tipo_like',None):
            raise exception.BadRequest("Falta argumento tipo_like")
        
        tipo_like = data["tipo_like"]
        if not (tipo_like == "like" or tipo_like == "not-like"):
            raise exception.BadRequest("Valor de tipo_like incorrecto")
        
        id_tema = data["id_tema"]
        id_boliche = data["id_boliche"]

        repo = mysql_repo.MySqlRepo()
        svc = service.Service(repo)
        # ver si el boliche que detecto con la latitud y longitud que viene es igual al id_boliche por parametro
        # obtener parametros que vienen en el header
        
        latitud = self.request.get_header('X-LAT')
        if latitud is None:
            raise exception.BadRequest("Falta header X-LAT")

        longitud = self.request.get_header('X-LON')
        if longitud is None:
            raise exception.BadRequest("Falta header X-LON")
        
        boliches = svc.listar_boliches(latitud, longitud)        
        
        count = 0
        respuesta = []
        if len(boliches) > 0:
            for boliche in boliches:
                id_bol = boliche['id']
                if int(id_bol) == int(id_boliche):
                    count = count + 1
                    print "BOLICHES IGUALES"
                    # ver que parametros le paso a obtener_tema_actual()
                    respuesta = svc.insertar_like(id_bol, id_tema, tipo_like)
            # TODO: encontrar una forma mas elegante de ver cuando el id_boliche no coincide
            # Cuando hay boliche en esa latitud o longitud PERO el id en la url no coincide
            if count == 0:
                print "CONTADOR == CERO"
                raise exception.BadRequest("el id_boliche no se corresponde con la ubicacion que se envio")
                # respuesta.append({"code":400, "title":"bad request", "detail":"el id_boliche en la url no se corresponde con la ubicacion que se envio"})

        # Cuando en la latitud y longitud que se envio no hay ningun boliche
        else :
            # respuesta.append({"code":400, "title":"bad request", "detail":"no existen boliches cercanos a esas coordenadas"})
            raise exception.BadRequest("no existen boliches cercanos a esas coordenadas")

        return {"status": respuesta}
