from math import sin,cos,sqrt,asin,pi
import pyproj, sys
import json

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
        # print "self.repo", self.repo
        response = self.repo.obtener_tema_actual(id_boliche)           
        return response

    def insertar_tema_actual(self,nombre,lat,lon):
        response = self.repo.insertar_tema_actual(nombre,lat,lon)
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