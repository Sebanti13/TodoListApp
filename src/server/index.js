const express = require("express");
const app = express();
const router = require("./router");
const cors = require("cors");
const session = require("express-session");
const bodyParser = require("body-parser");

// mongoose.connect("mongodb://localhost/Insurance", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// dbServer.storeInDb();
const corsOptions = {
  "Access-Control-Allow-Origin": "http://localhost",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(
  session({
    cookie: { maxAge: 60000 },

    secret: "secret",

    resave: false,

    saveUninitialized: false,
  })
);

// app.use('/customers', customers)
app.use("/", router);
app.listen(8081);
