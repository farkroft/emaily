import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';

// this one called actions creator
export const fetchUser = () => async dispatch => {


    const res = await axios.get('/api/current_user');
    // console.log(res.data)
    // if (res.data === null) {
    //     dispatch({ type: FETCH_USER, payload: res.data });
    //     localStorage.setItem('googleId', res.data.googleId)
    // }
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = (token) => async dispatch => {
    const res = await axios.post('/api/stripe', token);

    dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (values, history) => async dispatch => {
    const res = await axios.post('/api/surveys', values);

    history.push('/surveys');
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSurveys = () => async dispatch => {
    const res = await axios.get('/api/surveys');
    
    dispatch({ type: FETCH_SURVEYS, payload: res.data });
};

// export const deleteSurvey = (id) => async dispatch => {
//     const res = await axios.post('/api/surveys');

//     dispatch({ type: FETCH_SURVEYS, payload: res.data });
// }