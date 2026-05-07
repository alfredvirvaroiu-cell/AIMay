# Event Room Scheduler

A web-based scheduler for internal events across three rooms.

## Run

```bash
npm start
```

Then open `http://localhost:4173`.

The app can also be opened directly with `index.html`; in that mode sign-ups are saved only in the current browser.

## Deploy on Render

1. Create a GitHub repo for this folder.
2. Push these files to GitHub.
3. In Render, choose **New > Blueprint** and select the repo.
4. Render will use `render.yaml` to create a free Node web service.
5. After deploy, open the Render URL.

Render free services do not provide persistent disks. This app will run on Render Free, but sign-ups stored in `data/signups.json` can be lost when the service restarts or redeploys. For a real event, use a paid persistent disk or move registrations to a database.

## What it does

- Shows agendas for Room A, Room B, and Room C.
- Lets an attendee join sessions or join a waitlist when capacity is full.
- Prevents double-booking across overlapping sessions.
- Promotes the first waitlisted attendee when a confirmed attendee leaves.
- Stores shared sign-ups in `data/signups.json` when run with the Node server.
- Exports the current attendee's confirmed agenda as an `.ics` calendar file.

## Change the agenda

Edit `data/agenda.json`. The browser-only fallback agenda lives at the top of `app.js`.
