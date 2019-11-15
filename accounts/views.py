# pylint: disable=no-member
# from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.views import APIView
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework import permissions
from rest_framework.response import Response
from .models import Account, FutureTransactions
from .serializers import AccountSerializer, PopulatedAccountSerializer, FutureTransactionSerializer
# from jwt_auth.models import User

# Create your views here.


class AccountListView(APIView):
    permission_classes = (permissions.IsAuthenticated, )

    def get(self, _request):
        accounts = self.request.user.accounts.all()
        serialized_accounts = PopulatedAccountSerializer(accounts, many=True)
        return Response(serialized_accounts.data)

    def post(self, request):
        request.data['user'] = request.user.id
        serializer = AccountSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=422)

class AccountDetailView(RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated, )
    serializer_class = AccountSerializer
    queryset = Account.objects.all()

class FutureTransactionsListView(APIView):
    permission_classes = (permissions.IsAuthenticated, )

# dont think get is needed for future transactions
    def get(self, _request):
        future_transactions = FutureTransactions.objects.all()
        serialized_future_transactions = FutureTransactionSerializer(future_transactions, many=True)
        return Response(serialized_future_transactions.data)

# here's a non-generics one, thinl generics might be ok
    def post(self, request, pk):
        request.data['user'] = request.user.id
        request.data['account'] = pk
        transaction = FutureTransactionSerializer(data=request.data)
        if transaction.is_valid():
            transaction.save()
            account = Account.objects.get(pk=pk)
            serialized_account = PopulatedAccountSerializer(account)
            return Response(serialized_account.data, status=201)
        return Response(transaction.errors, status=422)

class FutureTransactionsDetailView(RetrieveUpdateDestroyAPIView):
    permission_classes = (permissions.IsAuthenticated, )
    serializer_class = FutureTransactionSerializer
    queryset = FutureTransactions.objects.all()
