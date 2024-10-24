import express from "express";
import routes from "./routes/index.mjs";
import envelopes from "./utils/envelopesData.mjs";
const app = express();
const PORT = process.env.PORT || 4002;
app.use(express.json())
app.use(routes)

app.get("/total", (req, res) => {
  let totalAmount = 0
  for (let i = 0; i < envelopes.length; i++) {
    const element = envelopes[i].balance;
    totalAmount += element
  }
  return res.send(`Total balance is: ${totalAmount}`)
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
