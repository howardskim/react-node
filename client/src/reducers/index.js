import authReducer from './authReducer';
import surveyReducer from './surveyReducer';
import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';


export default combineReducers({
    auth: authReducer,
    form: reduxForm,
    surveys: surveyReducer
})