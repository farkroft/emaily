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
    app.get('/api/surveys', requireLogin, async (req, res) => {
        const surveys = await Survey.find({ _user: req.user.id })
            .select({ recipients: false });

        res.send(surveys);
    });

    // :surveyId is wildcard
    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        res.send('Thanks for your feedback');
    });

    app.post('/api/surveys/webhooks', (req, res) => {
        const p = new Path('/api/surveys/:surveyId/:choice');

        _.chain(req.body)
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
            .each(({ surveyId, email, choice }) => {
                Survey.updateOne(
                    {
                        // if we use updateOne or other we have to use _id
                        _id: surveyId,
                        recipients: {
                            // find the element that match
                            $elemMatch: { email: email, responded: false }
                        }
                    },
                    {
                        // to increment ($inc is mongodb method)
                        // [choice] will fill for us either yes or no
                        $inc: { [choice]: 1 },
                        // $set is mongodb method, recipients got from previous object
                        $set: { 'recipients.$.responded': true, lastResponded: new Date() },
                    }
                // exec the query
                ).exec();
            })
            .value();

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