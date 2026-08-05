const express = require("express");
const cors = require("cors");
const itemsRouter = require("./routes/items");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/api/items", itemsRouter);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
