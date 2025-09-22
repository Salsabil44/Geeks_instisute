const apiKey = "6ebc99cc57c05fc2c6910e8b"; 
    const fromSelect = document.getElementById("from");
    const toSelect = document.getElementById("to");
    const amountInput = document.getElementById("amount");
    const resultEl = document.getElementById("result");
    fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/codes`)
      .then(res => res.json())
      .then(data => {
        const codes = data.supported_codes;
        codes.forEach(([code, name]) => {
          let option1 = document.createElement("option");
          option1.value = code;
          option1.textContent = `${code} - ${name}`;
          fromSelect.appendChild(option1);

          let option2 = document.createElement("option");
          option2.value = code;
          option2.textContent = `${code} - ${name}`;
          toSelect.appendChild(option2);
        });
        fromSelect.value = "USD";
        toSelect.value = "EUR";
      });
    function convertCurrency() {
      const from = fromSelect.value;
      const to = toSelect.value;
      const amount = amountInput.value;
      if (!amount) {
        resultEl.textContent = "⛔ Please enter an amount!";
        return;
      }
      fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}/${amount}`)
        .then(res => res.json())
        .then(data => {
          resultEl.textContent = `${amount} ${from} = ${data.conversion_result} ${to}`;
        });
    }
    document.getElementById("convert").addEventListener("click", convertCurrency);
    document.getElementById("switch").addEventListener("click", () => {
      let temp = fromSelect.value;
      fromSelect.value = toSelect.value;
      toSelect.value = temp;
      convertCurrency(); 
    });
