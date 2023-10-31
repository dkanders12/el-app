import { getAddressByCity, updateClock } from "./modules/main.js";

getAddressByCity().then((ElPriser) => {
  const liveFeedEl = document.getElementById("live-feed-el");
  console.log(ElPriser);
  if (ElPriser && ElPriser.length > 0) {
    const price = ElPriser[9].DKK_per_kWh;
    liveFeedEl.textContent = `${price} DKK`;
  } else {
    liveFeedEl.textContent = "Kunne ikke hente elprisdata.";
  }
});

updateClock();
