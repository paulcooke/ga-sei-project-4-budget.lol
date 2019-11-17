# pylint: disable=no-member,arguments-differ
from rest_framework import serializers
from jwt_auth.serializers import NestedUserSerializer
from .models import Account, FutureTransactions
# from django.apps import apps
# apps.get_model('jwt_auth.User')

class NestedAccountSerializer(serializers.ModelSerializer):

    class Meta:
        model = Account
        fields = ('id', 'name', 'bank')

class NestedFutureTransactionsSerializer(serializers.ModelSerializer):

    class Meta:
        model = FutureTransactions
        fields = ('id', 'name', 'category', 'transaction_is_debit', 'amount', 'recurrance', 'day_of_week', 'date_in_month', 'annual_date', 'one_off_date')

class AccountSerializer(serializers.ModelSerializer):

    future_transactions = NestedFutureTransactionsSerializer(many=True, required=False)

    class Meta:
        model = Account
        fields = ('id', 'user', 'name', 'bank', 'description', 'min_headroom', 'current_balance', 'future_transactions', 'is_main_account')
        extra_kwargs = {'user': {'required': False}}

class PopulatedAccountSerializer(AccountSerializer):

    user = NestedUserSerializer()

class FutureTransactionSerializer(serializers.ModelSerializer):

    class Meta:
        model = FutureTransactions
        fields = ('account', 'id', 'name', 'category', 'transaction_is_debit', 'amount', 'recurrance', 'day_of_week', 'date_in_month', 'annual_date', 'one_off_date')
        extra_kwargs = {'account': {'required': False}}
