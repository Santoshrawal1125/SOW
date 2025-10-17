from django.contrib import admin
from .models import Translation
from .models import Product

@admin.register(Translation)
class TranslationAdmin(admin.ModelAdmin):
    list_display = ('key','lang','value')
    list_filter = ('lang',)
    search_fields = ('key','value')


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("article_no", "product_service", "in_price", "price", "unit", "in_stock", "active", "created_at")
    search_fields = ("article_no", "product_service")
    list_filter = ("active",)
