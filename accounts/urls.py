from django.urls import path
from .views import AccountListView, AccountDetailView, WeeklyRecurringPaymentsOutListView, WeeklyRecurringPaymentsOutDetailView

urlpatterns = [
    path('accounts', AccountListView.as_view()),
    path('accounts/<int:pk>', AccountDetailView.as_view()),
    path('accounts/<int:pk>/weeklypaymentsout', WeeklyRecurringPaymentsOutListView.as_view()),
    path('weeklypaymentsout/<int:pk>', WeeklyRecurringPaymentsOutDetailView.as_view())
]
