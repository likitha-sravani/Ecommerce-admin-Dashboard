from rest_framework import serializers
from .models import Order, OrderItem

class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    class Meta:
        model = OrderItem
        fields = ['product', 'product_name', 'quantity', 'price']
        extra_kwargs = {
            'product': {'required': True},
            'quantity': {'required': True},
            'price': {'required': True},
        }
        def validate_quantity(self, value):
            if value <= 0:
                raise serializers.ValidationError("Quantity must be greater than 0")
            return value
        def validate_price(self, value):
            if value <= 0:
                raise serializers.ValidationError("Price must be greater than 0")
            return value


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)
    extra_kwargs = {
        'customer_name': {'required': True},
        'status': {'required': True},
    }
    def validate_customer_name(self, value):
        if not value:
            raise serializers.ValidationError("Customer name is required")
        return value
    def validate_status(self, value):
        if value not in ['pending', 'processing', 'completed', 'cancelled']:
            raise serializers.ValidationError("Invalid status")
        return value

    class Meta:
        model = Order
        fields = ['id', 'customer_name', 'status', 'created_at', 'updated_at', 'items']
        extra_kwargs = {
            'created_at': {'read_only': True},
            'updated_at': {'read_only': True},
        }
        def validate_items(self, value):
            if not value:
                raise serializers.ValidationError("Items are required")
            return value


    def create(self, validated_data):
        items_data = validated_data.pop('items')
        order = Order(**validated_data)
        order.save()
        for item_data in items_data:
            item = OrderItem(order=order, **item_data)
            item.save()
        return order
    def update(self, instance, validated_data):
        items_data = validated_data.pop('items')
        instance.customer_name = validated_data.get('customer_name', instance.customer_name)
        instance.status = validated_data.get('status', instance.status)
        instance.save()
        for item_data in items_data:
            item = OrderItem(order=instance, **item_data)
            item.save()
        return instance 