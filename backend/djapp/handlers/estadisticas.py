from domain import service
from repos import mysql_repo
from util import exception


class EstadisticasHandler:
    def __init__(self,request):        
        print "__init__ EstadisticasHandler"
        self.request = request

    def get(self, id_boliche):

        repo = mysql_repo.MySqlRepo()
        svc = service.Service(repo)
        estadisticas = svc.obtener_estadisticas(id_boliche)
        response = {"estadisticas":estadisticas}
        return response