from rest_framework import serializers

from .models import MediaAsset


class MediaAssetSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField()

    class Meta:
        model = MediaAsset
        fields = ("id", "file", "url", "original_name", "caption", "alt_text", "uploaded_by", "created_at")
        read_only_fields = ("original_name", "uploaded_by", "created_at", "url")

    def get_url(self, obj):
        return obj.url
