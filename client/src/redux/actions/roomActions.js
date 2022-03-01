import axios from '../../axios'
import {
    ROOM_CREATE_REQUEST,
    ROOM_CREATE_SUCCESS,
    ROOM_CREATE_FAIL,
    FETCH_ROOMS_REQUEST,
    FETCH_ROOMS_SUCCESS,
    FETCH_ROOMS_FAIL,
    DELETE_ROOM_REQUEST,
    DELETE_ROOM_SUCCESS,
    DELETE_ROOM_FAIL,
    UPDATE_ROOM_REQUEST,
    UPDATE_ROOM_SUCCESS,
    UPDATE_ROOM_FAIL,
} from '../actions/types'

export const fetchRooms = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: FETCH_ROOMS_REQUEST,
        })
        const token = JSON.parse(localStorage.getItem('token'))
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        const { data } = await axios.get(`/rooms`, config)
        dispatch({
            type: FETCH_ROOMS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.msg
                ? error.response.data.msg
                : error.msg
        dispatch({
            type: FETCH_ROOMS_FAIL,
            payload: message,
        })
    }
}


export const createRoom = (name, socket) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ROOM_CREATE_REQUEST,
        })
        const token = JSON.parse(localStorage.getItem('token'))
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }

        const { data } = await axios.post(`/rooms`, name, config)
        socket.emit('create-room', data);
        dispatch({
            type: ROOM_CREATE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.msg
                ? error.response.data.msg
                : error.msg
        dispatch({
            type: ROOM_CREATE_FAIL,
            payload: message,
        })
    }
}

export const deleteRoom = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DELETE_ROOM_REQUEST,
        })
        const token = JSON.parse(localStorage.getItem('token'))
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        const { data } = await axios.delete(`/rooms/${id}`, config)
        dispatch({
            type: DELETE_ROOM_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.msg
                ? error.response.data.msg
                : error.msg
        dispatch({
            type: DELETE_ROOM_FAIL,
            payload: message,
        })
    }
}

export const updateRoom = (id, name) => async (dispatch, getState) => {
    try {
        dispatch({
            type: UPDATE_ROOM_REQUEST,
        })
        const token = JSON.parse(localStorage.getItem('token'))
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        const { data } = await axios.put(`/rooms/${id}`, name, config)
        dispatch({
            type: UPDATE_ROOM_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.msg
                ? error.response.data.msg
                : error.msg
        dispatch({
            type: UPDATE_ROOM_FAIL,
            payload: message,
        })
    }
}