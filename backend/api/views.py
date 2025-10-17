from rest_framework import generics, permissions
from rest_framework.response import Response
from django.http import JsonResponse
from .models import Translation, Product
from .serializers import ProductSerializer
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework import status

class TranslationsView(View):

    #GET /api/translations?lang=en

    # Cache translations for 5 minutes 
    @method_decorator(cache_page(60 * 5))
    def get(self, request):
        lang = request.GET.get('lang', 'en')[:2].lower()
        items = Translation.objects.filter(lang=lang)
        data = {t.key: t.value for t in items}
        return JsonResponse(data, safe=True)




class ProductListView(APIView):
    def get(self, request):
        products = Product.objects.filter(active=True).order_by('-created_at')
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class ProductDetailView(APIView):
    def get(self, request, pk):
        try:
            product = Product.objects.get(pk=pk, active=True)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = ProductSerializer(product)
        return Response(serializer.data, status=status.HTTP_200_OK)


