from django.contrib import admin
from .models import Account, WeeklyRecurringPaymentsOut
# Register your models here.
admin.site.register(Account)
admin.site.register(WeeklyRecurringPaymentsOut)
