import { combineReducers } from "redux"
import {
    userLoginReducer,
    userRegisterReducer

} from "./authReducers"
import {
    messageCreateReducer,
    fetchMessageReducer,
    deleteMessageReducer
} from "./messageReducers";
import {
    singleUserReducer,
    updateProfileReducer,
    fetchUsersReducer,
    updateUserReducer,
    deleteUserReducer,
    fetchSingleUserReducer,
    updateOnlineUserReducer,
    updateOfflineUserReducer
} from "./userReducers"
import {
    roomCreateReducer,
    fetchRoomsReducer,
    deleteRoomReducer,
    updateRoomReducer
} from "./roomReducers"
const rootReducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    user: singleUserReducer,
    createMessage: messageCreateReducer,
    createRoom: roomCreateReducer,
    fetchMessage: fetchMessageReducer,
    rooms: fetchRoomsReducer,
    deleteRoom: deleteRoomReducer,
    updateProfile: updateProfileReducer,
    users: fetchUsersReducer,
    deleteMessage: deleteMessageReducer,
    deleteUser: deleteUserReducer,
    updateUser: updateUserReducer,
    singleUser: fetchSingleUserReducer,
    updateRoom: updateRoomReducer,
    online: updateOnlineUserReducer,
    offline: updateOfflineUserReducer
})

export default rootReducer;