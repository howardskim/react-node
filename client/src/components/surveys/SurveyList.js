import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchSurveys, deleteSurvey } from "../../actions";

class SurveyList extends Component {
    constructor(props){
        super(props);
        this.state = {
            sorted: false,
            surveys: ['why'],
            test: this.props.spread
        }
    }
    componentDidMount(){
        // this.props.fetchSurveys();
        // this.setState({
        //     surveys: this.props.surveys
        // })
        console.log('PLS ', this.props.spread)
    }
    handleDelete = (id) => {
        this.props.deleteSurvey(id);
    }
    handleSort = () => {

    }

    static getDerivedStateFromProps(nextProps, prevState){
        console.log('next props ', nextProps)
        return {
            surveys: nextProps.surveys
        }
    }
    renderSurveys = () => {
        return this.state.surveys.reverse().map((survey) => {
            return (
              <div key={Math.random()}className="card darken-3">
                <div className="card-content">
                  <span className="card-title">{survey.title}</span>
                  <p>{survey.body}</p>
                  <p className="right">
                    Sent On: {new Date(survey.dateSent).toLocaleDateString()}
                  </p>
                </div>
                <div className="card-action">
                  <a>Yes: {survey.yes}</a>
                  <a>NO: {survey.no}</a>
                  {/* <button onClick={()=> this.props.deleteSurvey(survey._id)}className="btn red">Delete</button> */}
                  <button onClick={() => this.handleDelete(survey._id)} className="btn red">Delete</button>

                  
                </div>
              </div>
            );
        })
    }
    render() {
        console.log(this.state);

        return (
            <div>
                <button className="btn blue">Sort By Title</button>
                {this.renderSurveys()}
            </div>
        )
    }
}
function mapStateToProps({surveys}){
    return {
        surveys
    }
}
export default connect(null, { fetchSurveys, deleteSurvey })(
  SurveyList
);