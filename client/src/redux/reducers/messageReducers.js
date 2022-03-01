import {
    MESSAGE_CREATE_FAIL,
    MESSAGE_CREATE_SUCCESS,
    MESSAGE_CREATE_REQUEST,
    FETCH_MESSAGE_REQUEST,
    FETCH_MESSAGE_SUCCESS,
    FETCH_MESSAGE_FAIL,
    DELETE_MESSAGE_REQUEST,
    DELETE_MESSAGE_SUCCESS,
    DELETE_MESSAGE_FAIL,
} from '../actions/types'

export const messageCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case MESSAGE_CREATE_REQUEST:
            return { loading: true }
        case MESSAGE_CREATE_SUCCESS:
            return { loading: false, success: true, message: action.payload }
        case MESSAGE_CREATE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const fetchMessageReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_MESSAGE_REQUEST:
            return { loading: true }
        case FETCH_MESSAGE_SUCCESS:
            return { loading: false, success: true, message: action.payload }
        case FETCH_MESSAGE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const deleteMessageReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_MESSAGE_REQUEST:
            return { loading: true }
        case DELETE_MESSAGE_SUCCESS:
            return { loading: false, success: true, message: action.payload }
        case DELETE_MESSAGE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}