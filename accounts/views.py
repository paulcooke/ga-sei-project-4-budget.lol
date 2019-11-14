# pylint: disable=no-member
# from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.views import APIView
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework import permissions
from rest_framework.response import Response
from .models import Account, WeeklyRecurringPaymentsOut
from .serializers import AccountSerializer, PopulatedAccountSerializer, WeeklyRecurringPaymentsOutSerializer
# from jwt_auth.models import User

# Create your views here.


class AccountListView(APIView):
    permission_classes = (permissions.IsAuthenticated, )
    # ******* perhaps can just filter in teh get request rather than use permissions?

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

class WeeklyRecurringPaymentsOutListView(ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated, )
    serializer_class = WeeklyRecurringPaymentsOutSerializer
    # queryset = WeeklyRecurringPaymentsOut.objects.all()

    def get_queryset(self):
        return self.request.user
        



# class CAccountDetailView(RetrieveUpdateDestroyAPIView):
#     permission_classes = (IsAuthenticatedOrReadOnly, )
#     queryset = Account.objects.all()
#     #serializer_class = StationSerializer

# class LineListView(ListAPIView):
#     queryset = Line.objects.all()
#     serializer_class = LineSerializer

# class LineDetailView(RetrieveAPIView):
#     queryset = Line.objects.all()
#     serializer_class = LineSerializer