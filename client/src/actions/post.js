import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES,
    LOGIN_FAIL,
    DELETE_POST,
    ADD_POST,
    GET_POST,
    ADD_COMMENT,
    REMOVE_COMMENT
} from './types';

// Get All Posts
export const getAllPosts = () => async dispatch  => {
    try{
        const res = await axios.get('/api/posts');
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    }
    catch(error){
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
    }
}

// Add Likes
export const addLikes = (postId) => async dispatch  => {
    try{
        const res = await axios.put(`/api/posts/like/${postId}`);
        dispatch({
            type: UPDATE_LIKES,
            payload: { postId, likes: res.data}
        })
    }
    catch(error){
        const errors = error.response.data;

        // if (errors) {
        //     errors.forEach(error => );
        // }
        dispatch(setAlert(errors.msg, 'danger'));

        // dispatch({
        //     type: LOGIN_FAIL
        // });
        
        // dispatch({
        //     type: POST_ERROR,
        //     payload: { msg: error.response.statusText, errorMsg: error.response.data.msg, status: error.response.status }
        // });
    }
}

// Remove Likes
export const removeLikes = (postId) => async dispatch  => {
    try{
        const res = await axios.put(`/api/posts/unlike/${postId}`);
        dispatch({
            type: UPDATE_LIKES,
            payload: { postId, likes: res.data}
        })
    }
    catch(error){
        const errors = error.response.data;
        // dispatch({
        //     type: POST_ERROR,
        //     payload: { msg: error.response.statusText, status: error.response.status }
        // });
        dispatch(setAlert(errors.msg, 'danger'));
    }
}

// Delete Posts
export const deletePost = (postId) => async dispatch  => {
    try{
        const res = await axios.delete(`/api/posts/${postId}`);
        dispatch({
            type: DELETE_POST,
            payload: postId
        })
        dispatch(setAlert('Post removed successfully!!', 'success'));
    }
    catch(error){
        const errors = error.response.data;
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
        // dispatch(setAlert(errors.msg, 'danger'));
    }
}

// Add Post
export const addPost = (formData) => async dispatch  => {
    const config = {
        header: {
            'Content-Type': 'application/json'
        }
    }
    try{
        const res = await axios.post(`/api/posts`, formData, config);
        
        dispatch({
            type: ADD_POST,
            payload: res.data
        })
        dispatch(setAlert('Post Created!!', 'success'));
    }
    catch(error){
        // const errors = error.response.data;
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
        // dispatch(setAlert(errors.msg, 'danger'));
    }
}

// Get Post by ID
export const getPostById = (postId) => async dispatch  => {
    try{
        const res = await axios.get(`/api/posts/${postId}`);
        dispatch({
            type: GET_POST,
            payload: res.data
        })
    }
    catch(error){
        // const errors = error.response.data;
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
        // dispatch(setAlert(errors.msg, 'danger'));
    }
}


// Add Comment
export const addComment = (postId, formData) => async dispatch  => {
    const config = {
        header: {
            'Content-Type': 'application/json'
        }
    }
    try{
        const res = await axios.post(`/api/posts/comment/${postId}`, formData, config);
        
        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        })
        dispatch(setAlert('Comment Added!!', 'success'));
    }
    catch(error){
        // const errors = error.response.data;
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
        // dispatch(setAlert(errors.msg, 'danger'));
    }
}

// Delete Comment
export const deleteComment = (postId, commentId) => async dispatch  => {
    try{
        const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
        
        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId
        })
        dispatch(setAlert('Comment Removed!!', 'success'));
    }
    catch(error){
        // const errors = error.response.data;
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
        // dispatch(setAlert(errors.msg, 'danger'));
    }
}

