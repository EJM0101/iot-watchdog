const socket = io();
const capteurs = ["Capteur-Temp", "Capteur-Humid", "Capteur-Press"];
const lastUpdate = {}; // { capteur: timestamp }

window.onload = () => {
  const dash = document.getElementById("dashboard");
  capteurs.forEach(c => {
    const card = document.createElement("div");
    card.className = "col-md-4 mb-4";
    card.innerHTML = `
      <div class="card shadow" id="${c}-card">
        <div class="card-body text-center">
          <h5>${c}</h5>
          <h2 id="${c}">--</h2>
          <p id="${c}-delay" class="text-muted small">⏱ Jamais mis à jour</p>
        </div>
      </div>`;
    dash.appendChild(card);
  });
};

socket.on("update_data", data => {
  const now = Date.now();
  Object.keys(data).forEach(capteur => {
    const prev = lastUpdate[capteur] || now;
    const delta = Math.round((now - prev) / 1000); // en secondes

    // Affichage de la valeur
    document.getElementById(capteur).innerText = data[capteur];

    // Affichage du délai
    document.getElementById(`${capteur}-delay`).innerText =
      `⏱ ${delta}s depuis dernière mise à jour`;

    // Effet visuel temporaire (surbrillance)
    const box = document.getElementById(`${capteur}-card`);
    box.classList.add("bg-success-subtle");
    setTimeout(() => box.classList.remove("bg-success-subtle"), 300);

    lastUpdate[capteur] = now;
  });
});