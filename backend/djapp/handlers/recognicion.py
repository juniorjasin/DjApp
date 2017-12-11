from domain import service
from repos import mysql_repo
from util import exception
from decorators.decorador import check_authorization
from pydub import AudioSegment
from pydub.utils import which
from recognizer import rec
import subprocess
import datetime
from subprocess import call


AudioSegment.converter = which("ffmpeg")

import io
import logging

logger = logging.getLogger('rec')
logger.setLevel(logging.DEBUG)
logger.propagate = False
ch = logging.StreamHandler()
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)

filename = 'AC_DC - Hells Bells.mp3'

class RecognicionHandler:
    def __init__(self,request):        
        print "__init__ RecognicionHandler"
        self.request = request

    @check_authorization
    def post(self, id_boliche):
        
        global filename

        respuesta = []

        fileBoliche = "{}.mp3".format(id_boliche)
        imagen = open(fileBoliche,'w+')
        imagen.write(self.request.body.read())
        imagen.close()

        # podria verificar si se creo el archivo de alguna forma.
        reco = rec.Recognicion()
        tema_actual = reco.reconocer_tema(fileBoliche)

        repo = mysql_repo.MySqlRepo()
        svc = service.Service(repo)
        respuesta = svc.insertar_tema_reconocido(id_boliche, tema_actual)
        return {"status": respuesta}