import axios from '../../axios'
import {
    FETCH_USER_FAIL,
    FETCH_USER_REQUEST,
    FETCH_USER_SUCCESS,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    FETCH_SINGLE_USER_REQUEST,
    FETCH_SINGLE_USER_SUCCESS,
    FETCH_SINGLE_USER_FAIL,
    UPDATE_ONLINE_USER_REQUEST,
    UPDATE_ONLINE_USER_SUCCESS,
    UPDATE_ONLINE_USER_FAIL,
    UPDATE_OFFLINE_USER_REQUEST,
    UPDATE_OFFLINE_USER_SUCCESS,
    UPDATE_OFFLINE_USER_FAIL
} from '../actions/types'

export const fetchUser = () => {
    return dispatch => {
        dispatch(fetchUserProfileStarted());
        const token = JSON.parse(localStorage.getItem('token'))
        axios.get('/users/profile', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                let user = res.data;
                dispatch(fetchUserProfileSuccess(user));
            })
            .catch(error => {
                dispatch(fetchUserProfileFailure(error.response));
            });
    }
}

const fetchUserProfileStarted = () => {
    return {
        type: FETCH_USER_REQUEST
    }
}

const fetchUserProfileSuccess = (user) => {
    return {
        type: FETCH_USER_SUCCESS,
        payload: {
            user
        }
    }
}

const fetchUserProfileFailure = (error) => {
    return {
        type: FETCH_USER_FAIL,
        payload: {
            error
        }
    }
}


export const updateProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: UPDATE_PROFILE_REQUEST,
        })
        const token = JSON.parse(localStorage.getItem('token'))
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

        const { data } = await axios.put(`/users/profile`, user, config)
        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.msg
                ? error.response.data.msg
                : error.msg
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: message,
        })
    }
}

export const fetchUsers = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: FETCH_USERS_REQUEST,
        })
        const token = JSON.parse(localStorage.getItem('token'))
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        const { data } = await axios.get(`/users`, config)
        dispatch({
            type: FETCH_USERS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.msg
                ? error.response.data.msg
                : error.msg
        dispatch({
            type: FETCH_USERS_FAIL,
            payload: message,
        })
    }
}

export const fetchSingleUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: FETCH_SINGLE_USER_REQUEST,
        })
        const token = JSON.parse(localStorage.getItem('token'))
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        const { data } = await axios.get(`/users/${id}`, config)
        dispatch({
            type: FETCH_SINGLE_USER_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.msg
                ? error.response.data.msg
                : error.msg
        dispatch({
            type: FETCH_SINGLE_USER_FAIL,
            payload: message,
        })
    }
}


export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DELETE_USER_REQUEST,
        })
        const token = JSON.parse(localStorage.getItem('token'))
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        const { data } = await axios.delete(`/users/${id}`, config)
        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.msg
                ? error.response.data.msg
                : error.msg
        dispatch({
            type: DELETE_USER_FAIL,
            payload: message,
        })
    }
}

export const updateUser = (id, user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: UPDATE_USER_REQUEST,
        })
        const token = JSON.parse(localStorage.getItem('token'))
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

        const { data } = await axios.put(`/users/${id}`, user, config)
        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.msg
                ? error.response.data.msg
                : error.msg
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: message,
        })
    }
}

export const updateOnlineUser = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: UPDATE_ONLINE_USER_REQUEST,
        })
        const token = JSON.parse(localStorage.getItem('token'))
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

        const { data } = await axios.patch(`/users/updateOnlineStatus`, {}, config)
        dispatch({
            type: UPDATE_ONLINE_USER_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.msg
                ? error.response.data.msg
                : error.msg
        dispatch({
            type: UPDATE_ONLINE_USER_FAIL,
            payload: message,
        })
    }
}

export const updateOfflineUser = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: UPDATE_OFFLINE_USER_REQUEST,
        })
        const token = JSON.parse(localStorage.getItem('token'))
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

        const { data } = await axios.patch(`/users/updateOfflineStatus`, {}, config)
        dispatch({
            type: UPDATE_OFFLINE_USER_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.msg
                ? error.response.data.msg
                : error.msg
        dispatch({
            type: UPDATE_OFFLINE_USER_FAIL,
            payload: message,
        })
    }
}