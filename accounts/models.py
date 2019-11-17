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
    account_type = models.CharField(max_length=50)
    bank = models.CharField(max_length=50, blank=True)
    description = models.CharField(max_length=500, blank=True)
    min_headroom = models.FloatField(blank=True, default=0)
    current_balance = models.FloatField(null=True) # should be required?
    last_balance_update = models.DateField(null=True, blank=True)
    is_main_account = models.BooleanField(null=True, default=True)

    def __str__(self):
        return self.name

# originally there were multiple models for transactions, but ultimately it was simpler and cleaner to combine them into one
class FutureTransactions(models.Model):
    account = models.ForeignKey(
        Account,
        related_name='future_transactions',
        on_delete=models.CASCADE,
    )
    transaction_is_debit = models.BooleanField()
    name = models.CharField(max_length=50)
    category = models.CharField(max_length=50, blank=True)
    amount = models.FloatField() # make required in final version...
    recurrance = models.CharField(max_length=50) # will be a drop down containing 'yearly, monthly, weekly, one-off'. could possibly add things like daily or 'weekdays' in the future
    day_of_week = models.CharField(max_length=50, blank=True) # for weekly transactions
    date_in_month = models.IntegerField(null=True) # for monthly transactions
    annual_date = models.DateField(null=True, blank=True) # for yearly transactions
    one_off_date = models.DateField(null=True, blank=True) # for one off transactions

    def __str__(self):
        return self.name
