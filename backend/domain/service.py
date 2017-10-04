class Service:
    def __init__(self,repo):
        self.repo = repo
        print "__init__"

    def listar_boliches(self,lat,lon):
        boliches = self.repo.obtener_boliches(lat,lon)
        return boliches

    def insertar_boliche(self,nombre,lat,lon):
        response = self.repo.insertar_boliche(nombre,lat,lon)
        return response