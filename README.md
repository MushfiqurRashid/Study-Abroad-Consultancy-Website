# Study Abroad Consultancy

Unified production project for [studyabroadconsultancybd.com](https://studyabroadconsultancybd.com).

## URL structure

- `/` — public student website
- `/admin` — admin sign-in
- `/admin/dashboard` — protected admin dashboard
- `/api/*` — NestJS API
- `/api/docs` — Swagger documentation

## Project structure

```text
apps/
  web/    Next.js public website and admin dashboard
  api/    NestJS API
Caddyfile
docker-compose.yml
```

## Local development

Requirements: Node.js 22+, npm, and MySQL 8.

```bash
npm install
npm run setup
npm run dev
```

The web application runs on `http://localhost:3000`, the admin is at
`http://localhost:3000/admin`, and the API runs on `http://localhost:8000/api`.

## Production deployment

1. Point the domain's `A` records for `@` and `www` to the server's public IP.
2. Allow inbound TCP ports `80` and `443` and UDP port `443`.
3. Copy `.env.example` to `.env` and replace every placeholder with a strong secret.
4. Start the complete stack:

```bash
docker compose up -d --build
docker compose exec api npm run seed
```

Caddy obtains and renews HTTPS certificates automatically after DNS points to the server.

`DB_SYNCHRONIZE` defaults to `true` so the existing schema can be created on the first
deployment. After the first successful startup, set `DB_SYNCHRONIZE=false` in `.env`
and restart the API. Future schema changes should be delivered as TypeORM migrations.

## Required production secrets

- `MYSQL_ROOT_PASSWORD` and `DB_PASSWORD` must match when using the default root user.
- `SESSION_SECRET` must contain at least 32 random characters.
- `ADMIN_EMAIL` and `ADMIN_PASSWORD` define the account created by `npm run seed`.
- Configure the Cloudinary and Resend variables when uploads/email are enabled.

Never commit the production `.env` file.
