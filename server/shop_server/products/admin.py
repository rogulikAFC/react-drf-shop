from django.contrib import admin
from .models import *


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['title', 'id', 'available', 'price', 'get_seller_title']
    search_fields = ['title__startswith']

    def get_seller_title(self, obj):
        return obj.seller.title
    
    get_seller_title.short_description = 'seller'


admin.site.register(Seller)
admin.site.register(VoteToSeller)
admin.site.register(VoteToProduct)
admin.site.register(ProductImage)
admin.site.register(SellerImage)