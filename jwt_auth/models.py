from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class User(AbstractUser):

    profile_image = models.CharField(max_length=500, blank=True)
    email = models.EmailField(blank=False)
    salary = models.FloatField(null=True)
# look at extending email and making it required and unique
