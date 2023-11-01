import { getAddressByCity, updateClock } from "./modules/main.js";

getAddressByCity().then((ElPriser) => {
  const liveFeedEl = document.getElementById("live-feed-el");

  if (ElPriser && ElPriser.length > 0) {
    const prices = ElPriser.map((price) => price.DKK_per_kWh);
    const sliderItems = document.querySelectorAll(".El-this-time");

    prices.forEach((price, index) => {
      sliderItems[index].textContent = `${price} DKK`;
    });
  } else {
    liveFeedEl.textContent = "Kunne ikke hente elprisdata.";
  }
});
