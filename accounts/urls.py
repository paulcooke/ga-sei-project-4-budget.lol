from django.urls import path
from .views import AccountListView, AccountDetailView, FutureTransactionsListView, FutureTransactionsDetailView
urlpatterns = [
    path('accounts', AccountListView.as_view()),
    path('accounts/<int:pk>', AccountDetailView.as_view()),
    path('accounts/<int:pk>/futuretransactions', FutureTransactionsListView.as_view()),
    path('futuretransactions/<int:pk>', FutureTransactionsDetailView.as_view()),
]
