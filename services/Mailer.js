const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

// if you use new Mailer = blablabla, automatically first function that will execute is constructor
class Mailer extends helper.Mail {
    constructor({ subject, recipients }, content) {
        super();

        // whenever we create an instance Mailer 
        // assigning from_email property by referencing this.
        this.sgApi = sendgrid(keys.sendGridKey);
        this.from_email = new helper.Email('no-reply@emaily.com');
        this.subject = subject;
        // helper Send Grid that properly format property want to use on actual email 
        this.body = new helper.Content('text/html', content);
        this.recipients = this.formatAddresses(recipients);

        this.addContent(this.body);
        this.addClickTracking();
        this.addRecipients();
    }

    // function to format recipients become array of object thath just contain email key and value
    formatAddresses(recipients) {
        // need paretheses to do destructuring, cannot just an arrow function
        return recipients.map(({ email }) => {
            return new helper.Email(email);
        })
    }

    // function 
    addClickTracking() {
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }

    // to 
    addRecipients() {
        const personalize = new helper.Personalization();
        this.recipients.forEach(recipient => {
            personalize.addTo(recipient);
        });
        this.addPersonalization(personalize);
    }

    async send() {
        const request = this.sgApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON()
        });

        const response = await this.sgApi.API(request);
        return response;
    }
}

module.exports = Mailer;