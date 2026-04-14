const amountInput = document.getElementById("amount");
const currencySelect = document.getElementById("currency");
const convertBtn = document.getElementById("convertBtn");
const resultDiv = document.getElementById("result");
const errorDiv = document.getElementById("error");
const base = {
  USD: 0.013,
  EUR: 0.011,
  GBP: 0.0097,
  CNY: 0.09,
  KZT: 6.25,
};
const name = {
  USD: "Доллар США",
  EUR: "Евро",
  GBP: "Фунт стерлингов",
  CNY: "Китайский юань",
  KZT: "Казахстанский тенге",
};
const symbols = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  CNY: "¥",
  KZT: "₸",
};
function showError(message) {
  errorDiv.textContent = message;
  errorDiv.classList.add("show");
  resultDiv.classList.remove("show");
  setTimeout(() => {
    errorDiv.classList.remove("show");
  }, 3000);
}
function hideError() {
  errorDiv.classList.remove("show");
}
function validateInput(amount) {
  if (amount === "") {
    showError("Введите сумму");
    return false;
  }
  const numAmount = parseFloat(amount);
  if (isNaN(numAmount)) {
    showError("Введите корректное число");
    return false;
  }
  if (numAmount < 0) {
    showError("Сумма не может быть отрицательной");
    return false;
  }
  if (numAmount === 0) {
    showError("Сумма равна нулю");
    return false;
  }
  hideError();
  return true;
}
function convert() {
  const amount = amountInput.value;
  if (!validateInput(amount)) {
    return;
  }
  const rubAmount = parseFloat(amount);
  const cur = currencySelect.value;
  const rate = base[cur];
  const convertedAmount = rubAmount * rate;
  const curSymb = symbols[cur];
  const formattedRub = rubAmount.toFixed(2);
  const formattedConverted = convertedAmount.toFixed(2);
  resultDiv.innerHTML = `
        <div style="font-size: 14px; color: #666;">${formattedRub} RUB =</div>
        <div style="font-size: 32px; color: #667eea; font-weight: bold; margin: 10px 0;">
            ${curSymb}${formattedConverted} ${cur}
        </div>`;
  resultDiv.classList.add("show");
}
convertBtn.addEventListener("click", convert);
amountInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    convert();
  }
});
currencySelect.addEventListener("change", () => {
  if (amountInput.value !== "") {
    convert();
  }
});
