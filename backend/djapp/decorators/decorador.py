from functools import wraps
from util import exception
import json
from bottle import response

def my_decorator(f):
    @wraps(f)
    def wrapper(*args, **kwds):
        try:        
            print 'Inside decorator. Calling decorated function'
            return f(*args, **kwds)
        except exception.InfoException as ex:
            if isinstance(ex, exception.BadRequest):
                response.status = 400
            elif isinstance(ex, exception.NotFound):
                response.status = 404
            elif isinstance(ex, exception.InternalServerError):
                response.status = 500
            response.body = str(ex)
            return response
    return wrapper

