from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Test
from .serializers import TestSerializer

@api_view(['GET'])
def getData(request):
    items = Test.objects.all()
    serializer = TestSerializer(items, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def createTest(request):
    serializer = TestSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)
