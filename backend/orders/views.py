from django.shortcuts import render
from rest_framework import generics
from .models import Order
from .serializers import OrderSerializer
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
class OrderListCreateView(generics.ListCreateAPIView):
    queryset = Order._default_manager.all()
    serializer_class = OrderSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['status', 'customer_name']
    search_fields = ['customer_name']
    ordering_fields = ['created_at', 'status']
    pagination_class = PageNumberPagination
    permission_classes = [IsAuthenticated]
    # Fixed: Use correct filter backend references and remove duplicate methods
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]

    def get_queryset(self):
        return Order._default_manager.all()

    def get_serializer_class(self):
        return OrderSerializer
        return OrderSerializer

class OrderRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Order._default_manager.all()
    serializer_class = OrderSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['status', 'customer_name']
    search_fields = ['customer_name']
    ordering_fields = ['created_at', 'status']
    pagination_class = PageNumberPagination
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return Order._default_manager.all()
    def get_serializer_class(self):
        return OrderSerializer
# Create your views here.
