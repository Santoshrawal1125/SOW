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
    article_no = models.CharField("Article No.", max_length=64, unique=True, blank=True, null=True)
    product_service = models.CharField("Product/Service", max_length=255,blank=True, null=True)
    in_price = models.DecimalField("In Price", max_digits=12, decimal_places=2, default=0)
    price = models.DecimalField("Price", max_digits=12, decimal_places=2, default=0)
    unit = models.CharField("Unit", max_length=30, blank=True)
    in_stock = models.PositiveIntegerField("In Stock", default=0)
    description = models.TextField("Description", blank=True)
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.article_no} - {self.product_service}"
