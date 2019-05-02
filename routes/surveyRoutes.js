const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
    app.get('/api/surveys/thanks', (req, res) => {
        res.send('Thanks for your feedback');
    });

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;

        const survey = new Survey({
            // when key and value identical, can be shorted with ES6 syntax like this
            title,
            subject,
            body,
            // parentheses after arrow function to make ensure javascript know that we want to return object
            recipients: recipients.split(',').map(email => ({ email })),
            _user: req.user.id,
            dateSent: Date.now()
        });

        // Great place to send email!
        const mailer = new Mailer(survey, surveyTemplate(survey));
        // async await
        try {
            await mailer.send();
        await survey.save();
        req.user.credits -= 1;
        const user = await req.user.save();

        res.send(user);
        } catch (err) {
            res.status(422).send(err);
        }
        
    });
};