from django.urls import path
from . import views

urlpatterns = [
    path("delivery/", views.deliveryAccess),
    path("brand/", views.brandAccess),
    path("transaction/", views.transactionAccess),
    path("inventory/", views.inventoryAccess),
    path("inventory/<int:id>", views.inventoryAccess)
]