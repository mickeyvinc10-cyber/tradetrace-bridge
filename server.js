const express = require("express");

const app = express();

app.use(express.json());

app.post("/mt5webhook", async (req, res) => {
  try {
    console.log("MT5 EVENT:", req.body);

    const response = await fetch("https://api.base44.app/api/apps/fanatic-trade-trace-log/functions/mt5webhook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-webhook-secret": process.env.MT5_WEBHOOK_SECRET
      },
      body: JSON.stringify(req.body)
    });

    const result = await response.text();

    console.log("BASE44 RESPONSE:", result);

    res.status(200).json({
      forwarded: true,
      base44_response: result
    });
  } catch (err) {
    console.error("ERROR:", err);

    res.status(500).json({
      error: err.message
    });
  }
});

app.get("/", (req, res) => {
  res.send("TradeTrace bridge running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
