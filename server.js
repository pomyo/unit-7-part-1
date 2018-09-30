const express = require('express');
const mongoose = require("mongoose");
const path = require('path');
const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect("mongodb://heroku_tlwqfxjj:Rocketscience101!@ds113736.mlab.com:13736/heroku_tlwqfxjj");


require('./routes/api-routes.js')(app);
require('./routes/html-routes.js')(app);

app.listen(PORT, function(){
    console.log(`App is now listening on PORT ${PORT}`)
})