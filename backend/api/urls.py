from django.urls import path
from .views import TranslationsView, ProductListView

urlpatterns = [
    path('translations/', TranslationsView.as_view(), name='translations'),
    path('products/', ProductListView.as_view(), name='products'),
]
