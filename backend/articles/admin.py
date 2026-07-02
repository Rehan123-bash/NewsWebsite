from django.contrib import admin

from .models import Article


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ("title", "status", "author", "category", "published_at", "views")
    list_filter = ("status", "is_breaking", "is_featured", "category", "author")
    search_fields = ("title", "summary", "content", "meta_title", "keywords")
    prepopulated_fields = {"slug": ("title",)}
    filter_horizontal = ("tags",)
