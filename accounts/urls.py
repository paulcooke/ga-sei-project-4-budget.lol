from django.urls import path
from .views import CurrentAccountListView

urlpatterns = [
    path('accounts', CurrentAccountListView.as_view()),
    #path('accounts/<int:pk>', CurrentAccountDetailView.as_view()),
    
]
