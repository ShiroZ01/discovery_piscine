
"use strict";

(function () {
  const form = document.querySelector("#calc-form");
  const leftEl = document.querySelector("#left");
  const rightEl = document.querySelector("#right");
  const opEl = document.querySelector("#op");

  const isNonNegativeInteger = (s) => /^(\d+)$/.test(s);

  function showAlert(msg) {
    alert(msg);
  }

  function calculate(aStr, op, bStr) {
    if (!isNonNegativeInteger(aStr) || !isNonNegativeInteger(bStr)) {
      showAlert("Error :(");
      console.log("Error :(");
      return;
    }

    const a = parseInt(aStr, 10);
    const b = parseInt(bStr, 10);

    if ((op === "/" || op === "%") && b === 0) {
      const msg = "It's over 9000!";
      showAlert(msg);
      console.log(msg);
      return;
    }

    let result;
    switch (op) {
      case "+": result = a + b; break;
      case "-": result = a - b; break;
      case "*": result = a * b; break;
      case "/": result = a / b; break;
      case "%": result = a % b; break;
      default:
        showAlert("Error :(");
        console.log("Error :(");
        return;
    }

    showAlert(String(result));
    console.log(result);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    calculate(leftEl.value.trim(), opEl.value, rightEl.value.trim());
  });
})();
