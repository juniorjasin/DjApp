from domain import service
from repos import mysql_repo

class LikesHandler:
    def __init__(self,request):        
        print "__init__ LikesHandler"
        self.request = request

    def post(self):

        data = self.request.json
        print data
        id_tema = data["id_tema"]
        id_boliche = data["id_boliche"]
        #TODO validar que tipo_like sea mg o nmg (ya lo valida la base de datos, pero creo que habria que hacerlo aca)
        tipo_like = data["tipo_like"]

        repo = mysql_repo.MySqlRepo()
        svc = service.Service(repo)

        # ver si el boliche que detecto con la latitud y longitud que viene es igual al id_boliche por parametro
        # obtener parametros que vienen en el header
        latitud = self.request.get_header('X-LAT')
        longitud = self.request.get_header('X-LON')
        boliches = svc.listar_boliches(latitud, longitud)        
        
        if len(boliches) > 0:  #and (tipo_like == "mg" or tipo_like == "nmg"):
            for boliche in boliches:
                id_bol = boliche['id']
                if int(id_bol) == int(id_boliche):

                    print "BOLICHES IGUALES"
                    # ver que parametros le paso a obtener_tema_actual()
                    l = svc.insertar_like(id_bol, id_tema, tipo_like)
                    response = l
                else:
                    print "BOLICHES NO IGUALES"
                    response = {} 
        else:
            print "NO HAS ID"
            response = {}

        return response