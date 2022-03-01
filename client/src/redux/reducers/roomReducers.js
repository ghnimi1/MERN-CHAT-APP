import {
    ROOM_CREATE_FAIL,
    ROOM_CREATE_SUCCESS,
    ROOM_CREATE_REQUEST,
    FETCH_ROOMS_REQUEST,
    FETCH_ROOMS_SUCCESS,
    FETCH_ROOMS_FAIL,
    DELETE_ROOM_REQUEST,
    DELETE_ROOM_SUCCESS,
    DELETE_ROOM_FAIL,
    UPDATE_ROOM_REQUEST,
    UPDATE_ROOM_SUCCESS,
    UPDATE_ROOM_FAIL
} from '../actions/types'

export const fetchRoomsReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_ROOMS_REQUEST:
            return { loading: true }
        case FETCH_ROOMS_SUCCESS:
            return { loading: false, success: true, rooms: action.payload }
        case FETCH_ROOMS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const roomCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case ROOM_CREATE_REQUEST:
            return { loading: true }
        case ROOM_CREATE_SUCCESS:
            return { loading: false, success: true, room: action.payload }
        case ROOM_CREATE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const deleteRoomReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_ROOM_REQUEST:
            return { loading: true }
        case DELETE_ROOM_SUCCESS:
            return { loading: false, success: true, room: action.payload }
        case DELETE_ROOM_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const updateRoomReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_ROOM_REQUEST:
            return { loading: true }
        case UPDATE_ROOM_SUCCESS:
            return { loading: false, success: true, room: action.payload }
        case UPDATE_ROOM_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}