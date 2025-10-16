from django.db import models


class Translation(models.Model):
    key = models.CharField(max_length=255)
    lang = models.CharField(max_length=2)
    value = models.TextField()

    class Meta:
        unique_together = ('key','lang')
        ordering = ['key']

    def __str__(self):
        return f"{self.key} [{self.lang}]"

class Product(models.Model):
    sku = models.CharField(max_length=64, blank=True, null=True)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    unit = models.CharField(max_length=30, blank=True)
    in_price = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    price = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    tax_percent = models.SmallIntegerField(default=0)
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)