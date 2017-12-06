from math import sin,cos,sqrt,asin,pi
import pyproj, sys
import json
import logging

logger = logging.getLogger('service')
logger.setLevel(logging.DEBUG)
logger.propagate = False
ch = logging.StreamHandler()
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)


r = 6371000 #radio terrestre medio, en metros 
c = pi/180 #constante para transformar grados en radianes

class Service:
    def __init__(self,repo):
        self.repo = repo
        # print "__init__"

    def listar_boliches(self,lat,lon):
        boliches = self.repo.obtener_boliches(lat,lon)
        # print "boliches = {}".format(boliches)
        lat = float(lat)
        lon = float(lon)
        ret = []
        if len(boliches) == 0:
            return ret
        for i in range(len(boliches)):
            row = boliches[i]
            # print "row = {}".format(row)
            row = json.loads(json.dumps(row))            
            lat1 = float(row["latitud"])
            long1 = float(row["longitud"])
            geod = pyproj.Geod(ellps="WGS84")
            angle1,angle2,distance = geod.inv(long1, lat1, lon, lat)
            #Formula de haversine
            d = 2*r*asin(sqrt(sin(c*(lat-lat1)/2)**2 + cos(c*lat1)*cos(c*lat)*sin(c*(lon-long1)/2)**2))
            if d < 100:
                res = {"nombre":row["nombre"], "id":row["id"], "latitud":row["latitud"], "longitud":row["longitud"],"id_tema_actual":row["id_tema_actual"] }
                ret.append(res)
                # mssg = json.dumps(ret)
                # return json.loads(mssg)
        mssg = json.dumps(ret)
        return json.loads(mssg)    

    def insertar_boliche(self,nombre,lat,lon):
        response = self.repo.insertar_boliche(nombre,lat,lon)
        return response

    def obtener_tema_actual(self, id_boliche):
        response = self.repo.obtener_tema_actual(id_boliche)        
        logger.debug(response)
        return response

    def insertar_tema_actual(self,id_boliche, nombre_tema):
        response = self.repo.insertar_tema_actual(id_boliche, nombre_tema)
        return response

    def insertar_like(self, id_boliche, id_tema, tipo_like):
        response = self.repo.insertar_like(id_boliche, id_tema, tipo_like)
        return response

    def insertar_propuesta(self, id_boliche, id_tema):
        response = self.repo.insertar_propuesta(id_boliche, id_tema)
        return response

    def obtener_estadisticas(self, id_boliche):
        response = self.repo.obtener_estadisticas(id_boliche)
        return response

    def listar_temas_propuestos(self, id_boliche):
        temas_propuestos = self.repo.obtener_temas_propuestos(id_boliche)
        return temas_propuestos

    def insertar_tema_propuesto(self,nombre_tema,id_boliche):
        response = self.repo.insertar_tema_propuesto(nombre_tema,id_boliche)
        return response

    def insertar_tema_reconocido(self,id_boliche, tema_actual):
        # parseo el json tema_actual y saco lo que se va a insertar


        json_ta = json.loads(tema_actual)

        logger.debug("nombre tema: {}".format (json_ta["metadata"]["music"][0]["title"]))
        logger.debug("nombres artistas: {}".format (json_ta["metadata"]["music"][0]["artists"]))

        nombre_tema = json_ta["metadata"]["music"][0]["title"]
        artistas = json_ta["metadata"]["music"][0]["artists"]

        # solucion chomasa para cuando hay mas de un artista en el tema
        artists_names = ""
        for ar in artistas:
            artists_names += ar["name"] + " & "

        artists_names = artists_names[:len(artists_names) - 2]
        logger.debug("nombres artists_names: {}".format (artists_names))


        response = self.repo.insertar_tema_reconocido(id_boliche, nombre_tema, artists_names)
        return response