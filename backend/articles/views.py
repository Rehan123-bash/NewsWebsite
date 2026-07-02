from django.db import models
from django.utils import timezone
from django.utils.dateparse import parse_datetime
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from accounts.permissions import IsEditorOrAdmin

from .models import Article
from .serializers import ArticleSerializer


class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.select_related("author", "category").prefetch_related("tags").all().order_by("-created_at")
    serializer_class = ArticleSerializer

    def get_permissions(self):
        if self.action in {"list", "retrieve", "latest", "featured", "trending"}:
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated, IsEditorOrAdmin]
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = super().get_queryset()
        if not self.request.user.is_authenticated or self.request.user.role not in {"admin", "editor"}:
            queryset = queryset.filter(status=Article.Status.PUBLISHED)
        status_filter = self.request.query_params.get("status")
        category_slug = self.request.query_params.get("category")
        search = self.request.query_params.get("search")

        if status_filter:
            queryset = queryset.filter(status=status_filter)
        if category_slug:
            queryset = queryset.filter(category__slug=category_slug)
        if search:
            queryset = queryset.filter(
                models.Q(title__icontains=search)
                | models.Q(summary__icontains=search)
                | models.Q(content__icontains=search)
            )
        return queryset

    def perform_create(self, serializer):
        if not serializer.validated_data.get("author") and self.request.user.is_authenticated:
            serializer.save(author=self.request.user)
            return
        serializer.save()

    @action(detail=True, methods=["post"])
    def publish(self, request, pk=None):
        article = self.get_object()
        article.status = Article.Status.PUBLISHED
        article.published_at = timezone.now()
        article.save(update_fields=["status", "published_at", "updated_at"])
        return Response(self.get_serializer(article).data)

    @action(detail=True, methods=["post"])
    def schedule(self, request, pk=None):
        article = self.get_object()
        scheduled_at = request.data.get("scheduled_at")
        if not scheduled_at:
            return Response({"detail": "scheduled_at is required."}, status=status.HTTP_400_BAD_REQUEST)
        parsed_scheduled_at = parse_datetime(scheduled_at)
        if parsed_scheduled_at is None:
            return Response({"detail": "scheduled_at must be a valid datetime."}, status=status.HTTP_400_BAD_REQUEST)
        article.status = Article.Status.SCHEDULED
        article.scheduled_at = parsed_scheduled_at
        article.save(update_fields=["status", "scheduled_at", "updated_at"])
        return Response(self.get_serializer(article).data)

    @action(detail=True, methods=["post"])
    def archive(self, request, pk=None):
        article = self.get_object()
        article.archived_at = timezone.now()
        article.status = Article.Status.DRAFT
        article.save(update_fields=["status", "archived_at", "updated_at"])
        return Response(self.get_serializer(article).data)

    @action(detail=False, methods=["get"])
    def latest(self, request):
        articles = self.get_queryset().filter(status=Article.Status.PUBLISHED).order_by("-published_at", "-created_at")[:10]
        return Response(self.get_serializer(articles, many=True).data)

    @action(detail=False, methods=["get"])
    def featured(self, request):
        articles = self.get_queryset().filter(status=Article.Status.PUBLISHED, is_featured=True).order_by("-published_at")[:10]
        return Response(self.get_serializer(articles, many=True).data)

    @action(detail=False, methods=["get"])
    def trending(self, request):
        articles = self.get_queryset().filter(status=Article.Status.PUBLISHED).order_by("-views", "-published_at")[:10]
        return Response(self.get_serializer(articles, many=True).data)
