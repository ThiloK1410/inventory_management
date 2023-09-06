from django.urls import path
from . import views

urlpatterns = [
    path("delivery/", views.getDeliveries),
    path("brand/", views.getBrands),
    path("transaction/", views.getTransactions),
    path('delivery/create/', views.createDelivery),
    path("brand/create/", views.createBrand),
    path("transaction/create/", views.createBrand)
]