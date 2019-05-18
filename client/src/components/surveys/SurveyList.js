import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';

class SurveyList extends Component {
    // everytime component rendered, we call fetchSurveys creator
    componentDidMount() {
        this.props.fetchSurveys();
    }

    isResponded(date) {
        if (date) {
            return (
                <p>
                    Last Responded: {new Date(date).toLocaleDateString()}
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

    renderSurveys() {
        const sentStyled = {
            paddingTop: '8px'
        };

        return this.props.surveys.reverse().map(survey => {
            return (
                <div className="card darken-1" key={survey._id}>
                    <div className="card-content">
                        <span className="card-title">{survey.title}</span>
                        <p>
                            {survey.body}
                        </p>
                        <p style={sentStyled}>
                            Sent On: {new Date(survey.dateSent).toLocaleDateString()}
                        </p>
                        <div className="right">
                        {this.isResponded(survey.lastResponded)}
                        </div>
                    </div>
                    <div className="card-action">
                        <a>Yes: {survey.yes}</a>
                        <a>No: {survey.no}</a>
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