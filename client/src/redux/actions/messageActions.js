import axios from '../../axios'
import {
    MESSAGE_CREATE_REQUEST,
    MESSAGE_CREATE_SUCCESS,
    MESSAGE_CREATE_FAIL,
    FETCH_MESSAGE_REQUEST,
    FETCH_MESSAGE_SUCCESS,
    FETCH_MESSAGE_FAIL,
    DELETE_MESSAGE_REQUEST,
    DELETE_MESSAGE_SUCCESS,
    DELETE_MESSAGE_FAIL,
} from '../actions/types'

export const fetchMessages = (roomId, socket) => async (dispatch, getState) => {
    try {
        dispatch({
            type: FETCH_MESSAGE_REQUEST,
        })
        const token = JSON.parse(localStorage.getItem('token'))
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        const { data } = await axios.get(`/messages/${roomId}`, config)
        socket.emit('get-messages-history', data)
        dispatch({
            type: FETCH_MESSAGE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.msg
                ? error.response.data.msg
                : error.msg
        dispatch({
            type: FETCH_MESSAGE_FAIL,
            payload: message,
        })
    }
}

export const createMessage = (roomId, message, socket) => async (dispatch, getState) => {
    try {
        dispatch({
            type: MESSAGE_CREATE_REQUEST,
        })
        const token = JSON.parse(localStorage.getItem('token'))
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        const { data } = await axios.post(`/messages/${roomId}`, message, config)
        socket.emit('sendMessage', data, roomId)
        dispatch({
            type: MESSAGE_CREATE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.msg
                ? error.response.data.msg
                : error.msg
        dispatch({
            type: MESSAGE_CREATE_FAIL,
            payload: message,
        })
    }
}

export const deleteMessage = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DELETE_MESSAGE_REQUEST,
        })
        const token = JSON.parse(localStorage.getItem('token'))
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        const { data } = await axios.delete(`/messages/${id}`, config)
        dispatch({
            type: DELETE_MESSAGE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.msg
                ? error.response.data.msg
                : error.msg
        dispatch({
            type: DELETE_MESSAGE_FAIL,
            payload: message,
        })
    }
}