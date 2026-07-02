from django.db import models
from django.utils.text import slugify


class Tag(models.Model):
    name = models.CharField(max_length=120)
    slug = models.SlugField(unique=True, blank=True)

    def _generate_unique_slug(self):
        base_slug = slugify(self.name)
        slug = base_slug
        index = 1
        while Tag.objects.filter(slug=slug).exclude(pk=self.pk).exists():
            slug = f"{base_slug}-{index}"
            index += 1
        return slug

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = self._generate_unique_slug()
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return self.name
