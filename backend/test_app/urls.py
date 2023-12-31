from django.urls import path
from . import views

urlpatterns = [
    path("delivery/", views.getDeliveries),
    path("brand/", views.getBrands),
    path('delivery/create/', views.createDelivery),
    path("brand/create/", views.createBrand)
]