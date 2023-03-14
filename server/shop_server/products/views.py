from json import loads

from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.test import APIClient
from rest_framework.parsers import JSONParser

from django.db import transaction
from django.shortcuts import get_object_or_404

from .models import Product
from .serializers import ProductSerializer
from .service import ProductFilter
from .errors import NotEnoughAvailableError


class ProductsListCreate(generics.ListCreateAPIView):
    queryset = Product.objects.filter(available__gt=0)
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter]
    search_fields = ['title']
    filterset_class = ProductFilter

    def perform_create(self, serializer):
        data = self.request.data
        seller_id = data.get('seller_id')

        serializer.save(seller_id=seller_id)
    

@api_view(['PUT'])
def buy_product(request, product_id, count):
    product = get_object_or_404(Product, id=product_id)

    try:
        product.buy(count)
        return Response(status=status.HTTP_204_NO_CONTENT)

    except NotEnoughAvailableError as e:
        return Response(
            {
                'detail': str(e)
            },
            status=e.status_code
        )


@api_view(['PUT'])
def buy_cart(request):
    print(request)
    data = request.data
    print(data)

    with transaction.atomic():
        for product_in_cart in data:
            product = Product.objects.get(id=product_in_cart['id'])
            product.buy(product_in_cart['count'])

        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['PUT'])
def add_product(request, product_id, count):
    product = Product.objects.filter(
        id=product_id
    )[0]

    if not product:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    product.available += count
    product.save()

    return Response(status=status.HTTP_204_NO_CONTENT)
