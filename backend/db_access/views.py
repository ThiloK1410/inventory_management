from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Delivery, Brand, Transaction, BrandDelivery, Inventory
from .serializers import BrandSerializer, DeliverySerializer, TransactionSerializer, InventorySerializer
from django.http import HttpResponse
from rest_framework import status

# Create your views here.

# Setter functions to create entries in db_access


@api_view(["POST"])
def createDelivery(request):
    serializer = DeliverySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.data)


@api_view(["POST"])
def createBrand(request):
    serializer = BrandSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.data)


@api_view(["POST"])
def createTransaction(request):
    serializer = TransactionSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.data)


# Getter functions


@api_view(["GET"])
def getDeliveries(request):
    # Return the newest deliveries first
    items = Delivery.objects.order_by("-date")
    serializer = DeliverySerializer(items, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def getBrands(request):
    items = Brand.objects.all()
    serializer = BrandSerializer(items, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def getTransactions(request):
    items = Transaction.objects.all()
    serializer = TransactionSerializer(items, many=True)
    return Response(serializer.data)

# all in one rest implementation for better overview
@api_view(["GET", "PUT", "CREATE"])
def inventory(request, id=None):

    if request.method == "GET":
        if id is None:
            items = Inventory.objects.all()
            serializer = InventorySerializer(items, many=True)
            return Response(serializer.data)
        else:
            try:
                Inventory.objects.get(id)
            except Inventory.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)
    
    elif request.method == "PUT":
        serializer = InventorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.data)
