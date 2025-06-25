const socket = io();
const capteurs = ["Capteur-Temp", "Capteur-Humid", "Capteur-Press"];

window.onload = () => {
  const dash = document.getElementById("dashboard");
  capteurs.forEach(c => {
    const card = document.createElement("div");
    card.className = "col-md-4 mb-4";
    card.innerHTML = `
      <div class="card shadow">
        <div class="card-body text-center">
          <h5>${c}</h5>
          <h2 id="${c}">--</h2>
        </div>
      </div>`;
    dash.appendChild(card);
  });
};

socket.on("update_data", data => {
  Object.keys(data).forEach(capteur => {
    document.getElementById(capteur).innerText = data[capteur];
  });
});