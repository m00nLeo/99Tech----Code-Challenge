import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { AiOutlineSwap } from "react-icons/ai";

const CurrencySwapForm = () => {
  const [formData, setFormData] = useState({
    amount: "",
    sourceCurrency: "BLUR",
    targetCurrency: "BLUR",
  });

  let arrayCurrency = [];

  const [exchangeRates, setExchangeRates] = useState({});

  // Save to Storage
  function saveToStorage(key, value) {
    let data = value;
    if (Array.isArray(value)) {
      data = JSON.stringify(value);
    }

    window.localStorage.setItem(key, data);
  }

  // Get from Stỏage
  function getFromStorage(key, defaultVal) {
    return window.localStorage.getItem(key) ?? defaultVal;
  }

  // Fetch API & save to Srorage
  useEffect(() => {
    axios.get("https://interview.switcheo.com/prices.json").then((response) => {
      setExchangeRates(response.data);
      for (let i = 0; i < response.data.length; i++) {
        arrayCurrency[i] = response.data[i].currency;
      }
      saveToStorage("currency", arrayCurrency);
    });
  });

  // Get currency data for option
  let currencyData = getFromStorage("currency");
  let currency = JSON.parse(currencyData);

  // Change currency
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Swap currency
  const handleSwap = () => {
    [formData.sourceCurrency, formData.targetCurrency] = [
      formData.targetCurrency,
      formData.sourceCurrency,
    ];
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check error
    if (formData.amount === "") {
      alert("Please input a number you need to convert");
    } else {
      const sourceCurrencyExchangeRate = exchangeRates.filter(
        (e) => e.currency === formData.sourceCurrency
      )[0].price;
      const targetCurrencyExchangeRate = exchangeRates.filter(
        (e) => e.currency === formData.targetCurrency
      )[0].price;

      // Calculte
      const amountInTargetCurrency = (
        (formData.amount * targetCurrencyExchangeRate) /
        sourceCurrencyExchangeRate
      ).toFixed(2);

      // Display the amount in target currency
      document.getElementById("result").innerHTML = ` ${formData.amount} ${
        formData.sourceCurrency
      } <img src=${require(`./images/${formData.sourceCurrency}.svg`)} alt="coin-pic" />  = ${amountInTargetCurrency} ${
        formData.targetCurrency
      } <img src=${require(`./images/${formData.targetCurrency}.svg`)} alt="coin-pic" />`;
    }
  };
  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <div className="numberCurrency">
          <label htmlFor="numberCurrency">Input a Currency number</label>
          <input
            type="number"
            name="amount"
            placeholder="Amount to be swapped"
            value={formData.amount}
            onChange={handleChange}
            id="numberCurrency"
          />
        </div>
        <div className="choose-currency">
          <div className="sourceCurrency">
            <label htmlFor="sourceCurrency">Choose Currency</label>
            <select
              name="sourceCurrency"
              value={formData.sourceCurrency}
              onChange={handleChange}
              id="sourceCurrency"
            >
              {currency?.map((e, i) => (
                <option value={e} key={i}>
                  {e}
                </option>
              ))}
            </select>
          </div>
          <span className="swap-btn" onClick={handleSwap}>
            <AiOutlineSwap />
          </span>
          <div className="targetCurrency">
            <label htmlFor="targetCurrency">Choose Currency</label>
            <select
              name="targetCurrency"
              value={formData.targetCurrency}
              onChange={handleChange}
              id="targetCurrency"
            >
              {currency?.map((e, i) => (
                <option value={e} key={i}>
                  {e}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="submit">
          <button type="submit" className="submit-btn">
            Submit
          </button>{" "}
          <p className="result">
            Converted Amount:
            <span id="result"> 0.00</span>
          </p>
        </div>
      </form>
    </div>
  );
};

function App() {
  return (
    <div className="currency-form">
      <h1>Currency Swap Form</h1>
      <CurrencySwapForm />
    </div>
  );
}

export default App;
