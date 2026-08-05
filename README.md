# Take-Home Exercise: Item Catalog (Database + CI/CD + Deployment)

Thanks for taking the time to do this — it should take roughly **4–6 hours**.
Using AI coding tools (Copilot, Cursor, Claude, ChatGPT, etc.) is completely fine
and expected. We're interested in the result *and* your judgment along the way,
not in whether you typed every character yourself.

This is a harder variant of our base take-home: on top of the original feature
task, it also tests database migration, secrets handling, CI/CD, and deployment
judgment.

## What this is

A small full-stack app: an Express API + a React (Vite) frontend that lists
items from a catalog, with search, category filtering, and pagination. The
catalog currently lives in an in-memory array (`backend/data/items.js`) —
part of your task is replacing that with a real database.

## Running it (as shipped)

**Backend**
```bash
cd backend
npm install
npm run dev
# API on http://localhost:4000
```

**Frontend**
```bash
cd frontend
npm install
npm run dev
# App on http://localhost:5173 (proxies /api to the backend)
```

## Your task

1. **Migrate the data layer to PostgreSQL.**
   - Design a schema for the item model (`id`, `name`, `category`, `price`, `inStock`).
   - Provide a real migration/seed mechanism — not an ad-hoc `CREATE TABLE`
     typed into a console session.
   - Swap `backend/data/items.js`'s internals to query Postgres instead of the
     in-memory array. Keep the same exported function shapes where it makes
     sense so the rest of the app doesn't need to change unnecessarily.

2. **Add a way to toggle an item's stock status from the UI.**
   - New backend endpoint: `PATCH /api/items/:id/stock` that flips (or sets)
     an item's `inStock` value and returns the updated item, now persisted in
     Postgres.
   - Frontend: a button/toggle in the item list that calls this endpoint and
     reflects the new state without a full page reload.

3. **Wire up a second secret and use it for something real.**
   - Introduce an `EXTERNAL_API_KEY` env var, standing in for credentials to a
     third-party pricing/currency-conversion service.
   - Add a small server-side feature that uses the key to call a stub/mock
     endpoint (a hardcoded response is fine — you don't need a real third-party
     integration) and surfaces one derived field, e.g. a converted price.
   - The key itself must never be logged or sent to the client.

4. **Build a CI/CD pipeline with GitHub Actions.**
   - On every pull request: install dependencies, lint, run tests, build both
     frontend and backend, and `docker build` the backend image. The PR check
     should fail if any step fails.
   - On merge to `main`: automatically deploy to the infra you chose below.
     This deploy step should only run on merge to `main`, not on every push.
   - `DATABASE_URL` and `EXTERNAL_API_KEY` must come from GitHub Actions
     secrets at pipeline runtime — never commit them, and keep `.env`
     git-ignored.

5. **Deploy to a lightweight/free-tier host of your choice.**
   - Both the app and the Postgres instance need to be deployed somewhere —
     AWS, Azure, Fly.io, Render, Railway, or anything similar. Pick whatever
     you're comfortable with and can explain.
   - Share a working URL, or if you plan to tear the infra down afterward,
     include clear proof of deployment (screenshots, logs) in your write-up.
   - We don't expect you to keep paid infrastructure running indefinitely —
     free-tier is genuinely fine, just be upfront about it.

6. **Write a short `NOTES.md`** covering:
   - Schema/migration decisions and tradeoffs.
   - How you handled secrets across local dev, CI, and the deployed environment.
   - How your CI/CD pipeline is structured and why.
   - Which infra you deployed to and why, including whether it auto-sleeps on
     the free tier or needs manual teardown.
   - Anything you noticed in the existing code you'd flag in a real code
     review, even if you didn't have time to fix it.
   - If/how you used AI tools, and what you double-checked or changed from
     what they suggested.

7. **Make sure `docker build` works** for the backend (`backend/Dockerfile`
   is provided as-is — you don't need to touch it for this step, just confirm
   the app runs in the container, including against your real database).

## What we're evaluating

Not "did you get every detail perfect." We're looking at:
- Sensible schema design and a real migration artifact.
- Secrets that never end up in git history or logs.
- A CI/CD pipeline that actually gates on failure, with deploy triggered only
  on merge to `main`.
- Infra judgment — something genuinely lightweight, and you can explain its
  limits (cold starts, sleep behavior, free-tier expiry) rather than
  over-engineering.
- Cost/teardown awareness, called out in `NOTES.md`.
- Whether your explanation holds up in the live follow-up session.

## Submitting

Push to a private repo and share access, or send back as a zip. Either way,
we'll do a short live follow-up session afterward where we'll ask you to
walk through what you built.
