from os import path

from django.db import models
from django.dispatch import receiver
from uuid import uuid4
# from django.db.models import F

from .errors import NotEnoughAvailableError


class Product(models.Model):
    id = models.UUIDField(
        default=uuid4,
        unique=True,
        primary_key=True
    )
    title = models.CharField(
        max_length=128,
    )
    description = models.CharField(
        max_length=256,
        default=None,
        null=False
    )
    price = models.IntegerField()
    available = models.IntegerField()

    seller = models.ForeignKey(
        'Seller', on_delete=models.CASCADE,
        default=None,
        null=False
    )

    def get_rating(self):
        votes = VoteToProduct.objects.filter(
            product=self
        )
        votes_count = len(votes)
        
        if votes_count == 0:
            return 'There are not any votes yet'
        
        votes_values = [vote.vote_value for vote in votes]
        sum_of_votes = sum(votes_values)

        return round(sum_of_votes / votes_count, 1)
    
    def buy(self, count):
        if self.available < count:
            raise NotEnoughAvailableError(self.title)
        
        self.available -= count
        self.save()

        return True
    
    def __str__(self):
        return self.title


@receiver(models.signals.pre_delete, sender=Product)
def delete_product_image(sender, instance, **kwargs):
    try:
        image_obj = ProductImage.objects.filter(
            product=instance
        )[0]
    
    except:
        return

    if not image_obj.image:
        return False
    
    image_obj.image.delete(False)


class Seller(models.Model):
    id = models.UUIDField(
        default=uuid4,
        unique=True,
        primary_key=True
    )
    title = models.CharField(
        max_length=64,
    )
    description = models.CharField(
        max_length=256
    )
    is_certified = models.BooleanField(
        default=False
    )

    def get_rating(self):
        votes = VoteToSeller.objects.filter(
            seller=self
        )
        votes_count = len(votes)

        if votes_count == 0:
            return 'There are not any votes yet'
        
        votes_values = [vote.vote_value for vote in votes]
        sum_of_votes = sum(votes_values)

        return round(sum_of_votes / votes_count, 1)
    
    def __str__(self):
        return self.title

@receiver(models.signals.pre_delete, sender=Seller)
def delete_seller_image(sender, instance, **kwargs):
    try:
        image_obj = SellerImage.objects.filter(
            seller=instance
        )[0]
    
    except:
        return

    if not image_obj.image:
        return False
    
    image_obj.image.delete(False)


class Vote(models.Model):
    id = models.UUIDField(
        default=uuid4,
        unique=True,
        primary_key=True
    )
    vote_value = models.IntegerField()


class VoteToSeller(Vote):
    seller = models.ForeignKey(
        Seller, on_delete=models.CASCADE
    )


class VoteToProduct(Vote):
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE
    )


class Image(models.Model):
    id = models.UUIDField(
        default=uuid4,
        unique=True,
        primary_key=True
    )
    image = models.ImageField()

    def get_path(self):
        return f'/media/{path.basename(self.image.name)}'


class ProductImage(Image):
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE
    )


class SellerImage(Image):
    seller = models.ForeignKey(
        Seller, on_delete=models.CASCADE
    )
