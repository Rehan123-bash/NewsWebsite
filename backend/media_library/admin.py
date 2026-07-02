from django.contrib import admin

from .models import MediaAsset


@admin.register(MediaAsset)
class MediaAssetAdmin(admin.ModelAdmin):
    list_display = ("original_name", "uploaded_by", "created_at")
    search_fields = ("original_name", "caption", "alt_text")
