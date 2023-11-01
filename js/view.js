import { getAddressByCity, getDateAndPopulateData } from "./modules/main.js";

getAddressByCity().then((ElPriser) => {
  if (ElPriser && ElPriser.length > 0) {
    const prices = ElPriser.map((price) => price.DKK_per_kWh);
    const containers = document.querySelectorAll(".El-this-time");

    containers.forEach((container, index) => {
      const pTag = document.createElement("p");
      pTag.textContent = `${prices[index]} DKK`;
      container.appendChild(pTag);
    });
    beregnMinMax(prices);
  } else {
    const liveFeedEl = document.getElementById("live-feed-el");
    liveFeedEl.textContent = "Kunne ikke hente elprisdata.";
  }
});
function beregnMinMax(beloebListe) {
  const minRing = document.getElementById("min-ring");
  const maxRing = document.getElementById("max-ring");

  if (beloebListe.length > 0) {
    const minimum = Math.min(...beloebListe);
    const maksimum = Math.max(...beloebListe);

    minRing.textContent = ` ${minimum} DKK`;
    maxRing.textContent = ` ${maksimum} DKK`;
  } else {
    minRing.textContent = "Ingen beløb tilgængelige.";
    maxRing.textContent = "Ingen beløb tilgængelige.";
  }
}
document.addEventListener("DOMContentLoaded", function () {
  getDateAndPopulateData();
});
