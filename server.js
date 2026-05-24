const express = require("express");

const app = express();

app.use(express.json());

app.post("/mt5webhook", (req, res) => {
  console.log("MT5 EVENT:", req.body);

  res.status(200).json({
    status: "ok"
  });
});

app.get("/", (req, res) => {
  res.send("TradeTrace bridge running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
