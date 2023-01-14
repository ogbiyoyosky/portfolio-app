let countries;
const url = "https://www.floatrates.com/daily/eur.json";

const getCountryList = () => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      countries = data;
      const dropDownList = document.querySelectorAll("form select");
      for (let i = 0; i < dropDownList.length; i++) {
        for (let currency_code in countries) {
          let selected =
            i == 0
              ? currency_code == "usd"
                ? "selected"
                : ""
              : currency_code == "ngn"
              ? "selected"
              : "";
          let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
          dropDownList[i].insertAdjacentHTML("beforeend", optionTag);
        }
      }
    });
};
getCountryList();

(fromCurrency = document.querySelector(".from select")),
  (toCurrency = document.querySelector(".to select")),
  (getInput = document.querySelector("form input"));
getButton = document.querySelector("form button");

getRate = document.querySelector("form select");

getInput.addEventListener("keyup", (e) => {
  e.preventDefault();
  errorMessage();
});
getRate.addEventListener("click", (e) => {
  e.preventDefault();
  getCurrentRate();
});
getButton.addEventListener("click", (e) => {
  e.preventDefault();
  getExchangeRate();
  //   CurrentDate();
  TimeStamp();
  getCurrentRate();
});
function errorMessage() {
  var error = document.getElementById("error");
  if (document.getElementById("amt").value > 999999999) {
    error.textContent = "Maximum amount exceeded ";
    error.style.color = "red";
    document.getElementById("btn").disabled = true;
  } else {
    document.getElementById("btn").removeAttribute("disabled");
    error.textContent = "";
  }
}

function TimeStamp() {
  TimeStampTxt = document.querySelector(".exchange-date");
  let url = `https://www.floatrates.com/daily/${fromCurrency.value}.json`;

  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      let exchangeDate = result[toCurrency.value].date;
      TimeStampTxt.innerText = `Transaction Timestamp: ${exchangeDate}`;
    });
}
function getCurrentRate() {
  currentExchangeRateTxt = document.querySelector(".current-rate");
  let amountVal = 1;

  let url = `https://www.floatrates.com/daily/${fromCurrency.value}.json`;

  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      let fixedExchangeRate = result[toCurrency.value].rate;

      let currentExchangeRate = (amountVal * fixedExchangeRate).toFixed(2);

      currentExchangeRateTxt.innerText = `Current Exchange Rate: ${amountVal} ${fromCurrency.value}= ${currentExchangeRate} ${toCurrency.value}`;
    });
}
function getExchangeRate() {
  const amount = document.querySelector(".amount input");
  totalExchangeRateTxt = document.querySelector(".rate");
  let amountVal = amount.value;
  if (amountVal == "" || amountVal == "0") {
    amount.value = "1";
    amountVal = 1;
  }
  totalExchangeRateTxt.innerText = "Getting exchange rate...";

  let url = `https://www.floatrates.com/daily/${fromCurrency.value}.json`;

  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      let exchangeRate = result[toCurrency.value].rate;

      let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);

      totalExchangeRateTxt.innerText = `Transaction Amount: ${amountVal} ${fromCurrency.value}= ${totalExchangeRate} ${toCurrency.value}`;
    });
}
