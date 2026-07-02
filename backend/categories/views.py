from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from accounts.permissions import IsEditorOrAdmin

from .models import Category
from .serializers import CategorySerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by("name")
    serializer_class = CategorySerializer

    def get_permissions(self):
        if self.action in {"list", "retrieve"}:
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAuthenticated, IsEditorOrAdmin]
        return [permission() for permission in permission_classes]
