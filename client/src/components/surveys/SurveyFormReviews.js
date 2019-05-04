// SurveyFormReview shows users their form inputs for review
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import * as actions from '../../actions';

// onCancel is props and this component just received onCancel props not all props
const SurveyFormReview = ({ onCancel, formValues, submitSurvey }) => {
    const reviewFields = _.map(formFields, ({ name, label }) => {
        return (
            <div key={name}>
                <label>{label}</label>
                <div>
                    {formValues[name]}
                </div>
            </div>
        );
    });

    return (
        <div>
            <h5>Please confirm your entries</h5>
            {reviewFields}
            <button
                className="yellow darken-3 white-text btn-flat"
                onClick={onCancel}
            >Back</button>
            <button
                onClick={() => submitSurvey(formValues)}
                className="green btn-flat right white-text"
            >
                Send Survey
                <i className="material-icons right">email</i>
            </button>
        </div>
    );
};

// pull value from redux store
// to transforming redux state to props and send to redux store
function mapStateToProps(state) {
    return { formValues: state.form.surveyForm.values };
}

// mapStateToProps this return will pass as props on the next param
export default connect(mapStateToProps, actions)(SurveyFormReview);