import json

CONTEXT_KEY = 'context'
DEVELOPER_MESSAGE_KEY = 'developer_message'
USER_MESSAGE_KEY = 'user_message'


class InfoException (Exception):
    def __init__(self,info):
        self.info = info
        super(InfoException, self).__init__(self.info[CONTEXT_KEY])

    def information(self):
        return self.info

    def __str__(self):
        return json.dumps(self.info)

class BadRequest(InfoException):
    def __init__(self, context):
        self.info = dict()
        self.info[DEVELOPER_MESSAGE_KEY] = 'bad request developer'
        self.info[USER_MESSAGE_KEY] = 'Error en los datos que envio el usuario'
        self.info[CONTEXT_KEY] = context

        super(BadRequest, self).__init__(self.info)

class NotFound(InfoException):
    def __init__(self, context):
        self.info = dict()
        self.info[DEVELOPER_MESSAGE_KEY] = 'resource not found developer'
        self.info[USER_MESSAGE_KEY] = 'El recurso que se buscaba no se encotro user'
        self.info[CONTEXT_KEY] = context

        super(NotFound, self).__init__(self.info)


class InternalServerError(InfoException):
    def __init__(self, context):
        self.info = dict()
        self.info[DEVELOPER_MESSAGE_KEY] = 'Internal Server Error developer'
        self.info[USER_MESSAGE_KEY] = 'Problemas tecnicos internos user'
        self.info[CONTEXT_KEY] = context

        super(InternalServerError, self).__init__(self.info)