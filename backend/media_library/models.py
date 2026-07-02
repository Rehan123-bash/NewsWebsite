from django.conf import settings
from django.db import models


class MediaAsset(models.Model):
    file = models.FileField(upload_to="media-assets/")
    original_name = models.CharField(max_length=255, blank=True)
    caption = models.CharField(max_length=255, blank=True)
    alt_text = models.CharField(max_length=255, blank=True)
    uploaded_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.original_name and self.file:
            self.original_name = self.file.name.rsplit("/", 1)[-1]
        super().save(*args, **kwargs)

    @property
    def url(self):
        if self.file:
            return self.file.url
        return ""

    def __str__(self) -> str:
        return self.original_name or self.file.name
