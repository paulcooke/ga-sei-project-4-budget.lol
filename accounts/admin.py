from django.contrib import admin
from .models import CurrentAccount, WeeklyRecurringPaymentsOut
# Register your models here.
admin.site.register(CurrentAccount)
admin.site.register(WeeklyRecurringPaymentsOut)
