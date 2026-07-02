from rest_framework import viewsets
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from rest_framework.permissions import IsAuthenticated

from accounts.permissions import IsEditorOrAdmin

from .models import MediaAsset
from .serializers import MediaAssetSerializer


class MediaAssetViewSet(viewsets.ModelViewSet):
    queryset = MediaAsset.objects.select_related("uploaded_by").all().order_by("-created_at")
    serializer_class = MediaAssetSerializer
    parser_classes = (MultiPartParser, FormParser, JSONParser)
    permission_classes = [IsAuthenticated, IsEditorOrAdmin]

    def perform_create(self, serializer):
        serializer.save(uploaded_by=self.request.user)
