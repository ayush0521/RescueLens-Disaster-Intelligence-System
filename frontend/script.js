// 🔥 CHANGE THIS ONLY IF YOUR BACKEND URL CHANGES
const API_BASE = "https://rescuelens-disaster-intelligence-system-1-lblq.onrender.com";

// Fetch alerts
async function fetchAlerts() {
  try {
    console.log("Fetching alerts...");

    const response = await fetch(`${API_BASE}/alerts`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const alerts = await response.json();

    console.log("Alerts received:", alerts);

    renderAlerts(alerts);
    updateStats(alerts);

  } catch (error) {
    console.error("Error fetching alerts:", error);

    document.getElementById("alerts-container").innerHTML =
      "❌ Failed to load alerts";
  }
}


// Render alerts
function renderAlerts(alerts) {
  const container = document.getElementById("alerts-container");

  if (!container) {
    console.error("alerts-container not found!");
    return;
  }

  if (!Array.isArray(alerts)) {
    console.error("Invalid data format:", alerts);
    container.innerHTML = "❌ Invalid data from server";
    return;
  }

  if (alerts.length === 0) {
    container.innerHTML = "⚠️ No alerts available";
    return;
  }

  container.innerHTML = alerts.map(alert => `
    <div class="alert-card">
      <h3>🚨 ${alert.type.toUpperCase()}</h3>
      <p><strong>Location:</strong> ${alert.location}</p>
      <p><strong>Severity:</strong> ${alert.severity}</p>
    </div>
  `).join("");
}


// Update stats
function updateStats(alerts) {
  document.getElementById("alert-count").innerText = alerts.length;

  const cities = new Set(alerts.map(a => a.location));
  document.getElementById("city-count").innerText = cities.size;

  const highRisk = alerts.filter(a => a.severity === "high").length;
  document.getElementById("high-risk").innerText = highRisk;
}


// Auto run
fetchAlerts();

// Optional: auto-refresh every 10 sec
setInterval(fetchAlerts, 10000);
