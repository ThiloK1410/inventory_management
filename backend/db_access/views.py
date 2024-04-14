from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Delivery, Brand, Transaction, BrandDelivery, InventoryItem
from .serializers import BrandSerializer, DeliverySerializer, TransactionSerializer
from django.http import HttpResponse
from rest_framework import status, viewsets


# Setter functions to create entries in db_access

@api_view(["POST", "GET"])
def transactionAccess(request):

    if request.method == "POST":
        serializer = TransactionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.data)
    
    elif request.method == "GET":
        items = Transaction.objects.all()
        serializer = TransactionSerializer(items, many=True)
        return Response(serializer.data)


@api_view(["POST", "GET"])
def deliveryAccess(request):

    if request.method == "POST":
        serializer = DeliverySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.data)
    
    elif request.method == "GET":
        # Return the newest deliveries first
        items = Delivery.objects.order_by("-date")
        serializer = DeliverySerializer(items, many=True)
        return Response(serializer.data)


@api_view(["POST", "GET"])
def brandAccess(request):

    if request.method == "POST":
        serializer = BrandSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.data)
    
    if request.method == "GET":
        items = Brand.objects.all()
        serializer = BrandSerializer(items, many=True)
        return Response(serializer.data)

        
class InventoryItemViewSet(viewsets.ViewSet):
    def create(self, request):
        serializer = InventoryItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.data)

    def put(self, request):
        serializer = InventorySerializer(item, data=request.data)
        if serializer.is_valid():
                serializer.save()
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.data)

    def get(self, request):
        items = InventoryItem.objects.all()
        serializer = InventorySerializer(items, many=True)
        return Response(serializer.data)