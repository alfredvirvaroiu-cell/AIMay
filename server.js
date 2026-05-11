const http = require("http");
const fs = require("fs/promises");
const path = require("path");

const port = Number(process.env.PORT || 4173);
const root = __dirname;
const dataDir = path.join(root, "data");
const agendaPath = path.join(dataDir, "agenda.json");
const signupsPath = path.join(dataDir, "signups.json");

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

async function readJson(filePath, fallback) {
  try {
    return JSON.parse(await fs.readFile(filePath, "utf8"));
  } catch {
    return fallback;
  }
}

async function writeJson(filePath, value) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function sendJson(response, status, value) {
  response.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(value));
}

function sendText(response, status, text) {
  response.writeHead(status, { "Content-Type": "text/plain; charset=utf-8" });
  response.end(text);
}

async function parseBody(request) {
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8");
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    const error = new Error("Invalid JSON request body.");
    error.statusCode = 400;
    throw error;
  }
}

function attendeeKey(attendee) {
  return String(attendee.email || attendee.name || "").trim().toLowerCase();
}

function cleanAttendee(attendee = {}) {
  return {
    name: String(attendee.name || "").trim().slice(0, 80),
    email: String(attendee.email || "").trim().toLowerCase().slice(0, 120)
  };
}

function timeToMinutes(value) {
  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + minutes;
}

function getEventDate(event, agenda) {
  return event.date || agenda.eventDate;
}

function eventsOverlap(first, second, agenda) {
  if (getEventDate(first, agenda) !== getEventDate(second, agenda)) return false;
  return timeToMinutes(first.start) < timeToMinutes(second.end)
    && timeToMinutes(second.start) < timeToMinutes(first.end);
}

function emptyRegistration() {
  return { confirmed: [], waitlist: [] };
}

function getRegistration(registrations, eventId) {
  if (!registrations[eventId]) registrations[eventId] = emptyRegistration();
  return registrations[eventId];
}

function getStatus(registration, key) {
  if (registration.confirmed.some((person) => attendeeKey(person) === key)) return "confirmed";
  if (registration.waitlist.some((person) => attendeeKey(person) === key)) return "waitlist";
  return "none";
}

function getConfirmedEventsForAttendee(events, registrations, key) {
  return events.filter((event) => {
    return getRegistration(registrations, event.id).confirmed.some((person) => attendeeKey(person) === key);
  });
}

function findConflict(events, registrations, targetEvent, key, agenda) {
  return getConfirmedEventsForAttendee(events, registrations, key).find((event) => {
    return event.id !== targetEvent.id && eventsOverlap(event, targetEvent, agenda);
  });
}

async function readAgenda() {
  return readJson(agendaPath, { eventDate: new Date().toISOString().slice(0, 10), rooms: [], events: [] });
}

async function readRegistrations() {
  return readJson(signupsPath, {});
}

async function handleApi(request, response, url) {
  const agenda = await readAgenda();

  if (request.method === "GET" && url.pathname === "/api/health") {
    sendJson(response, 200, {
      status: "ok",
      uptime: Math.round(process.uptime()),
      events: agenda.events.length,
      rooms: agenda.rooms.length
    });
    return true;
  }

  if (request.method === "GET" && url.pathname === "/api/agenda") {
    sendJson(response, 200, agenda);
    return true;
  }

  if (request.method === "GET" && url.pathname === "/api/state") {
    sendJson(response, 200, { registrations: await readRegistrations() });
    return true;
  }

  if (request.method === "POST" && url.pathname === "/api/signup") {
    const body = await parseBody(request);
    const attendee = cleanAttendee(body.attendee);
    const key = attendeeKey(attendee);
    const event = agenda.events.find((item) => item.id === body.eventId);

    if (!event) {
      sendJson(response, 404, { error: "Session not found." });
      return true;
    }

    if (!attendee.name || !attendee.email || !key) {
      sendJson(response, 400, { error: "Name and email are required." });
      return true;
    }

    const registrations = await readRegistrations();
    const registration = getRegistration(registrations, event.id);
    const currentStatus = getStatus(registration, key);

    if (currentStatus === "none") {
      const conflict = findConflict(agenda.events, registrations, event, key, agenda);
      if (conflict) {
        sendJson(response, 409, { error: `Time conflict with ${conflict.title}.`, registrations });
        return true;
      }

      if (registration.confirmed.length < event.capacity) {
        registration.confirmed.push(attendee);
      } else {
        registration.waitlist.push(attendee);
      }
      await writeJson(signupsPath, registrations);
    }

    sendJson(response, 200, { registrations });
    return true;
  }

  if (request.method === "POST" && url.pathname === "/api/leave") {
    const body = await parseBody(request);
    const attendee = cleanAttendee(body.attendee);
    const key = attendeeKey(attendee);
    const registrations = await readRegistrations();
    const registration = getRegistration(registrations, body.eventId);
    const confirmedBefore = registration.confirmed.length;

    registration.confirmed = registration.confirmed.filter((person) => attendeeKey(person) !== key);
    registration.waitlist = registration.waitlist.filter((person) => attendeeKey(person) !== key);

    if (registration.confirmed.length < confirmedBefore && registration.waitlist.length > 0) {
      registration.confirmed.push(registration.waitlist.shift());
    }

    await writeJson(signupsPath, registrations);
    sendJson(response, 200, { registrations });
    return true;
  }

  if (request.method === "POST" && url.pathname === "/api/reset") {
    await writeJson(signupsPath, {});
    sendJson(response, 200, { registrations: {} });
    return true;
  }

  return false;
}

async function serveStatic(request, response, url) {
  const pathname = url.pathname === "/" ? "/index.html" : decodeURIComponent(url.pathname);
  const filePath = path.normalize(path.join(root, pathname));

  if (!filePath.startsWith(root)) {
    sendText(response, 403, "Forbidden");
    return;
  }

  try {
    const content = await fs.readFile(filePath);
    const extension = path.extname(filePath);
    response.writeHead(200, { "Content-Type": contentTypes[extension] || "application/octet-stream" });
    response.end(content);
  } catch {
    sendText(response, 404, "Not found");
  }
}

const server = http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url, `http://${request.headers.host}`);
    if (url.pathname.startsWith("/api/") && await handleApi(request, response, url)) return;
    await serveStatic(request, response, url);
  } catch (error) {
    sendJson(response, error.statusCode || 500, { error: error.message || "Server error." });
  }
});

server.listen(port, () => {
  console.log(`Room scheduler running at http://localhost:${port}`);
});
