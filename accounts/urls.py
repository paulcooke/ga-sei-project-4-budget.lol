from django.urls import path
from .views import AccountListView

urlpatterns = [
    path('accounts', AccountListView.as_view()),
    #path('accounts/<int:pk>', AccountDetailView.as_view()),

]
