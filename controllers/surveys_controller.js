const Survey = require('../models/Survey');

exports.survey_delete = (req, res) => {
    Survey.findByIdAndRemove(req.params.id, (err) => {
        if (err) return next(err);
        res.send({
            message: 'Survey Deleted'
        })
    })
};