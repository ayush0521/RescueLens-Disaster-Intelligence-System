const API_BASE = "https://rescuelens-disaster-intelligence-system-1-lblq.onrender.com";

async function fetchAlerts() {
  try {
    const res = await fetch(`${API_BASE}/alerts`);
    const alerts = await res.json();

    console.log("DATA:", alerts);

    const container = document.getElementById("alerts-container");

    // CLEAR OLD
    container.innerHTML = "";

    alerts.forEach(alert => {
      const div = document.createElement("div");

      div.innerHTML = `
        <h3>🚨 ${alert.type}</h3>
        <p>Location: ${alert.location}</p>
        <p>Severity: ${alert.severity}</p>
        <hr/>
      `;

      container.appendChild(div);
    });

  } catch (err) {
    console.error(err);
  }
}

fetchAlerts();
