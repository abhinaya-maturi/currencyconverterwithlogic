const BASE_URL = "https://api.currencyapi.com/v3/latest?apikey=cur_live_rtsc2FYGNNSj0rG6eSQMBOZpHj1Ed3vXgi9u9SY1";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  const URL = `${BASE_URL}&base_currency=${fromCurr.value}&currencies=${toCurr.value}`;
  try {
    let response = await fetch(URL);
    let data = await response.json();
    console.log("Data fetched:", data); // Log the fetched data to understand its structure
    let rate = data.data[toCurr.value].value;
    if (rate) {
      let finalAmount = amtVal * rate;
      msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    } else {
      msg.innerText = "Conversion rate not available.";
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    msg.innerText = "Failed to fetch conversion rate.";
  }
});
