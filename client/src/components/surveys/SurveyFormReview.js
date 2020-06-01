import React from 'react'
import { connect } from 'react-redux';
import * as actions from '../../actions/index'
import { withRouter } from 'react-router-dom';

function SurveyFormReview(props) {
    let { history } = props;
    console.log(history)
    let { title, subject, body, recipients } = props.data;
    return (
      <div>
        <h5>Review your entries</h5>
        <div>
          <label>Survey Title</label>
          <div>{title}</div>
        </div>
        <div>
          <label>Subject line Title</label>
          <div>{subject}</div>
        </div>
        <div>
          <label>Email Body</label>
          <div>{body}</div>
        </div>
        <div>
          <label>Email List</label>
          <div>{recipients}</div>
        </div>
        <button onClick={props.handleBack} className="btn-large yellow darken-3">Back</button>
        <button onClick={() => props.submitSurvey(props.data, history)} className="btn-large green darken-3 right">
            Submit
            <i className="material-icons right">email</i>
        </button>

      </div>
    );
}

function mapStateToProps(state){
    return {

    }
}
export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));