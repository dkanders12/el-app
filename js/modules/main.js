let elpriser; // Opret variabel til at gemme elpriser

export function getAddressByCity() {
  return fetch(
    `https://www.elprisenligenu.dk/api/v1/prices/2023/10-30_DK2.json`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      elpriser = data; // Gem elpriser i variabel
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
}

export function updateClock() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  const timeString = `${hours}:${minutes}:${seconds}`;
  document.getElementById("live-clock").textContent = timeString;

  updateElpris(); // Opdater elprisen hver gang uret opdateres
}

export function updateElpris() {
  const now = new Date();
  const currentHour = now.getHours();

  const liveFeedEl = document.getElementById("live-feed-el");
  if (elpriser && Array.isArray(elpriser)) {
    const matchingPrice = elpriser[currentHour]; // Brug currentHour til at få det matchende prisobjekt

    if (matchingPrice) {
      liveFeedEl.textContent = `${matchingPrice.DKK_per_kWh}DKK   `;
    } else {
      liveFeedEl.textContent =
        "Kunne ikke hente elprisdata for den aktuelle time.";
    }
  }
}

setInterval(updateClock);
