from django.urls import path
#from .views import main
from .views import AdminView
from .views import OperatorView

urlpatterns = [
    path('homeA', AdminView.as_view()),
     path('homeO', OperatorView.as_view()),
]
