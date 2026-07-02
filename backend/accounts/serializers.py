from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "name",
            "email",
            "role",
            "profile_picture",
            "bio",
            "created_at",
            "updated_at",
        )
        read_only_fields = (
            "role",
            "created_at",
            "updated_at",
        )


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        min_length=8,
    )

    class Meta:
        model = User
        fields = (
            "name",
            "email",
            "password",
        )

    def validate_email(self, value):
        value = value.strip().lower()

        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                "An account with this email already exists."
            )

        return value

    def create(self, validated_data):
        password = validated_data.pop("password")

        validated_data["email"] = (
            validated_data["email"]
            .strip()
            .lower()
        )

        return User.objects.create_user(
            password=password,
            role=User.Role.JOURNALIST,
            **validated_data,
        )


class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        attrs[self.username_field] = (
            attrs[self.username_field]
            .strip()
            .lower()
        )

        return super().validate(attrs)