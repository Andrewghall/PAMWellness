# Admin Panel (PAM Wellness)

This project includes an admin dashboard at `/_/admin` (route: `/admin`) for viewing site analytics and server-side **access/login events**.

## Access & Security Model

- The admin UI is protected by the existing admin access code (no changes were made to the codes).
- Admin state is held client-side in `sessionStorage` via `AdminContext`.
- The server-side **reset** endpoint for access events requires an admin header.

### Key Files

- `app/admin/page.tsx`
  - Admin dashboard UI.
  - Fetches access events from the server and displays them.
- `app/components/AdminContext.tsx`
  - Provides `useAdmin()` and stores `isAdmin` in `sessionStorage`.
- `app/components/AuthGate.tsx`
  - The platform access gate.
  - Logs an access event to the server on successful login.
- `app/api/access-events/route.ts`
  - `POST /api/access-events`: records an access event (server-side, persisted in KV).
  - `GET /api/access-events`: returns recent events.
- `app/api/access-events/reset/route.ts`
  - `POST /api/access-events/reset`: clears stored events (admin-only).
- `app/commercial-estimates/page.tsx`
  - Commercial estimates access code gate.
  - Logs an access event on successful access.

## What the Admin Panel Shows

The admin dashboard has multiple tabs. Some of the analytics are stored in the browser (`localStorage`) and some are stored server-side in Vercel KV.

### 1) Overview

Shows high-level totals:

- Local analytics:
  - Total page views
  - Total clicks
  - Avg scroll depth
- Server-side access tracking:
  - Total access events
  - Unique access visitors

Also includes reset buttons:

- **Clear Access Events**: clears the server-side KV access log.
- **Clear Local Analytics**: clears local browser analytics (`localStorage`).

### 2) Access Events

This tab is the core of the “who logged in” requirement.

Each row is a successful access-code entry event:

- **Time**: when the event was logged
- **Type**:
  - `platform_access` (AuthGate)
  - `commercial_estimates_access` (commercial estimates page)
- **Location**: best-effort geo metadata derived from Vercel headers
- **Visitor**: an anonymous cookie-backed `visitorId` (used for unique counting)
- **Path**: page path when the event was logged

## How “Unique Login” Works

- Each browser gets an anonymous cookie: `carecore_visitor_id`.
- “Unique access” counts the number of distinct `visitorId` values across the stored events.

Important implications:

- A user who clears cookies, switches browsers, or uses a different device may be counted as a new “unique”.
- Multiple people sharing one browser profile will appear as the same unique.

## Region / Geo Data

The server attempts to capture location using Vercel-provided request headers:

- `x-vercel-ip-country`
- `x-vercel-ip-country-region`
- `x-vercel-ip-city`

If those headers are not present (e.g., local dev or some proxy setups), the admin panel will show location as **Unknown**.

## Data Storage

- Access events are stored server-side in **Vercel KV** (`@vercel/kv`).
- Local “page views / clicks / scroll depth” are stored client-side in `localStorage`.

## Setup Requirements (Vercel KV)

To enable access-event persistence in production:

1. In Vercel, add/attach a **KV** database to the project.
2. Ensure the KV environment variables are available to the deployed environment.

## Porting This Admin Panel to Another Site

If your other site is also a Next.js (App Router) project, you can port the functionality by copying the same small set of files and wiring them into your existing auth flow.

### Required Dependencies

- `@vercel/kv`

### Files to Copy

Copy these files into the other repo under the same paths:

- `app/api/access-events/route.ts`
- `app/api/access-events/reset/route.ts`
- `app/admin/page.tsx`

Then integrate event logging at the points you consider “successful login/access”:

- Add a `fetch("/api/access-events", { method: "POST", ... })` call after successful access.

Example payloads:

- Platform login:
  - `{ "type": "platform_access", "path": "/" }`
- Commercial-estimates access:
  - `{ "type": "commercial_estimates_access", "path": "/commercial-estimates" }`

### Admin Gating

This project uses `AdminContext` + `AuthGate` for admin gating.

If your other site already has an admin gating mechanism, you can:

- Keep your existing gating.
- Still use the server routes and the `Access Events` tab.
- Ensure you only render `/admin` for admin users.

If you want the same approach as this repo, also copy:

- `app/components/AdminContext.tsx`
- `app/components/AuthGate.tsx` (or adapt your version)

### Environment Variables

- Ensure Vercel KV is configured for the other project.
- Deploy to Vercel so geo headers populate (region/country).

## Troubleshooting

- If `Access Events` always shows `Unknown` location:
  - Expected in local dev.
  - In production, confirm the deployment is on Vercel and requests aren’t stripping geo headers.

- If events don’t appear:
  - Confirm `POST /api/access-events` is being called on successful access.
  - Confirm KV is configured and available in the environment.

