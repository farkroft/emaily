import { combineReducers } from 'redux';
// rename reducer function to reduxForm
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';

export default combineReducers({
    auth: authReducer,
    form: reduxForm
});