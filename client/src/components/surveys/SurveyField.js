import React, { Component } from 'react'

export default class SurveyField extends Component {
    constructor(props){
        super(props);
    }
    render() {
        let { input, label, meta: { error, touched} } = this.props;
        return (
          <div>
            <label>{label}</label>
            <input {...input} />
            <div style={{marginBottom: '20px'}} className="red-text">{touched && error}</div>
          </div>
        );
    }
}
