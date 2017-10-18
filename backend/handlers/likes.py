from domain import service
from repos import mysql_repo

class LikesHandler:
    def __init__(self,request):        
        print "__init__ LikesHandler"
        self.request = request

    def post(self):

        result = []
        data = self.request.json
        print data
        id_tema = data["id_tema"]
        id_boliche = data["id_boliche"]
        #TODO validar que tipo_like sea like o not-like (ya lo valida la base de datos, pero creo que habria que hacerlo aca)
        tipo_like = data["tipo_like"]

        repo = mysql_repo.MySqlRepo()
        svc = service.Service(repo)
        # ver si el boliche que detecto con la latitud y longitud que viene es igual al id_boliche por parametro
        # obtener parametros que vienen en el header
        latitud = self.request.get_header('X-LAT')
        longitud = self.request.get_header('X-LON')
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
                respuesta.append({"code":400, "title":"bad request", "detail":"el id_boliche en la url no se corresponde con la ubicacion que se envio"})

        # Cuando en la latitud y longitud que se envio no hay ningun boliche
        else :
            respuesta.append({"code":400, "title":"bad request", "detail":"no existen boliches cercanos a esas coordenadas"})

        return {"status": respuesta}
