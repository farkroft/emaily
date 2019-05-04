// SurveyNew shows SurveyForm and SurveyFormReview
import React, { Component } from 'react';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReviews';

class SurveyNew extends Component {
    // babel plugin to initialize our state less code
    // constructor(props) {
    //     super(props);

    //     this.state = { new: true };
    // }
    // below is equivalent same with above
    state = { showFormReview: false };

    renderContent() {
        if (this.state.showFormReview) {
            return <SurveyFormReview
                onCancel = {() => this.setState({ showFormReview: false })}
            />
        }

        return <SurveyForm onSurveySubmit={() => this.setState({ showFormReview: true })} />
    }   

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

export default SurveyNew;