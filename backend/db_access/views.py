from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Delivery, Brand, Transaction, BrandDelivery, InventoryItem
from .serializers import BrandSerializer, DeliverySerializer, TransactionSerializer, InventorySerializer
from django.http import HttpResponse
from rest_framework import status

# Create your views here.

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


@api_view(["GET", "PUT", "POST", "DELETE"])
def inventoryAccess(request, id=None):

    # access on whole model
    if id is None:
        if request.method == "GET":
            items = InventoryItem.objects.all()
            serializer = InventorySerializer(items, many=True)
            return Response(serializer.data)

        elif request.method == "POST":
            serializer = InventorySerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response(serializer.data)

        else: return Response(data="this request method is not allowed when accessing whole model", status=status.HTTP_400_BAD_REQUEST)
        
    # access on one element of model    
    else:
        # check if valid id is given
        if not (isinstance(id, int) and id >= 0): return Response(data="the id needs to be a positive integer", status=status.HTTP_400_BAD_REQUEST)
        try:
            item = InventoryItem.objects.get(pk=id)
        except InventoryItem.DoesNotExist:
            return Response(data="given id is not in Inventory", status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = InventorySerializer(item)
        return Response(serializer.data)

    elif request.method == "PUT":
        serializer = InventorySerializer(item, data=request.data)
        if serializer.is_valid():
                serializer.save()
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.data)

    elif request.method == "DELETE":
        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
