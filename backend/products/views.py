from django.shortcuts import render
from rest_framework import generics
from .models import Product
from .serializers import ProductSerializer
from typing import Type
from .models import Product

class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.all()  # type: ignore
    serializer_class = ProductSerializer

class ProductRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()  # type: ignore
    serializer_class = ProductSerializer
    serializer_class = ProductSerializer