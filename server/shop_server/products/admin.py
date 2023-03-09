from django.contrib import admin
from .models import *


admin.site.register(Product)
admin.site.register(Seller)
admin.site.register(VoteToSeller)
admin.site.register(VoteToProduct)
admin.site.register(ProductImage)
admin.site.register(SellerImage)