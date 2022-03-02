import React, { useEffect } from 'react';
import moment from "moment"
import { deleteMessage } from '../redux/actions/messageActions';
import { useDispatch, } from 'react-redux';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';

const Message = ({ message, current_uid, user }) => {
    let socket
    const ENDPT = 'https://realtimemernapp.herokuapp.com';
    useEffect(() => {
        socket = io(ENDPT);
    }, [ENDPT])
    const dispatch = useDispatch()
    let isCurrentUser = false;
    if (message.user_id === current_uid) {
        isCurrentUser = true;
    }
    const removeMessage = (id, socket) => {
        dispatch(deleteMessage(id, socket))
    }
    return (
        <div className='message'>
            {isCurrentUser ? (<div className="row right-align" >
                <div className="col s12 m8 16" style={{ textAlign: 'end' }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'end',
                        marginRight: '10px',
                        maxWidth: "100%"
                    }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Link to={`/profile`} style={{ textDecoration: "none" }}>
                                <h6> {message.name} </h6>
                            </Link>
                            {user?.online === true ? (<div
                                style={{
                                    backgroundColor: 'green',
                                    width: '10px', height: '10px',
                                    borderRadius: '100px'
                                }}>

                            </div>) : null}
                        </div>
                        <p style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            maxWidth: '75%'
                        }}>
                            <span className="sentbyme">
                                {message.text}
                            </span>
                            <i className='fas fa-times'
                                onClick={() => removeMessage(message._id, socket)}
                                style={{
                                    color: 'red',
                                    fontWeight: 'bold',
                                    borderRadius: '5px',
                                    marginLeft: '10px',
                                    cursor: 'pointer'
                                }}></i>
                        </p>
                        < span style={{ color: '#898585' }}>
                            {moment(message.updatedAt).startOf('minute').fromNow()}
                        </span>
                    </div>
                </div>
            </div >) : (<div className="row left-align">
                <div className="col s12 m8 16 left">
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'start',
                        marginRight: '10px',
                        maxWidth: "100%"
                    }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <Link to={`/profile/${message.user_id}`} style={{ textDecoration: "none" }}>
                                <h6> {message.name} </h6>
                            </Link>
                            {user?.online === true ? (<div
                                style={{
                                    backgroundColor: 'green',
                                    width: '10px', height: '10px',
                                    borderRadius: '100px'
                                }}>

                            </div>) : null}
                        </div>
                        <span className="opponent"> {message.text}
                        </span>
                        <span style={{ color: '#898585' }}>
                            {moment(message.updatedAt).startOf('minute').fromNow()}
                        </span>
                    </div>
                </div>
            </div >)}
        </div>
    )
}
export default Message
