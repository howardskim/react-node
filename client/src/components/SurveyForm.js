import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form';
import SurveyField from './surveys/SurveyField';
import { Link } from 'react-router-dom';
import validateEmail from '../utils/validateEmails';

//shows a form for a user to add input

const FIELDS =  [
    {label: 'Survey Title', name: 'title'},
    {label: 'Subject Line', name: 'subject'},
    {label: 'Email Body', name: 'body'},
    {label: 'Recipient List', name: 'recipients'},

]

class SurveyForm extends Component {
    renderFields = () => {
        return FIELDS.map((obj) => {
            let { label, name } = obj;
            return (
                <Field 
                    component={SurveyField}
                    key={name}
                    type="text"
                    label={label}
                    name={name}
                />
            )
        })
    }

    render() {
        console.log('this.props ', this.props);
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(values => this.props.getData(values))}>
                    {this.renderFields()}
                    <Link className="red btn btn-large" to="/survey">Cancel</Link>
                    <button className="btn teal btn-flat right white-text btn-large" type="submit">Next</button>
                </form>
            </div>
        )
    }
}

const validate = (values) => {
    let { recipients } = values;
    const errors = {};
    errors.recipients = validateEmail(recipients || "");
    FIELDS.forEach((obj) => {
        let { name } = obj;
        if(!values[name]){
            errors[name] = `Please provide a ${name}`
        }
    })
    return errors
}
export default reduxForm({
    validate: validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm);