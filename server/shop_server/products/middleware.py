from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework import status


class ProcessErrorsMiddleware:
    def __init__(self, get_response):
        self._get_response = get_response

    def __call__(self, request):
        return self._get_response(request)
            
    def process_exception(self, request, exception):
        try:
            status_code = exception.status_code

        except:
            status_code = status.HTTP_500_INTERNAL_SERVER_ERROR

        finally:
            response = Response(
                {
                    'detail': str(exception)
                },
                status=status_code
            )

            response.accepted_renderer = JSONRenderer()
            response.accepted_media_type = "application/json"
            response.renderer_context = {}
            response.render()

            return response