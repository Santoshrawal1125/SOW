from django.urls import path
from .views import TranslationsView, ProductListView,ProductDetailView

urlpatterns = [
    
    path('translations/', TranslationsView.as_view(), name='translations'),
    path('products/', ProductListView.as_view(), name='product-list'),
    path('products/<int:pk>/', ProductDetailView.as_view(), name='product-detail'),

]


