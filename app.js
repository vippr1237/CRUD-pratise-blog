const express = require('express');
const app = express();

// third party lib
const mongoose = require('mongoose');
const morgan = require('morgan');
const reload = require('reload');

// routes
const articleRoutes = require('./routes/article.route');
const profileRoutes = require('./routes/profile.route');
const userRoutes = require('./routes/user.route')

require('dotenv').config();

//set view engine
app.set('view engine', 'ejs');

//middle wares static files
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.redirect('/article')
})

//using routes
app.use('/article',articleRoutes);
app.use('/profile', profileRoutes);
app.use('/user', userRoutes);

//http
app.get('/403',function(req, res){
    res.render('http/403');
})

// connect to database
mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() =>{
        console.log("Connected to MongoDB");
    })
    .catch(err => console.log(err));
//listening to port
app.listen(process.env.PORT || 3001, (err) =>{
    if (err)
        console.log(err);
    else
        console.log("Listening on port 3001")
});
reload(app);