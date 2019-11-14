# pylint: disable=no-member,arguments-differ
from rest_framework import serializers
from jwt_auth.serializers import NestedUserSerializer
from .models import CurrentAccount, WeeklyRecurringPaymentsOut
# from django.apps import apps
# apps.get_model('jwt_auth.User')

class NestedCurrentAccountSerializer(serializers.ModelSerializer):

    class Meta:
        model = CurrentAccount
        fields = ('id', 'name', 'bank')

class CurrentAccountSerializer(serializers.ModelSerializer):

    class Meta:
        model = CurrentAccount
        fields = ('id', 'user', 'name', 'bank', 'description', 'min_headroom')

class PopulatedCurrentAccount(CurrentAccountSerializer):

    user = NestedUserSerializer()

class WeeklyRecurringPaymentsOutSerializer(serializers.ModelSerializer):

    class Meta:
        model = WeeklyRecurringPaymentsOut
        fields = ('id', 'account', 'name', 'category', 'amount')







# user = models.ForeignKey('jwt_auth.User')
# class StationSerializer(serializers.ModelSerializer):

#     zone = NestedZoneSerializer()
#     lines = NestedLineSerializer(many=True)

#     def create(self, data): # data is the incoming json converted to a python dict
#         zone_data = data.pop('zone') # separate the zone first. _data is a dictionary in python, pop returns the data for this field and deletes it from the dictionary
#         lines_data = data.pop('lines')

#         station = Station(**data) # kwargs, like spread in js. create station from the data left over after popping
#         station.zone = Zone.objects.get(**zone_data) # add the zones back in after finding the correct one from the db
#         lines = [Line.objects.get(**line_data) for line_data in lines_data] # finding all the lines that need to be added
#         station.save() # save to ensure primary key is created before attempting to set a many to many relationship in the model
#         station.lines.set(lines) # now it's been saved we can set the lines
#         return station #return the newly created station to be sent in the response to the client

#     def update(self, station, data):
#         zone_data = data.pop('zone')
#         lines_data = data.pop('lines')

#         station.name = data.get('name', station.name)
#         station.lat = data.get('lat', station.lat)
#         station.lon = data.get('lon', station.lon)
#         station.is_night_tube = data.get('is_night_tube', station.is_night_tube)

#         station.zone = Zone.objects.get(**zone_data)
#         lines = [Line.objects.get(**line_data) for line_data in lines_data]
#         station.save()
#         station.lines.set(lines)
#         return station

#     class Meta:
#         model = Station
#         fields = ('id', 'name', 'lat', 'lon', 'is_night_tube', 'zone', 'lines')
