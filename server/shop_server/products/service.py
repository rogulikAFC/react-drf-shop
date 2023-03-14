from django_filters import rest_framework as filters


class ProductFilter(filters.FilterSet):
    available = filters.RangeFilter()
    price = filters.RangeFilter()
