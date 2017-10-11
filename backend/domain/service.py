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
        if len(boliches) == 0:
            ret = {"status":"Ok", "boliche":"Ningun boliche cercano"}
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
                ret = {"status":"OK", "boliche":row["nombre"]}
                mssg = json.dumps(ret)
                return json.loads(mssg)
        ret = {"status":"Ok", "boliche":"Ningun boliche cercano"}
        mssg = json.dumps(ret)
        return json.loads(mssg)    

    def insertar_boliche(self,nombre,lat,lon):
        response = self.repo.insertar_boliche(nombre,lat,lon)
        return response