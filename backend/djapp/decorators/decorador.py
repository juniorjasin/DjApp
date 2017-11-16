from functools import wraps
from util import exception
import json
from bottle import response
from domain import service
from repos import mysql_repo

def my_decorator(f):
    @wraps(f)
    def wrapper(*args, **kwds):
        try:        
            print 'Inside decorator. Calling decorated function'
            return f(*args, **kwds)
        except exception.InfoException as ex:
            if isinstance(ex, exception.BadRequest):
                response.status = 400
            elif isinstance(ex, exception.Unauthorized):
                response.status = 401
            elif isinstance(ex, exception.NotFound):
                response.status = 404
            elif isinstance(ex, exception.InternalServerError):
                response.status = 500
            response.body = str(ex)
            return response
    return wrapper

def check_authorization(f):
    def wrapper(*args):
        id_boliche = None
        request = args[0].request
        #Intenta obtener boliche de args[1] (Ocurre cuando id_boliche viene en la url de la request)
        try:
            id_boliche = args[1]
        except:
            pass
        #Intenta obtener boliche del request (Ocurre cuando id_boliche viene en el body de la request)
        try:
            id_boliche = request.json['id_boliche']
        except:
            pass
        #Si sigue siendo None
        if id_boliche is None:
            raise exception.BadRequest("Falta id_boliche")

        latitud  = request.get_header('X-LAT')
        longitud = request.get_header('X-LON')

        if latitud is None:
            raise exception.BadRequest("Falta header X-LAT")

        if longitud is None:
            raise exception.BadRequest("Falta header X-LON")

        # ver si el boliche que detecto con la latitud y longitud que viene es igual al id_boliche por parametro
        repo = mysql_repo.MySqlRepo()
        svc = service.Service(repo)
        boliches = svc.listar_boliches(latitud, longitud)
        result = []

        count = 0
        respuesta = []
        # Cuando hay un boliche en esa latitud o longitud
        if len(boliches) > 0:
            for boliche in boliches:
                id_bol = boliche['id']
                if int(id_bol) == int(id_boliche):
                    count = count + 1
                    print "BOLICHES IGUALES"
            if count == 0:
                raise exception.Unauthorized("No autorizado")
        else:
            raise exception.Unauthorized("No autorizado")
                    
        
        #     # TODO: encontrar una forma mas elegante de ver cuando el id_boliche no coincide
        #     # Cuando hay boliche en esa latitud o longitud PERO el id en la url no coincide
        #     if count == 0:
        #         print "CONTADOR == CERO"
        #         # respuesta.append({"code":400, "title":"bad request", "detail":"el id_boliche en la url no se corresponde con la ubicacion que se envio"})
        # # Cuando en la latitud y longitud que se envio no hay ningun boliche
        # else :
        #     # respuesta.append({"code":400, "title":"bad request", "detail":"no existen boliches cercanos a esas coordenadas"})
        #     pass

        # Si no hay ningun error llama a la funcion con *args
        return f(*args)
    return wrapper

