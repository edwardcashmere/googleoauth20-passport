require('dotenv').config();
const express = require('express');
const app = express();
const methodOverride = require('method-override')
const colors = require('colors');
const path = require('path');
const connectDB = require('./config/db.js');
const exphbs = require('express-handlebars');
const index = require('./routes/index.js');
const auth = require('./routes/auth.js');
const passport = require('passport');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session)
const morgan = require('morgan');
const PORT = process.env.PORT || 8080;

//connect database
connectDB();

//helpers
const { formatDate,truncate,stripTags,editIcon,select } = require('./helpers/hbs.js')
//global variables


//overide setup
app.use(methodOverride('_method'))


//handlebars
app.engine('.hbs',exphbs({ helpers:{ formatDate,stripTags,truncate,editIcon,select },defaultLayout:'main',extname:'.hbs'}));
app.set('view engine','.hbs');

//session middleware
app.use(session({ 
    secret:'cdndkjnhsmbdhfmh',
    resave:false,
    saveUninitialized:false,
    store: new MongoStore({ mongooseConnection:mongoose.connection})
}))


//static 
app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({ extended:false}))
app.use(express.json());


//passport middleware
app.use(passport.initialize());
app.use(passport.session())
//passport 
require('./config/passport.js')(passport)

app.use((req, res, next) =>{
    res.locals.user = req.user || null
    next()
})





//routes
app.use('/',index)
app.use('/auth',auth)

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
    console.log('morgan connected')
}

app.listen(PORT,()=>{
    console.log(`server running on environment ${process.env.NODE_ENV} on port ${PORT}`.blue.bold)
});