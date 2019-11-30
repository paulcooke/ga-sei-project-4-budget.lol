# first do pipenv install pyjwt
from rest_framework.authentication import BasicAuthentication
from rest_framework.exceptions import PermissionDenied
from django.contrib.auth import get_user_model # we didnt create a user model, this is the one that comes with django
from django.conf import settings # so we can get the secret it's generated for us (see project.settings.py)
import jwt
User = get_user_model()

class JWTAuthentication(BasicAuthentication):

    def authenticate(self, request):
        header = request.headers.get('Authorization')

        if not header:
            return None

        if header.startswith('Basic'):
            return None

        if not header.startswith('Bearer'):
            raise PermissionDenied({'message': 'Invalid Authorization header'})

        token = header.replace('Bearer ', '')

        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            user = User.objects.get(pk=payload.get('sub'))
        except jwt.exceptions.InvalidTokenError: # exceptions are another way of describing errors. Invalid toekn error is built in
            raise PermissionDenied({'message': 'Invalid Token'}) # raise an error == throw an error
        except User.DoesNotExist: # built in method to check if user exists
            raise PermissionDenied({'message': 'User not found'})

        return (user, token) # returned if all ok. DRF will now storing user on requests.user, for when we need it elsewhere. the token is also there on request.auth
