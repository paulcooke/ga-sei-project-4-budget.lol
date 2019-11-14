# pylint: disable=no-member
# from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.views import APIView
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework import permissions
from rest_framework.response import Response
from .models import CurrentAccount, WeeklyRecurringPaymentsOut
from .serializers import CurrentAccountSerializer, PopulatedCurrentAccount, WeeklyRecurringPaymentsOutSerializer
# from jwt_auth.models import User

# Create your views here.
class IsAccountOwner(permissions.BasePermission):

    # def has_permission(self, request, view):
    #     if request.user.id == User.id:
    #         return True
    #     return False

    def has_object_permission(self, request, view, current_account_obj):
        return current_account_obj.owner.id == request.user.id

    # def has_view_permission(self, request, view):
    #     return request and request.user.is_authenticated

class CurrentAccountListView(APIView):
    permission_classes = (permissions.IsAuthenticated, IsAccountOwner)

    def get(self, _request):
        accounts = CurrentAccount.objects.all()
        serialized_accounts = PopulatedCurrentAccount(accounts, many=True)
        return Response(serialized_accounts.data)
        
    def post(self, request):
        request.data['user'] = request.user.id
        serializer = CurrentAccountSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=422)

class WeeklyRecurringPaymentsOutListView(ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated, )
    queryset = WeeklyRecurringPaymentsOut.objects.all()
    serializer_class = WeeklyRecurringPaymentsOutSerializer



# class CurrentAccountDetailView(RetrieveUpdateDestroyAPIView):
#     permission_classes = (IsAuthenticatedOrReadOnly, )
#     queryset = CurrentAccount.objects.all()
#     #serializer_class = StationSerializer

# class LineListView(ListAPIView):
#     queryset = Line.objects.all()
#     serializer_class = LineSerializer

# class LineDetailView(RetrieveAPIView):
#     queryset = Line.objects.all()
#     serializer_class = LineSerializer