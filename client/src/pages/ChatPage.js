import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import Messages from '../components/Messages';
import axios from '../axios';
import { useDispatch, useSelector } from 'react-redux';
import { createMessage, fetchMessages } from '../redux/actions/messageActions';
import { Form, Row, Button, InputGroup, FormControl, Alert } from 'react-bootstrap';
import { updateOnlineUser } from '../redux/actions/userActions';
import Loader from '../components/Loader';
let socket;
const ChatPage = () => {
    const ENDPT = 'ws://localhost:4000';
    const token = localStorage.getItem('token')
    const dispatch = useDispatch()
    let { room_id } = useParams();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [userInfo, setUserInfo] = useState(null)
    const { success } = useSelector(state => state.deleteMessage)
    const { loading, error } = useSelector(state => state.createMessage)
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'))
        axios.get('/users/profile', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                setUserInfo(res.data)
            })
            .catch(error => {
                console.log(error.response)
            });
    }, [])
    useEffect(() => {
        if (token) {
            dispatch(updateOnlineUser())
        }
    }, [dispatch, userInfo, room_id, messages])
    useEffect(() => {
        socket = io(ENDPT);
        socket.emit('join', { userName: userInfo?.userName, room_id, user_id: userInfo?._id })
    }, [userInfo])
    useEffect(() => {
        socket.on('message', message => {
            setMessages([...messages, message])
        })
    }, [messages, success])
    useEffect(() => {
        dispatch(fetchMessages(room_id, socket))
        socket.on('output-messages', messages => {
            setMessages(messages)
        })
    }, [dispatch, success])
    const sendMessage = event => {
        event.preventDefault();
        dispatch(createMessage(room_id, { text: message }, socket))
        setMessage('')
    }
    return (
        <div className="outerContainer">
            <div className="container">
                <Messages messages={messages} user_id={userInfo?._id} />
                <Form onSubmit={sendMessage} style={{
                    position: "fixed",
                    bottom: "1px",
                    width: '60%'
                }}>
                    <Row>
                        <InputGroup className="mb-3">
                            <FormControl
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                                placeholder="Type a message"
                                value={message}
                                onChange={event => setMessage(event.target.value)}
                            />
                            <Button variant="outline-dark"
                                id="button-addon2">
                                Send Message
                            </Button>
                        </InputGroup>
                        {error && <Alert variant='danger'>{error}</Alert>}
                        {loading && <Loader />}
                    </Row>
                </Form>
            </div>
        </div>
    )
}

export default ChatPage
