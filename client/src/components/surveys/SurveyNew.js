import React, { Component } from 'react'
import SurveyForm from '../SurveyForm';
import SurveyFormReview from './SurveyFormReview';
import { reduxForm, Field } from "redux-form";

//shows surveyform and surveyformreview
class SurveyNew extends Component {
    constructor(props){
        super(props);
        this.state = {
            toShow: 1
        }
    }
    getData = (data) => {
        console.log('data ', data);
        this.setState({
            data,
            toShow: 2
        })
    }
    handleBack = () => {
        this.setState({
            toShow: 1
        })
    }
    renderCorrectComponent = () => {
        switch(this.state.toShow){
            case 1:
                return (
                    <SurveyForm 
                        getData = {this.getData}
                    />
                )
            case 2:
                return (
                    <SurveyFormReview 
                        data={this.state.data}
                        handleBack={this.handleBack}
                    />
                )
            default:
                return '';
        }
    }
    render() {
        return (
            <div>
                {this.renderCorrectComponent()}
            </div>
        )
    }
}
export default reduxForm({
    form: 'surveyForm'
})(SurveyNew);