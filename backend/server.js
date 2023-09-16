const express = require('express');
const cors = require('cors');
const passport = require("passport")

// const path = require('path');
// const cookieParser = require('cookie-parser');

require('dotenv').config();
// connect to the database with AFTER the config vars are processed
require('./config/database');
const app = express();

// Router import
const authRouter = require("./routes/authRouter");

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
}))
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// Routers
app.use("/", authRouter);


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





app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});

