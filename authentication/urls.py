from django.urls import path
from . import views

urlpatterns = [
    # Home
    path('', views.home, name='home'),
         
    # Authentication
    path('login/', views.userLogin, name='login'),
    path('logout/', views.userLogout, name='logout'),
         
    # Registration
    path('register/', views.userRegister, name='register'),
]