import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import SurveyList from '../components/surveys/SurveyList';
import { connect } from 'react-redux';
import { fetchSurveys } from '../actions';

class Dashboard extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
    this.props.fetchSurveys();
  }
  render() {

    let spread = [...this.props.surveys];
    console.log('spread ', spread)
        return (
          <div>
            <SurveyList spread={spread} surveys={this.props.surveys} test={this.props.surveys}/>
            <div className="fixed-action-btn">
              <Link to="/survey/new" className="btn-floating btn-large red">
                <i className="material-icons">ac_unit</i>
              </Link>
            </div>
          </div>
        );
    }
}

function mapStateToProps({surveys}){
  return {
    surveys
  }
}

export default connect(mapStateToProps, { fetchSurveys })(Dashboard)