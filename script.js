const billAmount = document.querySelector("[data-bill]");
const multiRadio = document.querySelector("[data-radio-elements]");
const radioTip = multiRadio.querySelectorAll("[data-radio]");
const inputRadio = document.querySelector("[data-input-radio]");
const radioInput = document.querySelector("[data-Input-tip]");
const numPeople = document.querySelector("[data-number-of-people]");

const output = document.querySelector("[data-amount-output]");
const individualTipOutput = document.querySelector("[data-individual-tip]");
const button = document.getElementById("reset");
const errorElement = document.getElementById("error");

function getValues() {
  const billAmount = document.querySelector("[data-bill]");
  const multiRadio = document.querySelector("[data-radio-elements]");
  const radioTip = multiRadio.querySelectorAll("[data-radio]");
  const numPeople = document.querySelector("[data-number-of-people]");
}

function checkSelectedRadio() {
  let tip;
  radioTip.forEach((radio) => {
    if (inputRadio.checked) {
      tip = radioInput.value;
      tip = tip / 100;
      parseFloat(tip);
    } else if (radio.checked) {
      tip = radio.value;
      parseFloat(tip);
    }
  });
  console.log(tip);
  return tip;
}

function checkError() {
  let messages = [];
  if (billAmount.value === "" || billAmount.value == null) {
    errorElement.innerHTML = "Bill amount is required";
  }
}

function containsOnlyNumbers(str) {
  return /^[0-9]+$/.test(str);
}

function calculate() {
  getValues();

  if (billAmount.value.length != 0 && numPeople.value.length != 0) {
    let tippentage = checkSelectedRadio();
    let tipAmount = billAmount.value * tippentage;
    let individualTip = tipAmount / numPeople.value;
    let totalAmount = parseFloat(tipAmount) + parseFloat(billAmount.value);
    console.log(billAmount.value);
    console.log(tipAmount);
    console.log(totalAmount);
    let individualTotal = totalAmount / numPeople.value;

    output.innerHTML = "$".concat(Math.round(individualTotal * 100) / 100);
    individualTipOutput.innerHTML = "$".concat(
      Math.round(individualTip * 100) / 100
    );
  }
}

billAmount.addEventListener("focusout", () => {
  if (containsOnlyNumbers(billAmount.value)) {
    calculate();
  } else {
    checkError();
    console.log(billAmount);
    return;
  }
});

numPeople.addEventListener("focusout", () => {
  if (containsOnlyNumbers(numPeople.value)) {
    calculate();
  } else {
    checkError();
    return;
  }
});

function isIterable(obj) {
  // checks for null and undefined
  if (obj == null) {
    return false;
  }
  return typeof obj[Symbol.iterator] === "function";
}

multiRadio.addEventListener("change", (radio) => {
  calculate();
});

checkSelectedRadio();

button.addEventListener("click", () => {
  output.innerHTML = "$0.00";
  individualTipOutput.innerHTML = "$0.00";
  billAmount.value = "0";
  numPeople.value = "0";
});

radioInput.addEventListener("focusout", () => {
  if (radioInput.value.length == 0) {
    return;
  } else {
    inputRadio.checked = true;
    console.log("we are here");
    calculate();
  }
});
