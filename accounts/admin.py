from django.contrib import admin
from .models import Account, FutureTransactions
# Register your models here.
admin.site.register(Account)
admin.site.register(FutureTransactions)
