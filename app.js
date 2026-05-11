const defaultRooms = [
  { id: "gf1", name: "GF01", floor: "Ground Floor", capacityLabel: "20 seats" },
  { id: "gf2", name: "GF02", floor: "Ground Floor", capacityLabel: "20 seats" },
  { id: "gf1-2", name: "GF01&02", floor: "Ground Floor", capacityLabel: "25 seats" },
  { id: "gf3", name: "GF08", floor: "Ground Floor", capacityLabel: "8 seats" },
  { id: "gf9", name: "GF09", floor: "Ground Floor", capacityLabel: "8 seats" },
  { id: "cafeteria", name: "Cafeteria", floor: "Ground Floor", capacityLabel: "60 seats" }
];

const defaultEvents = [
  {
    id: "cafeteria-2026-05-14-1630",
    roomId: "cafeteria",
    title: "Coffee & Kick Off",
    track: "Networking",
    date: "2026-05-14",
    start: "16:30",
    end: "17:00",
    capacity: 60,
    summary: "Kick off the event over coffee in the Cafeteria."
  },
  {
    id: "cafeteria-2026-05-14-1200",
    roomId: "cafeteria",
    title: "Lunch Break",
    track: "Networking",
    date: "2026-05-14",
    start: "19:00",
    end: "20:00",
    capacity: 60,
    summary: "Lunch break in the Cafeteria."
  },
  {
    id: "gf1-2026-05-14-1700",
    roomId: "gf1",
    title: "New Tool - Who this?",
    track: "Deep Dive",
    host: "Cip Amarie",
    date: "2026-05-14",
    start: "17:00",
    end: "18:00",
    capacity: 20,
    summary: "Deep dive session led by Cip Amarie.",
    description: "A Codex walkthrough"
  },
  {
    id: "gf1-2026-05-14-1800",
    roomId: "gf1",
    title: "Working with Projects in Chat GPT",
    track: "Deep Dive",
    host: "Catalin Buzescu",
    date: "2026-05-14",
    start: "18:00",
    end: "18:45",
    capacity: 20,
    summary: "Deep Dive session led by Catalin Buzescu."
  },
  {
    id: "gf3-2026-05-14-1700",
    roomId: "gf3",
    title: "Setting up daily/weekly tasks for your GPT",
    track: "TechBar",
    host: "Alex Cirlan",
    date: "2026-05-14",
    start: "17:00",
    end: "17:45",
    capacity: 8,
    summary: "TechBar session led by Alex Cirlan.",
    description: "TechBars are a hands-on experience where you can get help and insight on building your AI skills"
  },
  {
    id: "gf3-2026-05-14-1800",
    roomId: "gf3",
    title: "Using Codex for non-tech",
    track: "TechBar",
    host: "Cip Amarie",
    date: "2026-05-14",
    start: "18:00",
    end: "18:45",
    capacity: 8,
    summary: "TechBar session led by Cip Amarie.",
    description: "TechBars are a hands-on experience where you can get help and insight on building your AI skills"
  },
  {
    id: "gf9-2026-05-14-1700",
    roomId: "gf9",
    title: "Building AI Adoption Reports",
    track: "TechBar",
    host: "Ryan MacKay",
    date: "2026-05-14",
    start: "17:00",
    end: "17:45",
    capacity: 8,
    summary: "TechBar session led by Ryan MacKay.",
    description: "TechBars are a hands-on experience where you can get help and insight on building your AI skills"
  },
  {
    id: "gf9-2026-05-14-1800",
    roomId: "gf9",
    title: "Connect your GPT to Slack",
    track: "TechBar",
    host: "Anne Diaconu",
    date: "2026-05-14",
    start: "18:00",
    end: "18:45",
    capacity: 8,
    summary: "TechBar session led by Anne Diaconu.",
    description: "TechBars are a hands-on experience where you can get help and insight on building your AI skills"
  },
  {
    id: "gf2-2026-05-14-1800",
    roomId: "gf2",
    title: "Using Chat GPT",
    track: "Quickfire",
    date: "2026-05-14",
    start: "17:00",
    end: "17:45",
    capacity: 20,
    summary: "Three short presentations in GF2.",
    presentations: [
      {
        host: "Flori Munteanu & Iulia Mocanescu",
        title: "Shared Framework for Product & AI Adoption"
      },
      {
        host: "Mihaela Anghelina",
        title: "Creating Skills in Chat GPT"
      },
      {
        host: "Andrei Valsan",
        title: "Board room GPT and Automatic adoption decks"
      }
    ]
  },
  {
    id: "gf2-using-chat-gpt-2026-05-14-1800",
    roomId: "gf2",
    title: "Customer Facing",
    track: "Quickfire",
    date: "2026-05-14",
    start: "18:00",
    end: "18:45",
    capacity: 20,
    summary: "Three short presentations in GF2.",
    presentations: [
      {
        host: "Alex Dobrin",
        title: "AI Adoption Catalyst"
      },
      {
        host: "Dan Constantinescu",
        title: "AI Success Navigator"
      },
      {
        host: "Stefan Berechet",
        title: "Redwood slide builder"
      }
    ]
  },
  {
    id: "gf1-2-2026-05-14-2130",
    roomId: "gf1-2",
    title: "Leadership Panel",
    track: "Panel",
    date: "2026-05-14",
    start: "21:30",
    end: "22:00",
    capacity: 50,
    summary: "Leadership panel discussion in GF1&2."
  },
  {
    id: "gf1-2-2026-05-14-2000",
    roomId: "gf1-2",
    title: "How to train your GPT",
    track: "Workshop",
    host: "Cip Amarie",
    date: "2026-05-14",
    start: "20:00",
    end: "21:15",
    capacity: 25,
    summary: "Instructor led workshop by Cip Amarie.",
    description: "Instructor led session on how to create an agent and train it into a formidable Autonomous Cloud Executive. Bring your laptop."
  }
];

const storageKey = "room-scheduler-state-v2";

let rooms = [...defaultRooms];
let events = [...defaultEvents];

const state = {
  attendee: { name: "", email: "" },
  registrations: {},
  filters: { search: "", track: "All", room: "All" },
  eventDate: new Date().toISOString().slice(0, 10),
  apiAvailable: false
};

const elements = {
  attendeeForm: document.querySelector("#attendeeForm"),
  nameInput: document.querySelector("#nameInput"),
  emailInput: document.querySelector("#emailInput"),
  attendeeStatus: document.querySelector("#attendeeStatus"),
  syncStatus: document.querySelector("#syncStatus"),
  searchInput: document.querySelector("#searchInput"),
  trackSelect: document.querySelector("#trackSelect"),
  roomFilter: document.querySelector("#roomFilter"),
  clearFiltersButton: document.querySelector("#clearFiltersButton"),
  summaryStrip: document.querySelector("#summaryStrip"),
  roomGrid: document.querySelector("#roomGrid"),
  myAgendaList: document.querySelector("#myAgendaList"),
  myAgendaCount: document.querySelector("#myAgendaCount"),
  exportButton: document.querySelector("#exportButton"),
  resetButton: document.querySelector("#resetButton"),
  roomTemplate: document.querySelector("#roomTemplate"),
  eventTemplate: document.querySelector("#eventTemplate")
};

function loadLocalState() {
  const saved = localStorage.getItem(storageKey);
  if (!saved) return;

  try {
    const parsed = JSON.parse(saved);
    state.attendee = { ...state.attendee, ...parsed.attendee };
    state.registrations = parsed.registrations || {};
    state.filters = { ...state.filters, ...parsed.filters };
  } catch {
    localStorage.removeItem(storageKey);
  }
}

function saveLocalState() {
  localStorage.setItem(storageKey, JSON.stringify({
    attendee: state.attendee,
    filters: state.filters,
    registrations: state.apiAvailable ? undefined : state.registrations
  }));
}

async function loadRemoteState() {
  try {
    const [agendaResponse, stateResponse] = await Promise.all([
      fetch("/api/agenda"),
      fetch("/api/state")
    ]);

    if (!agendaResponse.ok || !stateResponse.ok) {
      throw new Error("Remote scheduler is unavailable.");
    }

    const agenda = await agendaResponse.json();
    const remoteState = await stateResponse.json();

    rooms = agenda.rooms;
    events = agenda.events;
    state.eventDate = agenda.eventDate || state.eventDate;
    state.registrations = remoteState.registrations || {};
    state.apiAvailable = true;
  } catch {
    rooms = [...defaultRooms];
    events = [...defaultEvents];
    state.apiAvailable = false;
  }
}

async function postJson(url, payload) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || "Request failed.");
  }
  return data;
}

function emptyRegistration() {
  return { confirmed: [], waitlist: [] };
}

function getRegistration(eventId) {
  if (!state.registrations[eventId]) {
    state.registrations[eventId] = emptyRegistration();
  }
  return state.registrations[eventId];
}

function attendeeKey(attendee = state.attendee) {
  return attendee.email.trim().toLowerCase() || attendee.name.trim().toLowerCase();
}

function hasAttendee() {
  return Boolean(state.attendee.name.trim() && state.attendee.email.trim());
}

function attendeeInitials(attendee) {
  const source = attendee.name || attendee.email || "?";
  const parts = source.trim().split(/\s+/).filter(Boolean);
  const initials = parts.length > 1
    ? `${parts[0][0]}${parts[1][0]}`
    : source.slice(0, 2);
  return initials.toUpperCase();
}

function getEventDate(event) {
  return event.date || state.eventDate;
}

function formatEventDate(event) {
  const date = new Date(`${getEventDate(event)}T00:00:00`);
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function formatTimeRange(event) {
  return `${formatEventDate(event)}, ${event.start} to ${event.end}`;
}

function getPresentationText(event) {
  return (event.presentations || [])
    .map((presentation) => `${presentation.title} ${presentation.host}`)
    .join(" ");
}

function getEventDescription(event) {
  const description = event.description || event.summary;
  const presentationLines = (event.presentations || [])
    .map((presentation, index) => `${index + 1}. ${presentation.title} - ${presentation.host}`);
  return [description, ...presentationLines].filter(Boolean).join("\n");
}

function timeToMinutes(value) {
  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + minutes;
}

function getEventSortValue(event) {
  return `${getEventDate(event)}T${event.start}`;
}

function compareEventsBySchedule(first, second) {
  return getEventSortValue(first).localeCompare(getEventSortValue(second));
}

function eventsOverlap(first, second) {
  if (getEventDate(first) !== getEventDate(second)) return false;
  return timeToMinutes(first.start) < timeToMinutes(second.end)
    && timeToMinutes(second.start) < timeToMinutes(first.end);
}

function getRoom(roomId) {
  return rooms.find((room) => room.id === roomId);
}

function getCurrentAttendeeStatus(eventId) {
  const key = attendeeKey();
  if (!key) return "none";

  const registration = getRegistration(eventId);
  if (registration.confirmed.some((person) => attendeeKey(person) === key)) return "confirmed";
  if (registration.waitlist.some((person) => attendeeKey(person) === key)) return "waitlist";
  return "none";
}

function getMyConfirmedEvents() {
  const key = attendeeKey();
  if (!key) return [];

  return events
    .filter((event) => getRegistration(event.id).confirmed.some((person) => attendeeKey(person) === key))
    .sort(compareEventsBySchedule);
}

function getConflictFor(event) {
  return getMyConfirmedEvents().find((registeredEvent) => {
    return registeredEvent.id !== event.id && eventsOverlap(registeredEvent, event);
  });
}

async function addAttendee(event) {
  if (!hasAttendee()) {
    alert("Add attendee name and email first.");
    return;
  }

  const status = getCurrentAttendeeStatus(event.id);
  if (status === "confirmed" || status === "waitlist") {
    await removeAttendee(event.id);
    return;
  }

  const conflict = getConflictFor(event);
  if (conflict) {
    alert(`Time conflict with ${conflict.title} in ${getRoom(conflict.roomId).name}.`);
    return;
  }

  const attendee = {
    name: state.attendee.name.trim(),
    email: state.attendee.email.trim()
  };

  if (state.apiAvailable) {
    try {
      const data = await postJson("/api/signup", { eventId: event.id, attendee });
      state.registrations = data.registrations || {};
    } catch (error) {
      alert(error.message);
      await refreshRemoteRegistrations();
    }
  } else {
    addAttendeeLocally(event, attendee);
  }

  saveLocalState();
  render();
}

function addAttendeeLocally(event, attendee) {
  const registration = getRegistration(event.id);

  if (registration.confirmed.length < event.capacity) {
    registration.confirmed.push(attendee);
  } else {
    registration.waitlist.push(attendee);
  }
}

async function removeAttendee(eventId) {
  if (state.apiAvailable) {
    try {
      const data = await postJson("/api/leave", {
        eventId,
        attendee: {
          name: state.attendee.name.trim(),
          email: state.attendee.email.trim()
        }
      });
      state.registrations = data.registrations || {};
    } catch (error) {
      alert(error.message);
      await refreshRemoteRegistrations();
    }
  } else {
    removeAttendeeLocally(eventId);
  }

  saveLocalState();
  render();
}

function removeAttendeeLocally(eventId) {
  const key = attendeeKey();
  const registration = getRegistration(eventId);
  const confirmedBefore = registration.confirmed.length;

  registration.confirmed = registration.confirmed.filter((person) => attendeeKey(person) !== key);
  registration.waitlist = registration.waitlist.filter((person) => attendeeKey(person) !== key);

  if (registration.confirmed.length < confirmedBefore && registration.waitlist.length > 0) {
    registration.confirmed.push(registration.waitlist.shift());
  }
}

async function refreshRemoteRegistrations() {
  if (!state.apiAvailable) return;

  try {
    const response = await fetch("/api/state");
    if (!response.ok) throw new Error("Could not refresh registrations.");
    const data = await response.json();
    state.registrations = data.registrations || {};
  } catch {
    state.apiAvailable = false;
  }
}

function clearFilters() {
  state.filters = { search: "", track: "All", room: "All" };
  saveLocalState();
  render();
}

async function resetSignups() {
  const confirmed = window.confirm("Reset all sign-ups and waitlists?");
  if (!confirmed) return;

  if (state.apiAvailable) {
    try {
      const data = await postJson("/api/reset", {});
      state.registrations = data.registrations || {};
    } catch (error) {
      alert(error.message);
    }
  } else {
    state.registrations = {};
  }

  saveLocalState();
  render();
}

function getFilteredEvents() {
  const search = state.filters.search.trim().toLowerCase();
  return events.filter((event) => {
    const room = getRoom(event.roomId);
    const matchesRoom = state.filters.room === "All" || event.roomId === state.filters.room;
    const matchesTrack = state.filters.track === "All" || event.track === state.filters.track;
    const searchable = [event.title, event.track, event.host || "", event.summary, getPresentationText(event), getEventDate(event), room?.name || ""]
      .join(" ")
      .toLowerCase();
    return matchesRoom && matchesTrack && (!search || searchable.includes(search));
  });
}

function renderControls() {
  elements.nameInput.value = state.attendee.name;
  elements.emailInput.value = state.attendee.email;
  elements.searchInput.value = state.filters.search;

  elements.attendeeStatus.textContent = hasAttendee() ? "Ready" : "Guest";
  elements.syncStatus.textContent = state.apiAvailable ? "Shared" : "Local";
  elements.syncStatus.classList.toggle("is-shared", state.apiAvailable);

  const tracks = ["All", ...Array.from(new Set(events.map((event) => event.track))).sort()];
  elements.trackSelect.innerHTML = tracks
    .map((track) => `<option value="${track}">${track}</option>`)
    .join("");
  elements.trackSelect.value = tracks.includes(state.filters.track) ? state.filters.track : "All";

  const roomOptions = [{ id: "All", name: "All" }, ...rooms];
  elements.roomFilter.innerHTML = "";
  roomOptions.forEach((room) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = room.name;
    button.className = state.filters.room === room.id ? "is-active" : "";
    button.addEventListener("click", () => {
      state.filters.room = room.id;
      saveLocalState();
      render();
    });
    elements.roomFilter.appendChild(button);
  });
}

function renderSummary() {
  const filtered = getFilteredEvents();
  const totalSeats = filtered.reduce((sum, event) => sum + event.capacity, 0);
  const confirmedSeats = filtered.reduce((sum, event) => sum + getRegistration(event.id).confirmed.length, 0);
  const waitlisted = filtered.reduce((sum, event) => sum + getRegistration(event.id).waitlist.length, 0);
  const utilization = totalSeats ? Math.round((confirmedSeats / totalSeats) * 100) : 0;

  const cards = [
    ["Sessions", filtered.length],
    ["Confirmed", confirmedSeats],
    ["Waitlisted", waitlisted],
    ["Utilization", `${utilization}%`]
  ];

  elements.summaryStrip.innerHTML = cards.map(([label, value]) => {
    return `<div class="summary-card"><p>${label}</p><strong>${value}</strong></div>`;
  }).join("");
}

function renderRooms() {
  const filteredEvents = getFilteredEvents();
  elements.roomGrid.innerHTML = "";

  if (state.filters.room === "All") {
    renderChronologicalAgenda(filteredEvents);
    return;
  }

  const visibleRooms = rooms.filter((room) => {
    return state.filters.room === "All" || state.filters.room === room.id;
  });

  visibleRooms.forEach((room) => {
    const roomNode = elements.roomTemplate.content.firstElementChild.cloneNode(true);
    const roomEvents = filteredEvents
      .filter((event) => event.roomId === room.id)
      .sort(compareEventsBySchedule);

    const confirmedCount = roomEvents.reduce((sum, event) => sum + getRegistration(event.id).confirmed.length, 0);
    const capacity = roomEvents.reduce((sum, event) => sum + event.capacity, 0);

    roomNode.querySelector(".room-kicker").textContent = room.floor;
    roomNode.querySelector("h2").textContent = room.name;
    const roomCapacity = roomNode.querySelector(".room-capacity");
    roomCapacity.textContent = "";
    roomCapacity.hidden = true;

    const eventsContainer = roomNode.querySelector(".events");
    if (roomEvents.length === 0) {
      const empty = document.createElement("p");
      empty.className = "empty-state";
      empty.textContent = "No matching sessions";
      eventsContainer.appendChild(empty);
    } else {
      roomEvents.forEach((event) => eventsContainer.appendChild(renderEvent(event)));
    }

    elements.roomGrid.appendChild(roomNode);
  });
}

function renderChronologicalAgenda(filteredEvents) {
  const agendaNode = elements.roomTemplate.content.firstElementChild.cloneNode(true);
  const sortedEvents = filteredEvents.sort(compareEventsBySchedule);
  const confirmedCount = sortedEvents.reduce((sum, event) => sum + getRegistration(event.id).confirmed.length, 0);

  agendaNode.classList.add("agenda-column");
  agendaNode.querySelector(".room-kicker").textContent = `${sortedEvents.length} sessions`;
  agendaNode.querySelector("h2").textContent = "All Rooms";

  const roomCapacity = agendaNode.querySelector(".room-capacity");
  roomCapacity.textContent = "";
  roomCapacity.hidden = true;

  const eventsContainer = agendaNode.querySelector(".events");
  if (sortedEvents.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "No matching sessions";
    eventsContainer.appendChild(empty);
  } else {
    sortedEvents.forEach((event) => eventsContainer.appendChild(renderEvent(event)));
  }

  elements.roomGrid.appendChild(agendaNode);
}

function renderEvent(event) {
  const node = elements.eventTemplate.content.firstElementChild.cloneNode(true);
  const registration = getRegistration(event.id);
  const status = getCurrentAttendeeStatus(event.id);
  const confirmedCount = registration.confirmed.length;
  const remaining = event.capacity - confirmedCount;
  const percentFull = Math.min(100, Math.round((confirmedCount / event.capacity) * 100));
  const conflict = hasAttendee() ? getConflictFor(event) : null;
  const room = getRoom(event.roomId);

  node.querySelector(".event-time").innerHTML = `${formatEventDate(event)}<br>${event.start}<br>${event.end}`;
  node.querySelector("h3").textContent = event.title;
  node.querySelector(".track-badge").textContent = event.track;
  node.querySelector(".event-meta").textContent = event.host
    ? `${event.host} | ${room?.name || "Room"}`
    : room?.name || "Room";
  const summary = node.querySelector(".event-summary");
  summary.textContent = event.description || "";
  summary.hidden = !event.description;
  renderPresentations(node, event);
  node.querySelector(".meter span").style.width = `${percentFull}%`;
  node.querySelector(".capacity-copy").textContent = remaining > 0
    ? `${remaining} open`
    : `${registration.waitlist.length} waiting`;

  const chips = node.querySelector(".attendee-chips");
  if (registration.confirmed.length === 0) {
    const empty = document.createElement("span");
    empty.className = "empty-chip";
    empty.textContent = "No sign-ups";
    chips.appendChild(empty);
  } else {
    registration.confirmed.slice(0, 5).forEach((attendee) => {
      const chip = document.createElement("span");
      chip.className = "chip";
      chip.textContent = attendeeInitials(attendee);
      chip.title = attendee.name;
      chips.appendChild(chip);
    });
    if (registration.confirmed.length > 5) {
      const more = document.createElement("span");
      more.className = "empty-chip";
      more.textContent = `+${registration.confirmed.length - 5}`;
      chips.appendChild(more);
    }
  }

  const action = node.querySelector(".primary-action");
  action.addEventListener("click", () => addAttendee(event));

  if (status === "confirmed") {
    action.textContent = "Leave";
    action.classList.add("warning");
  } else if (status === "waitlist") {
    action.textContent = "Leave waitlist";
    action.classList.add("secondary");
  } else if (remaining <= 0) {
    action.textContent = "Waitlist";
    action.classList.add("secondary");
  } else {
    action.textContent = "Join";
  }

  const note = node.querySelector(".event-note");
  if (status === "waitlist") {
    note.textContent = `Waitlist position ${getWaitlistPosition(event.id)}`;
  } else if (conflict && status !== "confirmed") {
    note.textContent = `Conflict: ${formatTimeRange(conflict)} ${conflict.title}`;
  } else {
    note.textContent = "";
  }

  return node;
}

function renderPresentations(node, event) {
  if (!event.presentations || event.presentations.length === 0) return;

  const list = document.createElement("ul");
  list.className = "presentation-list";
  event.presentations.forEach((presentation) => {
    const item = document.createElement("li");
    const title = document.createElement("strong");
    const host = document.createElement("span");
    title.textContent = presentation.title;
    host.textContent = presentation.host;
    item.append(title, host);
    list.appendChild(item);
  });

  node.querySelector(".event-summary").after(list);
}

function getWaitlistPosition(eventId) {
  const key = attendeeKey();
  return getRegistration(eventId).waitlist.findIndex((person) => attendeeKey(person) === key) + 1;
}

function renderMyAgenda() {
  const confirmedEvents = getMyConfirmedEvents();
  const waitlistedEvents = events
    .filter((event) => getCurrentAttendeeStatus(event.id) === "waitlist")
    .sort(compareEventsBySchedule);

  elements.myAgendaCount.textContent = confirmedEvents.length;
  elements.myAgendaList.innerHTML = "";

  if (!hasAttendee()) {
    elements.myAgendaList.innerHTML = `<p class="empty-state">No attendee selected</p>`;
    return;
  }

  if (confirmedEvents.length === 0 && waitlistedEvents.length === 0) {
    elements.myAgendaList.innerHTML = `<p class="empty-state">No sessions selected</p>`;
    return;
  }

  [...confirmedEvents, ...waitlistedEvents].forEach((event) => {
    const item = document.createElement("div");
    const status = getCurrentAttendeeStatus(event.id);
    item.className = "agenda-item";
    item.innerHTML = `
      <div>
        <strong>${event.title}</strong>
        <span>${formatTimeRange(event)} | ${getRoom(event.roomId).name}</span>
      </div>
      <span>${status === "waitlist" ? "Waitlist" : "Booked"}</span>
    `;
    elements.myAgendaList.appendChild(item);
  });
}

function exportAgenda() {
  const selectedEvents = getMyConfirmedEvents();
  if (!hasAttendee() || selectedEvents.length === 0) {
    alert("No confirmed agenda to export.");
    return;
  }

  const body = selectedEvents.map((event) => {
    const dateStamp = getEventDate(event).replaceAll("-", "");
    const start = `${dateStamp}T${event.start.replace(":", "")}00`;
    const end = `${dateStamp}T${event.end.replace(":", "")}00`;
    return [
      "BEGIN:VEVENT",
      `UID:${event.id}@room-scheduler.local`,
      `DTSTAMP:${dateStamp}T080000`,
      `DTSTART:${start}`,
      `DTEND:${end}`,
      `SUMMARY:${escapeIcs(event.title)}`,
      `LOCATION:${escapeIcs(getRoom(event.roomId).name)}`,
      `DESCRIPTION:${escapeIcs(event.host ? `${event.host} | ${getEventDescription(event)}` : getEventDescription(event))}`,
      "END:VEVENT"
    ].join("\r\n");
  }).join("\r\n");

  const ics = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Internal//Room Scheduler//EN", body, "END:VCALENDAR"].join("\r\n");
  const blob = new Blob([ics], { type: "text/calendar" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "my-agenda.ics";
  link.click();
  URL.revokeObjectURL(link.href);
}

function escapeIcs(value) {
  return value.replace(/[\\,;]/g, "\\$&").replace(/\n/g, "\\n");
}

function render() {
  renderControls();
  renderSummary();
  renderRooms();
  renderMyAgenda();
}

function bindEvents() {
  elements.attendeeForm.addEventListener("input", () => {
    state.attendee.name = elements.nameInput.value;
    state.attendee.email = elements.emailInput.value;
    saveLocalState();
    render();
  });

  elements.searchInput.addEventListener("input", () => {
    state.filters.search = elements.searchInput.value;
    saveLocalState();
    render();
  });

  elements.trackSelect.addEventListener("change", () => {
    state.filters.track = elements.trackSelect.value;
    saveLocalState();
    render();
  });

  elements.clearFiltersButton.addEventListener("click", clearFilters);
  elements.resetButton.addEventListener("click", resetSignups);
  elements.exportButton.addEventListener("click", exportAgenda);
}

async function init() {
  loadLocalState();
  await loadRemoteState();
  bindEvents();
  render();
}

init();
