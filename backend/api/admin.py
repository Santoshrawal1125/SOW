from django.contrib import admin
from .models import Translation

@admin.register(Translation)
class TranslationAdmin(admin.ModelAdmin):
    list_display = ('key','lang','value')
    list_filter = ('lang',)
    search_fields = ('key','value')
