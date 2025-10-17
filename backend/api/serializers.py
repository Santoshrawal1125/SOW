from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ["id", "article_no", "product_service", "in_price", "price", "unit", "in_stock", "description", "active", "created_at"]        


