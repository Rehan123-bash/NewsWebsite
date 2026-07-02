from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand, CommandError


class Command(BaseCommand):
    help = "Create or update a development admin user from environment variables."

    def handle(self, *args, **options):
        user_model = get_user_model()
        email = getattr(settings, "DEFAULT_ADMIN_EMAIL", None)
        password = getattr(settings, "DEFAULT_ADMIN_PASSWORD", None)
        name = getattr(settings, "DEFAULT_ADMIN_NAME", "Admin")

        if not email or not password:
            raise CommandError("DEFAULT_ADMIN_EMAIL and DEFAULT_ADMIN_PASSWORD must be set.")

        user, created = user_model.objects.get_or_create(
            email=email,
            defaults={
                "name": name,
                "role": user_model.Role.ADMIN,
                "is_staff": True,
                "is_superuser": True,
            },
        )

        if not created:
            user.name = name
            user.role = user_model.Role.ADMIN
            user.is_staff = True
            user.is_superuser = True

        user.set_password(password)
        user.save()

        message = "Created" if created else "Updated"
        self.stdout.write(self.style.SUCCESS(f"{message} dev admin: {email}"))
