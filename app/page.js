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
  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    setError(null);
    setConvertedAmount(null);
    setLoading(true);

    try {
      const response = await axios.get(
        `/api?from=${fromCurrency.code}&to=${toCurrency.code}&amount=${amount}`
      );
      setConvertedAmount(response.data.convertedAmount);
      setLoading(false);
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
        <h1 className="font-bold mb-4">Currency Exchange Calculator</h1>
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
          {loading ? (
            <svg
              aria-hidden="true"
              role="status"
              class="inline mr-2 w-4 h-4 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              ></path>
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="#1C64F2"
              ></path>
            </svg>
          ) : (
            "Convert"
          )}
        </button>
        {convertedAmount !== null && (
          <div className="text-green-600 mb-4">
            <p>
              {" "}
              The converted amount is:{" "}
              <span className="font-bold">
                {" "}
                {toCurrency.code} {convertedAmount}
              </span>
            </p>
          </div>
        )}
        {error && <div className="text-red-600">{error}</div>}
      </div>
    </div>
  );
};

export default CurrencyConverter;
