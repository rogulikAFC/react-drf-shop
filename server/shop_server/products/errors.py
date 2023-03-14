from rest_framework import status


class NotEnoughAvailableError(Exception):
    def __init__(self, product_title, *args):
        super().__init__(args)
        self.product_title = product_title
        self.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR

    def __str__(self):
        return f'Product "{self.product_title}" is not enough available.'
