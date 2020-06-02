import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS, DELETE_SURVEY } from "./types";

// export const fetchUser = () => {
//     return function (dispatch) {
//       axios.get("/api/current_user").then((user) => {
//           console.log(user)
//           dispatch({
//               type: FETCH_USER,
//               payload: user
//           })
//       });
//     };
// }

export const fetchUser = () => async (dispatch) => {
    const response = await axios.get("/api/current_user");
    dispatch({
        type: FETCH_USER,
        payload: response.data,
    });
};

export const handleToken = (token) => async (dispatch) => {
    const response = await axios.post('/api/stripe', token);
    dispatch({
      type: FETCH_USER,
      payload: response.data,
    });
}

export const submitSurvey = (values, history) => async (dispatch) => {
    const response = await axios.post('/api/survey', values);
    console.log('history ', history);
    history.push('/survey')
    dispatch({
        type: FETCH_USER,
        payload: response.data
    })
};

export const fetchSurveys = () => async (dispatch) => {
    const response = await axios.get('/api/surveys');
    dispatch({
        type: FETCH_SURVEYS,
        payload: response.data.surveys
    })
}

export const deleteSurvey = (id) => async (dispatch) => {
    const response = await axios.delete(`/api/survey/${id}`);
    dispatch({
        type: FETCH_SURVEYS,
        payload: response.data.surveys
    })
}