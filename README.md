# Brew & Bloom: Coffee Shop (Vue + Node + SQLite)

A pickup-ordering coffee shop site. Customers browse the menu and place orders; staff manage orders and the menu from a password-protected page.

## Requirements
- Node.js **22.13 or newer** (the server uses Node's built-in SQLite, so there is nothing extra to install for the backend)

## Run it locally
```bash
npm install
cp .env.example .env      # on Windows: copy .env.example .env
npm run dev
```
- Website: http://localhost:5173
- Staff page: http://localhost:5173/#/admin
- API: http://localhost:3001/api

In development, if you skip `.env`, the staff password is `admin123`. Set `ADMIN_PASSWORD` in `.env` before going live.

## Run it in production
```bash
npm install
npm run build
NODE_ENV=production npm start
```
The Node server serves the built site and the API from one port (default 3001). The database is created automatically at `data/coffee.db` and seeded with your original six menu items. Back up the `data/` folder to keep your orders.

## What the backend does
| Endpoint | Purpose |
|---|---|
| `GET /api/menu` | Available menu items |
| `POST /api/orders` | Place an order (prices are recalculated on the server) |
| `GET /api/orders/:number` | Public order status lookup (no personal details) |
| `POST /api/admin/login` | Staff sign-in, returns a session token |
| `GET /api/admin/orders` | List orders (`?status=pending` etc.) |
| `PATCH /api/admin/orders/:id` | Update order status |
| `GET/POST/PUT/DELETE /api/admin/menu` | Manage menu items |

Order statuses: `pending → preparing → ready → completed` (or `cancelled`).

## Good to know
- Payment is **not** processed online. Customers pay at the counter on pickup.
- Staff sessions last 8 hours. Login attempts and order placement are rate-limited per IP.
- Node prints an "ExperimentalWarning: SQLite" message on startup. It is harmless.
- Behind a proxy or host such as Render/Railway/Nginx, set `TRUST_PROXY=true` so rate limiting sees real visitor IPs, and use HTTPS.
