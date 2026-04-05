// ================= CONFIG =================
const API_URL = "https://rescuelens-disaster-intelligence-system-1-lblq.onrender.com";

// ================= MAIN FUNCTION =================
async function fetchAlerts() {
  const alertsContainer = document.getElementById("alerts-container");

  try {
    // Show loading state
    alertsContainer.innerHTML = "⏳ Fetching live alerts...";

    const response = await fetch(`${API_URL}/alerts`);

    // Check HTTP error
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    console.log("API DATA:", data);

    // Ensure array
    const alerts = Array.isArray(data) ? data : [];

    // Render alerts
    renderAlerts(alerts);

  } catch (error) {
    console.error("Fetch Error:", error);

    alertsContainer.innerHTML = `
      ❌ Failed to load alerts <br/>
      <small>${error.message}</small>
    `;
  }
}

// ================= RENDER FUNCTION =================
function renderAlerts(alerts) {
  const container = document.getElementById("alerts-container");

  // Empty case
  if (alerts.length === 0) {
    container.innerHTML = "⚠️ No alerts found";
    return;
  }

  // Build UI
  container.innerHTML = alerts.map(alert => `
    <div class="alert-card">
      <h3>🚨 ${alert.type.toUpperCase()}</h3>
      <p><strong>Location:</strong> ${alert.location}</p>
      <p><strong>Severity:</strong> ${alert.severity}</p>
    </div>
  `).join("");
}

// ================= AUTO LOAD =================
fetchAlerts();

// Optional: refresh every 10 sec (for real-time demo)
setInterval(fetchAlerts, 10000);
