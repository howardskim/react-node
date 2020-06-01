import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import SurveyList from '../components/surveys/SurveyList';
export default class Dashboard extends Component {
    render() {
        return (
          <div>
            <SurveyList />
            <div className="fixed-action-btn">
              <Link to="/survey/new" className="btn-floating btn-large red">
                <i className="material-icons">ac_unit</i>
              </Link>
            </div>
          </div>
        );
    }
}
