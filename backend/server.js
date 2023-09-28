// Importing and destructuring passport module from strategy/local and renaming it to myPassport. PassportJS has localStrategy but we want to customize the node_modules of "passport-local" strategy, to our customise strategy. The 'local-customer' and 'local-merchant' are build on top of the node_modules' PassportJS' local strategy.
const { myPassport } = require("./strategy/local");
const express = require("express");
const cors = require("cors");
const session = require("express-session");

const http = require("http");
const { Server } = require("socket.io");

// const path = require('path');
const cookieParser = require("cookie-parser");
const socketsManager = require("./listeners/socketsManager");

require("dotenv").config(); // process config vars => procces.env.VAR
require("./config/database"); // connect to the database with AFTER the config vars are processed
const app = express();
const PORT = process.env.PORT || 3030;
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL,
  },
});

// Router import
const AuthRouter = require("./routes/AuthRouter");
const CustomerRouter = require("./routes/CustomerRouter");
const MerchantRouter = require("./routes/MerchantRouter");

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);
// Configure express-session middleware
app.use(
  session({
    secret: process.env.SECRET_KEY,
    cookie: { maxAge: 30 * 60 * 1000 },
    resave: false,
    saveUninitialized: false,
  })
);
app.use(myPassport.initialize());
app.use(myPassport.session());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// Routers
app.use("/", AuthRouter);
app.use("/customer", CustomerRouter);
app.use("/merchant", MerchantRouter);

app.get('/serverstatus', function(req, res) {
  res.send("Server is running.");
})

///// SOCKET
io.on("connection", socketsManager.onConnect);
///// SOCKET

httpServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
