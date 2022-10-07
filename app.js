import express from "express";
import account from "./routes/account.js";

const app = express();

app.use("/api/accounts", account);

//set port
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`server is running on localhost:${port}`);
});
