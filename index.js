const express = require('express');
const mongoose = require('mongoose');
// we use cookie-session instead of express-session
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./models/Survey');
require('./services/passport');

mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true
}).then(() => {
    console.log('Succesfully connected to the database')
}).catch(err => {
    console.log('cannot connect to database', err)
})

const app = express();

app.use(bodyParser.json());
app.use(
    cookieSession({
        // 30 days * 24 hours * 60 minutes * 60 seconds * 1000 miliseconds
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
// to tell passport ahould not use cookie when handle authentification
app.use(passport.initialize());
app.use(passport.session());

require('./routes/billingRoutes')(app);
require('./routes/authRoutes')(app);
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    // Express will serve up production assets
    // Like our main.js or main.css file
    app.use(express.static('client/build'));

    // Express serve up the index.html file
    // if it doesnt recognize the route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);