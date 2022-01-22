import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    DELETE_EXPERIENCE,
    DELETE_EDUCATION,
    ACCOUNT_DELETED,
    CLEAR_PROFILE,
    GET_PROFILES,
    GET_REPOS
} from './types';

export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profiles/me');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
    }
}

export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post('/api/profiles/', formData, config);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));
        if (!edit) {
            history.push('/dashboard');
        }
    } catch (err) {
        const errors = err.response.data.errors;
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }

}

// Add Experience
export const addExperience = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put('/api/profiles/experience', formData, config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert('Experience Added','success'));
            history.push('/dashboard');
    } catch (err) {
        const errors = err.response.data.errors;
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}


// Add Education
export const addEducation = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put('/api/profiles/education', formData, config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert('Education Added','success'));
            history.push('/dashboard');
    } catch (err) {
        const errors = err.response.data.errors;
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}


// Delete Experience
export const deleteExperience = (id) => async dispatch => {
    try{
        const res = await axios.delete(`/api/profiles/experience/${id}`);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert('Experience Deleted','success'));
            // history.push('/dashboard');
    }catch(err){
        const errors = err.response.data.errors;
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Delete Education
export const deleteEducation = (id) => async dispatch => {
    try{
        const res = await axios.delete(`/api/profiles/education/${id}`);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert('Education Deleted','success'));
            // history.push('/dashboard');
    }catch(err){
        const errors = err.response.data.errors;
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}


// Delete Profile
export const deleteProfile = (id) => async dispatch => {
    try{
        const res = await axios.delete(`/api/profiles/`);
        dispatch({
            type: CLEAR_PROFILE,
        });
        dispatch({
            type: ACCOUNT_DELETED,
        });
        dispatch(setAlert('Profile Deleted','success'));
            // history.push('/dashboard');
    }catch(err){
        const errors = err.response.data.errors;
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Get All User's profile
export const getALlProfile = () => async dispatch => {
    dispatch({
        type: CLEAR_PROFILE
    });
    try {
        const res = await axios.get('/api/profiles/');
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        });
    } catch (error) {
        const errors = error.response.data.errors;
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
    }
}

// Get Profile By ID
export const getProfileById = (userId) => async dispatch => {
    dispatch({
        type: CLEAR_PROFILE
    });
    try {
        const res = await axios.get(`/api/profiles/user/${userId}`);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
    }
}


// Get Github Repos
export const getGitubRepos = (userName) => async dispatch => {
    // dispatch({
    //     type: CLEAR_PROFILE
    // });
    try {
        const res = await axios.get(`/api/profiles/github/${userName}`);
        dispatch({
            type: GET_REPOS,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
    }
}
