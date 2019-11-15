from rest_framework import serializers
from django.contrib.auth import get_user_model # not User anymore as we've extended the user and need to do this instead.
import django.contrib.auth.password_validation as validations
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError
from django.apps import apps
User = get_user_model()
Account = apps.get_model('accounts', 'Account')

# this serializer is the same of the nested serializer in account.serializers. the app is imported above to avoid a circular app reference.
class AccountSerializer(serializers.ModelSerializer):

    class Meta:
        model = Account
        fields = ('id', 'name', 'bank')

class NestedUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username')

class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True) # stops password being readable
    password_confirmation = serializers.CharField(write_only=True)
    accounts = AccountSerializer(many=True, required=False)

    def validate(self, data): # data is the data from the request

        password = data.pop('password')
        password_confirmation = data.pop('password_confirmation')

        if password != password_confirmation:
            raise ValidationError({'password_confirmation': 'does not match'})

        # try:
        #     validations.validate_password(password=password) # validate_password is in-built, remember python uses lots of keyword arguments (hence the password = password)
        # except ValidationError as err:
        #     raise serializers.ValidationError({'password': err.messages})

        data['password'] = make_password(password) # django has a make_passwrod function for hasing passwords
        return data # return the data with the freshly hashed password

    class Meta:

        model = User
        fields = ('id', 'username', 'email', 'password', 'password_confirmation', 'profile_image', 'salary', 'accounts') # django will not be able to send the password and password_confirmation fields out as they are write only, so they can't be read
        extra_kwargs = {'accounts': {'required': False}}
