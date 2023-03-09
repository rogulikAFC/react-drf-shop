from rest_framework import serializers
from .models import Product, SellerImage, ProductImage


class ProductSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    title = serializers.ReadOnlyField()
    price = serializers.ReadOnlyField()
    available = serializers.ReadOnlyField()
    image = serializers.SerializerMethodField('get_image')

    seller_info = serializers.SerializerMethodField('get_seller_info')
    rating = serializers.SerializerMethodField('get_rating')

    def get_seller_info(self, product):
        seller = product.seller
        seller_image = SellerImage.objects.filter(
            seller=seller
        )[0]

        return {
            'id': seller.id,
            'title': seller.title,
            'image': seller_image.get_path(),
            'rating': seller.get_rating(),
            'is_certified': seller.is_certified
        }
    
    def get_rating(self, product):
        return product.get_rating()
    
    def get_image(self, product):
        image = ProductImage.objects.filter(
            product=product
        )[0]

        return image.get_path()

    class Meta:
        fields = [
            'id', 'title', 'price',
            'available', 'image', 'rating',
            'seller_info'
        ]
        model = Product
