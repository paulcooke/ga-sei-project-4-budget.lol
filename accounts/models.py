from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()

# Create your models here.

# One account class, current/savings/etc are entered in the 'account_type' field
class Account(models.Model):
    user = models.ForeignKey(
        User,
        related_name='accounts',
        on_delete=models.CASCADE,
    )
    name = models.CharField(max_length=50)
    account_type = models.CharField(max_length=50, default='current')
    bank = models.CharField(max_length=50)
    description = models.CharField(max_length=500)
    min_headroom = models.FloatField(null=True)
    current_balance = models.FloatField(null=True) # not required as you'd make account first then add a first balance

    def __str__(self):
        return self.name

# below are all the models for the different types of payment that can be made:
# weekly recurring out, monthly recurring out, yearly recurring out, one off out
# weekly recurring in, monthly recurring in, one off in

class WeeklyRecurringPaymentsOut(models.Model):
    account = models.ForeignKey(
        Account,
        related_name='weekly_recurring_out',
        on_delete=models.CASCADE,
    )
    name = models.CharField(max_length=50, blank=True)
    category = models.CharField(max_length=50, blank=True)
    amount = models.FloatField(null=True) # make required in final version...
    day_of_week = models.CharField(max_length=50, blank=True, default='hello world')

    def __str__(self):
        return self.name

class MonthlyRecurringPaymentsOut(models.Model):
    account = models.ForeignKey(
        Account,
        related_name='monthly_recurring_out',
        on_delete=models.DO_NOTHING,
    )
    name = models.CharField(max_length=50, blank=True)
    category = models.CharField(max_length=50, blank=True)
    amount = models.FloatField(null=True) # make required in final version...
    date_in_month = models.IntegerField(null=True)

    def __str__(self):
        return self.name

class YearlyRecurringPaymentsOut(models.Model):
    account = models.ForeignKey(
        Account,
        related_name='yearly_recurring_out',
        on_delete=models.DO_NOTHING,
    )
    name = models.CharField(max_length=50, blank=True)
    category = models.CharField(max_length=50, blank=True)
    amount = models.FloatField(null=True) # make required in final version...
    payment_date = models.DateField(null=True)

    def __str__(self):
        return self.name
        