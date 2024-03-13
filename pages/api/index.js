import axios from "axios";

const apiKey = "5ac91fad60964fcd9fea56bc4cc75184";

const handler = async (req, res) => {
  const { from, to, amount } = req.query;

  try {
    const response = await axios.get(
      `https://open.er-api.com/v6/latest?base=${from}&symbols=${to}&amount=${amount}&app_id=${apiKey}`
    );
    const conversionRate = response.data.rates[to];
    const convertedAmount = amount * conversionRate;
    res.status(200).json({ convertedAmount });
  } catch (error) {
    console.error(error);
  }
};
export default handler;
