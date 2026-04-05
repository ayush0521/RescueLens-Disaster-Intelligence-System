const API_URL = "https://rescue-lens-disaster-intelligence-system-1-lblq.onrender.com";

async function fetchAlerts() {
  try {
    const res = await fetch(`${API_URL}/alerts`);
    const data = await res.json();

    console.log("DATA:", data);  // 👈 IMPORTANT DEBUG

    displayAlerts(data);

  } catch (error) {
    console.error("ERROR:", error);
  }
}

function displayAlerts(data) {
  const alertsContainer = document.getElementById("alerts");

  alertsContainer.innerHTML = "";

  data.forEach(alert => {
    const div = document.createElement("div");
    div.innerHTML = `
      <p><b>${alert.type}</b> - ${alert.location} (${alert.severity})</p>
    `;
    alertsContainer.appendChild(div);
  });
}
