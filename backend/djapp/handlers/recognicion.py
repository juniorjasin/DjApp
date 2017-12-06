from domain import service
from repos import mysql_repo
from util import exception
from decorators.decorador import check_authorization
from pydub import AudioSegment
from pydub.utils import which
from recognizer import rec
import subprocess

AudioSegment.converter = which("ffmpeg")

from pydub.playback import play
import io


import base64
import logging

logger = logging.getLogger('rec')
logger.setLevel(logging.DEBUG)
logger.propagate = False
ch = logging.StreamHandler()
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)


filename = 'new.mp3'
# filename = 'Martin Garrix  Dua Lipa - Scared To Be Lonely (Official Video).mp3'


class RecognicionHandler:
    def __init__(self,request):        
        print "__init__ RecognicionHandler"
        self.request = request

    @check_authorization
    def post(self, id_boliche):
        
        respuesta = []

        # NO VA A FUNCIONAR HASTA QUE NO LE MANDE UN TEMA REAL
        song = AudioSegment.from_file(io.BytesIO(self.request.body.read()), format="mp3")
        song.export(filename, format="mp3")

        # podria verificar si se creo el archivo de alguna forma.

        reco = rec.Recognicion()
        tema_actual = reco.reconocer_tema(filename)

        repo = mysql_repo.MySqlRepo()
        svc = service.Service(repo)
        respuesta = svc.insertar_tema_reconocido(id_boliche, tema_actual)
        return {"status": respuesta}