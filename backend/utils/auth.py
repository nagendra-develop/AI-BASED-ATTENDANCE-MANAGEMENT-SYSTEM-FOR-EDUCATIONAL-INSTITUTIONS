from functools import wraps
from flask_jwt_extended import get_jwt, verify_jwt_in_request
from utils.response_handler import error_response

def admin_required():
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            verify_jwt_in_request()
            claims = get_jwt()
            if claims.get("role") != "admin":
                return error_response("Admins only!", status_code=403)
            return fn(*args, **kwargs)
        return decorator
    return wrapper
