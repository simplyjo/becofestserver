const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();

require("dotenv").config();


app.use(
  bodyParser.json({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
app.use(express.urlencoded({ extended: false, limit: "50mb" }));


const indexRoute = require("./routes/index");
const authRoutes = require("./routes/auth-routes");
const checkerRoutes = require("./routes/checker");
const taskRoute = require("./routes/task");
const taskFestRoute = require("./routes/taskFest");
const callbackRoutes = require("./routes/callback");
const userRoutes = require("./routes/user");
const loginRoutes = require("./routes/login");
const loginSeasonRoutes = require("./routes/loginSeason");




var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
  methods: "GET, PUT, POST, PATCH, DELETE, OPTIONS",
  accessAllowOrigin: "*",
};
app.use(cors(corsOptions));






app.use("/", indexRoute);
app.use("/login", loginRoutes);
app.use("/loginSeason", loginSeasonRoutes);
app.use("/task", taskRoute)
app.use("/taskFest", taskFestRoute)
app.use("/auth", authRoutes);
app.use("/callback", callbackRoutes);
app.use("/user", userRoutes);
app.use("/checker", checkerRoutes);
app.use(express.static("client/build"));

app.listen(process.env.PORT || 6000);

mongoose.connect(process.env.MONGO_DB, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
  console.log("connected", process.env.PORT);
});



