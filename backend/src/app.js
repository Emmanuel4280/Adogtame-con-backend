const express = require("express");

const app = express();
const conectarDB = require("./config/db");

app.use(express.json());
conectarDB();

const perrosRouter = require("./routes/perros");
app.use("/perros", perrosRouter);

module.exports = app;
