const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// const path = require('path');
// const cookieParser = require('cookie-parser');
// const logger = require('morgan');

require('dotenv').config();
// connect to the database with AFTER the config vars are processed
require('./config/database');

// Router import
const groupsRouter = require('./routes/groups');

const app = express();

// app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// Routers
app.use('/group', groupsRouter);

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

const TestSchema = new mongoose.Schema({});
const Test = mongoose.model('Test', TestSchema)

app.get('/', async function (req, res) {
    try {
        const testData = await Test.find({});
        console.log(testData);
        res.json(testData);
    } catch (err) {
        console.log(err);
    }
})

///// TEST DB-CONNECTION

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});
