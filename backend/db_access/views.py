from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import InventoryItem
from .serializers import InventoryItemSerializer
from django.http import HttpResponse
from rest_framework import status, viewsets
import logging

logger = logging.getLogger(__name__)

        
class InventoryItemViewSet(viewsets.ViewSet):
    def create(self, request):
        serializer = InventoryItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.data)

    def put(self, request):
        request_size = len(request.data)
        successful_updates = 0
        for data in request.data:
            item = InventoryItem.objects.get(id=data["id"])
            serializer = InventoryItemSerializer(item, data=data)
            if serializer.is_valid():
                serializer.save()
                successful_updates += 1
            else:
                return Response(f"serialization failed with {data}" ,status=status.HTTP_400_BAD_REQUEST)
        return Response({"message": f"{successful_updates}/{request_size} entries updated successfully."}, status=status.HTTP_202_ACCEPTED)

    def get(self, request):
        items = InventoryItem.objects.all()
        serializer = InventoryItemSerializer(items, many=True)
        return Response(serializer.data)