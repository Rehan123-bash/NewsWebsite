# Backend

Project folder:
`C:\Users\Rehan\OneDrive - BENNETT UNIVERSITY\Documents\News web\backend`

## Database configuration

Set `DATABASE_URL` in `.env` to choose your database.

- PostgreSQL:
	- `DATABASE_URL=postgres://news_user:your_password@localhost:5432/news_web`
- SQLite (optional explicit setting):
	- `DATABASE_URL=sqlite:///C:/path/to/news-web.sqlite3`

If `DATABASE_URL` is not set, the project falls back to a temporary SQLite database path.

Test admin login:
- Email: `admin@example.com`
- Password: `Admin12345!`

Create the admin user after setting up the database:

```bash
python manage.py create_dev_admin
```

## Switch from SQLite to PostgreSQL

1. Create a PostgreSQL database and user.
2. Add/update `DATABASE_URL` in `.env` with the PostgreSQL value.
3. Run migrations on PostgreSQL:

```bash
python manage.py migrate
```

4. Recreate/update the admin user in PostgreSQL:

```bash
python manage.py create_dev_admin
```
