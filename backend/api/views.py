# views.py
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.cache import cache_page

from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Translation, Product
from .serializers import ProductSerializer
from django.db import transaction


class TranslationsView(View):
    # GET /api/translations?lang=en
    # Cache translations for 5 minutes
    @method_decorator(cache_page(60 * 5))
    def get(self, request):
        lang = request.GET.get('lang', 'en')[:2].lower()
        items = Translation.objects.filter(lang=lang)
        data = {t.key: t.value for t in items}
        return JsonResponse(data, safe=True)


class ProductListView(APIView):
    """
    GET /api/products/
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        products = Product.objects.filter(active=True).order_by('created_at')
        serializer = ProductSerializer(products, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

        

class ProductDetailView(APIView):

    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_object(self, pk):

        return Product.objects.get(pk=pk, active=True)

    def get(self, request, pk):
        try:
            product = self.get_object(pk)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = ProductSerializer(product, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    @transaction.atomic
    def patch(self, request, pk):

        try:
            product = self.get_object(pk)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = ProductSerializer(product, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
