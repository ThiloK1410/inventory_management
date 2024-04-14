from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r"delivery", views.DeliveryViewSet, "delivery")

urlpatterns = [
    *router.urls,
    path("brand/", views.brandAccess),
    path("transaction/", views.transactionAccess),
    path("inventory/", views.inventoryAccess),
    path("inventory/<int:id>", views.inventoryAccess),
]
