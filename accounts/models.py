from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()

# Create your models here.

class CurrentAccount(models.Model):
    user = models.ForeignKey(
        User,
        related_name='current_account',
        on_delete=models.DO_NOTHING,
    )
    name = models.CharField(max_length=50)
    bank = models.CharField(max_length=50)
    description = models.CharField(max_length=500)
    min_headroom = models.FloatField(null=True)

    def __str__(self):
        return self.name

# ******* should currrent account just be account and have an account type field? ********

class WeeklyRecurringPaymentsOut(models.Model):
    account = models.ForeignKey(
        CurrentAccount,
        related_name='weekly_recurring_out',
        on_delete=models.DO_NOTHING,
    )
    name = models.CharField(max_length=50, blank=True)
    category = models.CharField(max_length=50, blank=True)
    amount = models.FloatField(null=True) # make required in final version...
    
    def __str__(self):
        return self.name
