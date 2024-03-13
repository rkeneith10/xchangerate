"use client";
import axios from "axios";
import { useState } from "react";
import { TbExchange } from "react-icons/tb";
import BackImage1 from "../public/images/money.jpg";
import currencies from "./currencies";

const CurrencyConverter = () => {
  const [fromCurrency, setFromCurrency] = useState(currencies[0]);
  const [toCurrency, setToCurrency] = useState(currencies[1]);
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [error, setError] = useState(null);

  const handleConvert = async () => {
    setError(null);
    setConvertedAmount(null);

    try {
      const response = await axios.get(
        `/api?from=${fromCurrency.code}&to=${toCurrency.code}&amount=${amount}`
      );
      setConvertedAmount(response.data.convertedAmount);
    } catch (error) {
      setError("Failed to convert currency");
    }
  };

  return (
    <div
      className=" h-screen  max-w-screen-2xl mx-auto flex flex-col justify-center items-center p-7 lg:p-40  bg-center bg-cover bg-no-repeat "
      style={{ backgroundImage: `url(${BackImage1.src})` }}
    >
      <div className="pt-5 pl-10 pr-10 bg-white rounded-md shadow-sm sm:w-full lg:w-[440px]  h-auto flex flex-col justify-center items-center">
        <h1 className="font-semibold mb-4">Currency Exchange Calculator</h1>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500 mb-4 w-full"
        />{" "}
        <select
          value={fromCurrency.code}
          onChange={(e) =>
            setFromCurrency(currencies.find((c) => c.code === e.target.value))
          }
          className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500 mb-4 w-full"
        >
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.name}
            </option>
          ))}
        </select>
        <div className="justify-center items-center ">
          <TbExchange className="w-8 h-8 text-blue-500 mb-4" />
        </div>
        <select
          value={toCurrency.code}
          onChange={(e) =>
            setToCurrency(currencies.find((c) => c.code === e.target.value))
          }
          className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500 mb-4 w-full"
        >
          {currencies.map((currency) => (
            <option key={currency.code} value={currency.code}>
              {currency.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleConvert}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500 mb-4 w-full"
        >
          Convert
        </button>
        {convertedAmount !== null && (
          <div className="text-green-600">
            Converted Amount: {convertedAmount}
          </div>
        )}
        {error && <div className="text-red-600">{error}</div>}
      </div>
    </div>
  );
};

export default CurrencyConverter;
