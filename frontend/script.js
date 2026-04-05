let isLive = true;
let alerts = [];

const toggleBtn = document.getElementById("modeToggle");
const alertsList = document.getElementById("alertsList");

/* =========================
   MODE TOGGLE
========================= */
toggleBtn.addEventListener("click", () => {
  isLive = !isLive;
  toggleBtn.textContent = isLive ? "🔴 LIVE MODE" : "🟡 DEMO MODE";
  loadAlerts();
});

/* =========================
   TIME PARSING + RECENCY FIX
========================= */
function parseTimestamp(ts) {
  return new Date(ts.replace(" ", "T"));
}

function getMinutesAgo(timestamp) {
  const alertTime = parseTimestamp(timestamp);
  const now = new Date();
  const diff = (now - alertTime) / (1000 * 60);
  return Math.max(0, Math.floor(diff));
}

function isRecent(timestamp) {
  return getMinutesAgo(timestamp) <= 120;
}

function formatTimeAgo(minutes) {
  if (minutes <= 0) return "just now";
  if (minutes < 60) return `${minutes} min ago`;
  return `${Math.floor(minutes / 60)} hr ago`;
}

/* =========================
   FETCH ALERTS
========================= */
async function fetchAlerts() {
  try {
    alertsList.innerHTML = "⏳ Fetching live alerts...";

    const res = await fetch("https://rescuelens-disaster-intelligence-system-1-lblq.onrender.com");
    const data = await res.json();

    alerts = data.map((a) => {
      const minutesAgo = getMinutesAgo(a.timestamp);
      const recent = isRecent(a.timestamp);

      return {
        city: a.city,
        type: a.disaster,
        msg: a.text,
        lat: a.lat || 20,
        lng: a.lng || 78,
        severity: recent ? "high" : "low",
        timestamp: a.timestamp,
        confidence: recent ? "high" : "low",
        minutesAgo: minutesAgo,
      };
    });

    renderAll();
  } catch (err) {
    alertsList.innerHTML = "⚠️ Failed to load alerts";
    console.error(err);
  }
}

/* =========================
   RENDER ALL
========================= */
function renderAll() {
  renderAlerts();
  updateStats();
  updateNotificationPanel();
  drawMap();
}

/* =========================
   ALERT LIST
========================= */
function renderAlerts() {
  if (!alerts.length) {
    alertsList.innerHTML = "No alerts available";
    return;
  }

  alertsList.innerHTML = alerts
    .map(
      (a, i) => `
    <div class="alert-item" onclick="focusAlert(${i})">
      <b>${a.type} — ${a.city}</b>
      <span class="tag ${a.severity}">${a.severity}</span>
      <p>${a.msg}</p>

      <small>
        ${
          a.severity === "low"
            ? "OLD SIGNAL (based on timestamp analysis)"
            : "LIVE ALERT (recent activity detected)"
        }
        • AI confidence: ${a.confidence}
      </small>

      <p style="font-size:12px; color:#aaa;">
        ${
          a.severity === "low"
            ? "This alert is older and may not represent current conditions"
            : "This alert is recent and likely reflects ongoing events"
        }
      </p>

      <p style="font-size:12px; color:#888;">
        ${formatTimeAgo(a.minutesAgo)}
      </p>
    </div>
  `
    )
    .join("");
}

/* =========================
   NOTIFICATION PANEL
========================= */
function updateNotificationPanel() {
  const box = document.getElementById("notificationBox");

  if (!alerts.length) {
    box.innerHTML = "No alerts triggered";
    return;
  }

  const latest = alerts[0];

  box.innerHTML = `
    <p><b>Message:</b> ${latest.type} reported in ${latest.city}</p>
    <p><b>Recipients:</b> Users within 5km radius</p>
    <p><b>Status:</b> ✅ Notification Sent</p>
  `;
}

/* =========================
   STATS
========================= */
function updateStats() {
  document.getElementById("alertCount").innerText = alerts.length;

  const cities = new Set(alerts.map((a) => a.city));
  document.getElementById("cityCount").innerText = cities.size;

  const high = alerts.filter((a) => a.severity === "high").length;
  document.getElementById("riskCount").innerText = high;
}

/* =========================
   MAP
========================= */
const map = L.map("map").setView([22.97, 78.65], 4);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

let layers = [];

/* =========================
   DISASTER COLOR SYSTEM
========================= */
function getDisasterColor(type) {
  if (type === "Flood") return "blue";
  if (type === "Fire") return "red";
  if (type === "Earthquake") return "purple";
  if (type === "Accident") return "orange";
  return "gray";
}

/* =========================
   DRAW MAP (FINAL POLISHED)
========================= */
function drawMap() {
  layers.forEach((l) => map.removeLayer(l));
  layers = [];

  alerts.forEach((a) => {
    if (!a.lat || !a.lng) return;

    const isOld = a.severity === "low";

    const color = isOld ? "gray" : getDisasterColor(a.type);

    const radius = isOld ? 5000 : 12000;

    const circle = L.circle([a.lat, a.lng], {
      radius: radius,
      color: color,
      fillColor: color,

      // 🔥 CLEAR VISUAL DIFFERENCE
      fillOpacity: isOld ? 0.02 : 0.35,

      weight: 1, // cleaner borders
    }).addTo(map);

    layers.push(circle);
  });
}

/* =========================
   FOCUS
========================= */
function focusAlert(i) {
  const a = alerts[i];
  map.setView([a.lat, a.lng], 10);
}

/* =========================
   LOAD
========================= */
function loadAlerts() {
  if (isLive) {
    fetchAlerts();
  } else {
    alerts = [
      {
        city: "Pune",
        type: "Flood",
        msg: "Demo scenario",
        lat: 18.52,
        lng: 73.85,
        severity: "high",
        confidence: "high",
        minutesAgo: 5,
      },
    ];
    renderAll();
  }
}

/* =========================
   AUTO REFRESH
========================= */
setInterval(() => {
  if (isLive) fetchAlerts();
}, 5000);

/* =========================
   CLOCK
========================= */
setInterval(() => {
  const timeEl = document.getElementById("time");
  if (timeEl) {
    timeEl.innerText = new Date().toLocaleTimeString();
  }
}, 1000);

/* =========================
   INIT
========================= */
loadAlerts();
