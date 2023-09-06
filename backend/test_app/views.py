from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Delivery, Brand
from .serializers import BrandSerializer, DeliverySerializer
from django.http import HttpResponse
from rest_framework import status


@api_view(['POST'])
def createDelivery(request):
    serializer = DeliverySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.data)

@api_view(['POST'])
def createBrand(request):
    serializer = BrandSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.data)

@api_view(["GET"])
def getDeliveries(request):
    items = Delivery.objects.all()
    serializer = DeliverySerializer(items, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def getBrands(request):
    items = Brand.objects.all()
    serializer = BrandSerializer(items, many=True)
    return Response(serializer.data)