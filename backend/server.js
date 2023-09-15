const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require("socket.io");
// const path = require('path');
// const cookieParser = require('cookie-parser');
// const logger = require('morgan');
const socketManager = require('./listeners/socketsManager.js');

require('dotenv').config(); // process config vars => procces.env.VAR
require('./config/database'); // connect to the database with AFTER the config vars are processed

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: process.env.FRONTEND_URL,
    }
});

// app.use(logger('dev'));
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
}))
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// Routers

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

///// TEST DB-CONNECTION
// const TestSchema = new mongoose.Schema({});
// const Test = mongoose.model('Test', TestSchema)

// app.get('/', async function (req, res) {
//     try {
//         const testData = await Test.find({});
//         console.log(testData);
//         res.json(testData);
//     } catch (err) {
//         console.log(err);
//     }
// })
///// TEST DB-CONNECTION

app.get('/', function(req, res) {
    res.send("backend running")
})

///// SOCKET
io.on('connection', socketManager.onConnect)
///// SOCKET

httpServer.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});

