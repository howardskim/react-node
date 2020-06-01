import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import Landing from './Landing';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

class App extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.props.fetchUser();
    }
    render(){
        return (
          <div className="container">
            <BrowserRouter>
            <Header />
              <Route exact path="/" component={Landing} />
              <Route exact path="/survey" component={Dashboard} />
              <Route path="/survey/new" component={SurveyNew} />
              <Route path="/header" component={Header} />
            </BrowserRouter>
          </div>
        );
    }
}


export default connect(null, actions)(App);