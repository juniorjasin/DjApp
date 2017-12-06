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







class RecognicionHandler:
    def __init__(self,request):        
        print "__init__ RecognicionHandler"
        self.request = request

    @check_authorization
    def post(self, id_boliche):
        result = []
        data = self.request.json
        # print data
        logger.debug("DATA:")
        # logger.debug(data)

        audio = data["audio"]
        logger.debug("AUDIO:")
        # logger.debug(audio)
        result = []

        imagen = open('prueba.flac','wb')
        imagen.write(audio.encode('utf-16be'))
        imagen.close()

        
        #data = self.request.json
        # logger.debug("audiosegement:" + AudioSegment.converter)

        
        # try:
        # subprocess.call(['ffmpeg', '-analyzeduration', '2147483647', '-probesize', '2147483647', '-i', 'file1.flac', 'file99.flac'])

        #data = open('file99.flac', 'rb').read()
        # song = AudioSegment.from_file(io.BytesIO(data), format="flac")


        # ffmpeg -analyzeduration 2147483647 -probesize 2147483647 -i file1.flac file99.flac

    

        repo = mysql_repo.MySqlRepo()
        svc = service.Service(repo)
        respuesta = svc.insertar_tema_reconocido(id_boliche)
        return {"status": respuesta}