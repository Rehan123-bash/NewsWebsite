from rest_framework import serializers

from accounts.serializers import UserSerializer
from categories.serializers import CategorySerializer
from tags.models import Tag
from tags.serializers import TagSerializer

from .models import Article


class ArticleSerializer(serializers.ModelSerializer):
    author_detail = UserSerializer(source="author", read_only=True)
    category_detail = CategorySerializer(source="category", read_only=True)
    tags_detail = TagSerializer(source="tags", many=True, read_only=True)
    tag_ids = serializers.PrimaryKeyRelatedField(
        source="tags",
        many=True,
        queryset=Tag.objects.all(),
        write_only=True,
        required=False,
    )

    class Meta:
        model = Article
        fields = (
            "id",
            "title",
            "slug",
            "summary",
            "content",
            "status",
            "featured_image",
            "category",
            "author",
            "tags",
            "published_at",
            "scheduled_at",
            "archived_at",
            "views",
            "is_breaking",
            "is_featured",
            "reading_time",
            "meta_title",
            "meta_description",
            "keywords",
            "canonical_url",
            "og_image",
            "author_detail",
            "category_detail",
            "tags_detail",
            "tag_ids",
            "created_at",
            "updated_at",
        )
        read_only_fields = ("slug", "published_at", "archived_at", "views", "created_at", "updated_at")

    def create(self, validated_data):
        tags = validated_data.pop("tags", [])
        article = super().create(validated_data)
        if tags:
            article.tags.set(tags)
        return article

    def update(self, instance, validated_data):
        tags = validated_data.pop("tags", None)
        article = super().update(instance, validated_data)
        if tags is not None:
            article.tags.set(tags)
        return article
