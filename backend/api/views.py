from rest_framework import generics, permissions
from rest_framework.response import Response
from django.http import JsonResponse
from .models import Translation, Product
from .serializers import ProductSerializer
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page

class TranslationsView(View):

    #GET /api/translations?lang=en

    # Cache translations for 5 minutes 
    @method_decorator(cache_page(60 * 5))
    def get(self, request):
        lang = request.GET.get('lang', 'en')[:2].lower()
        items = Translation.objects.filter(lang=lang)
        data = {t.key: t.value for t in items}
        return JsonResponse(data, safe=True)


class ProductListView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ProductSerializer
    queryset = Product.objects.all()


