let elpriser; // Opret variabel til at gemme elpriser

export function getAddressByCity() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Måneder er nul-baserede, så tilføj 1 og pad med 0
  const day = String(currentDate.getDate()).padStart(2, "0"); // Paddag med 0

  const date = `${year}/${month}-${day}`;

  return fetch(`https://www.elprisenligenu.dk/api/v1/prices/${date}_DK2.json`)
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

export function getDateAndPopulateData() {
  const pickInput = document.querySelector("input[type='date']");
  const perHourSection = document.getElementById("per-date");

  function fetchElPriser(year, month, day) {
    const url = `https://www.elprisenligenu.dk/api/v1/prices/${year}/${month}-${day}_DK2.json`;

    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function populateData(ElPriser) {
    perHourSection.innerHTML = "";

    if (ElPriser && ElPriser.length > 0) {
      ElPriser.forEach((price, index) => {
        const divEl = document.createElement("div");
        divEl.className = "new-date";
        divEl.innerHTML = `<h4>${index + 1}:00</h4> <p> ${
          price.DKK_per_kWh
        } DKK</p>`;
        perHourSection.appendChild(divEl);
      });
    } else {
      perHourSection.textContent = "Kunne ikke hente elprisdata så langt frem";
    }
  }

  pickInput.addEventListener("change", () => {
    const chosenDate = pickInput.value;
    const [year, month, day] = chosenDate.split("-");

    fetchElPriser(year, month, day).then((ElPriser) => {
      populateData(ElPriser);
    });
  });
}

// Kald funktionen for at starte
