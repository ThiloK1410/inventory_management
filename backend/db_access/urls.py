from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register("inventory", views.InventoryItemViewSet)

urlpatterns = router.urls