from rest_framework import serializers
from .models import Product, SellerImage, ProductImage, Seller


class ProductSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    image = serializers.SerializerMethodField('get_image')
    seller_info = serializers.SerializerMethodField('get_seller_info')
    rating = serializers.CharField(source='get_rating', read_only=True)
    seller_id = serializers.PrimaryKeyRelatedField(
        queryset=Seller.objects.all(),
        write_only=True
    )

    def get_seller_info(self, product):
        seller = product.seller
        # seller_image = SellerImage.objects.filter(
        #     seller=seller
        # )[0]
        try:
            seller_image = SellerImage.objects.get(seller=seller)
        
        except:
            seller_image = None

        return {
            'id': seller.id,
            'title': seller.title,
            'image': seller_image.get_path() if seller_image else None,
            'rating': seller.get_rating(),
            'is_certified': seller.is_certified
        }
    
    def get_image(self, product):
        try:
            image = ProductImage.objects.filter(
                product=product
            )[0]

            return image.get_path()

        except:
            return

    class Meta:
        fields = [
            'id', 'title', 'price',
            'description', 'available', 'image',
            'seller_id', 'rating', 'seller_info'
        ]
        model = Product
