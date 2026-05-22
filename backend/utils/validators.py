import re

def validate_email(email):
    regex = r'^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$'
    if re.search(regex, email):
        return True
    return False

def validate_required_fields(data, required_fields):
    missing_fields = []
    for field in required_fields:
        if field not in data or not str(data[field]).strip():
            missing_fields.append(field)
    return missing_fields
