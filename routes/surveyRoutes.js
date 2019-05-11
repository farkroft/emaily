const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url');
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

    app.post('/api/surveys/webhooks', (req, res) => {
        const p = new Path('/api/surveys/:surveyId/:choice');
        const events = _.chain(req.body)
            .map(({email, url}) => {
                // pathname only take the route instead of whole url            
                // cant destructuring pathname because sometimes it return null
                const match = p.test(new URL(url).pathname);
                if (match) {
                    return { email, surveyId: match.surveyId, choice: match.choice };
                }
            })
            // remove undefined value from elements
            .compact()
            // get unique value
            .uniqBy( 'email', 'surveyId')
            .value();

        console.log(events);
        res.send({});
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