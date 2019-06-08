import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';
import moment from 'moment';
import * as actions from '../../actions';
import _ from 'lodash';

class SurveyList extends Component {
    // everytime component rendered, we call fetchSurveys creator
    componentDidMount() {
        this.props.fetchSurveys();
    }

    isResponded(date) {
        if (date) {
            return (
                <p>
                    Last Responded: {moment(date).format('DD MMM YYYY')} at {moment(date).format('hh:mm:ss')}
                </p>
            );
        } else {
            return (
                <p>
                    No Response yet
                </p>
            );
        }
    }

    removeSurvey(arr, id) {
        // console.log(id);
        // console.log(this.props);
        arr.splice(arr.findIndex(id), 1);
    };

    renderSurveys() {
        const sentStyled = {
            paddingTop: '8px'
        };

        return this.props.surveys.reverse().map(survey => {
            return (
                <div className="card darken-1" key={survey._id}>
                    <div className="card-content waves-effect waves-block activator">
                        <span className="card-title">{survey.title}</span>
                        <p>
                            {survey.body}
                        </p>
                        <p style={sentStyled}>
                            Sent On: {moment(survey.dateSent).format('DD MMM YYYY')} at {moment(survey.dateSent).format('hh:mm:ss')}
                        </p>
                        <div>
                            {this.isResponded(survey.lastResponded)}
                        </div>
                    </div>
                    <div className="card-action">
                        <a href="#">Details</a>
                    </div>
                    <div className="card-reveal">
                        <span className="card-title grey-text text-darken-4 center">Actions<i className="material-icons right">close</i></span>
                        <div style={{ marginTop: "20px" }}>
                            <button onClick={() => this.removeSurvey(survey, survey._id)} className="red btn-flat white-text"><i className="material-icons right">delete</i>Delete</button>
                        </div>
                    </div>
                </div>
            );
        });
    }

    render() {
        return (
            <div className="container">
                {this.renderSurveys()}
            </div>
        );
    }
}

function mapStateToProps({ surveys }) {
    // call it from index reducer with the same key
    return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);