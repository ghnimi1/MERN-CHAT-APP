import React, { useState, useEffect } from 'react';
import RoomList from '../components/RoomList';
import io from 'socket.io-client';
import { Form, Button, Row, Col, Card, InputGroup, FormControl, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createRoom } from '../redux/actions/roomActions';
import Loader from '../components/Loader';
let socket;
const HomePage = () => {
    const dispatch = useDispatch()
    const { loading, error } = useSelector(state => state.createRoom)
    const [room, setRoom] = useState('');
    const [rooms, setRooms] = useState([]);
    const ENDPT = 'ws://realtimemernapp.herokuapp.com';
    useEffect(() => {
        socket = io(ENDPT);
        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [ENDPT])
    useEffect(() => {
        socket.on('output-rooms', rooms => {
            setRooms(rooms)
        })
    }, [])
    useEffect(() => {
        socket.on('room-created', room => {
            setRooms([...rooms, room])
        })
    }, [rooms])
    useEffect(() => {

    }, [rooms])
    const handleSubmit = e => {
        e.preventDefault();
        dispatch(createRoom({ name: room }, socket))
        setRoom('');
    }
    return (
        <div>
            <Row style={{ justifyContent: 'center', marginTop: '5px' }}>
                <Col xs={10} md={10}>
                    <Card>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <InputGroup className="mb-3">
                                        <FormControl
                                            aria-label="Recipient's username"
                                            aria-describedby="basic-addon2"
                                            placeholder="Enter a room name"
                                            value={room}
                                            onChange={e => setRoom(e.target.value)}
                                        />
                                        <Button variant="outline-primary"
                                            id="button-addon2">
                                            Create Room
                                        </Button>
                                    </InputGroup>
                                    {error && <Alert variant='danger'>{error}</Alert>}
                                    {loading && <Loader />}
                                </Row>
                            </Form>
                        </Card.Body>
                        <RoomList rooms={rooms} />
                    </Card>
                </Col>

            </Row>
        </div >
    )
}
export default HomePage
