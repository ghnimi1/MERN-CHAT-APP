import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../redux/actions/userActions';
import Message from './Message';
const Messages = ({ messages, user_id }) => {
    const dispatch = useDispatch()
    const { users } = useSelector((state) => state.users)
    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])
    return (
        <div className="messages">
            {messages?.map((message, i) => (
                <Message key={message._id}
                    message={message}
                    current_uid={user_id}
                    user={users?.find(usr => usr._id === message.user_id)}
                />
            ))}
        </div>
    )
}

export default Messages
