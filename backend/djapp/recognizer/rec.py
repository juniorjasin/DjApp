#!/usr/bin/env python
#-*- coding:utf-8 -*-

import os, sys
from acrcloud.recognizer import ACRCloudRecognizer
from acrcloud.recognizer import ACRCloudRecognizeType


import logging

logger = logging.getLogger('rec')
logger.setLevel(logging.DEBUG)
logger.propagate = False
ch = logging.StreamHandler()
ch.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
ch.setFormatter(formatter)
logger.addHandler(ch)

class Recognicion:
    def __init__(self):
        config = {
        'host':'identify-us-west-2.acrcloud.com',
        'access_key':'1f5725403472769afad94a03604a9002',
        'access_secret':'RJzWmNPM75UIznNxifUaMU6qKUIVLfu94HLVPSxC',
        'recognize_type': ACRCloudRecognizeType.ACR_OPT_REC_AUDIO, # you can replace it with [ACR_OPT_REC_AUDIO,ACR_OPT_REC_HUMMING,ACR_OPT_REC_BOTH], The SDK decide which type fingerprint to create accordings to "recognize_type".
        'debug':False,
        'timeout':10 # seconds
        }

        '''This module can recognize ACRCloud by most of audio/video file. 
            Audio: mp3, wav, m4a, flac, aac, amr, ape, ogg ...
            Video: mp4, mkv, wmv, flv, ts, avi ...'''
        print config
        self.re = ACRCloudRecognizer(config)

    def reconocer_tema(self, path_file):
        
        # toma la ruta de la imagen
        data = self.re.recognize_by_file(path_file, 0, 10)
        logger.debug("tema encontrado:" + data.encode('ISO-8859-1'))
        return data
