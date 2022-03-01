import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button, Container, Col, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { updateRoom } from '../redux/actions/roomActions'

const RoomEditPage = () => {
    const { id } = useParams()
    const [name, setName] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateRoom(id, { name }))
        navigate('/admin/rooms')
    }
    return (
        <>
            <Link to='/admin/rooms' className='btn btn-light my-3'>
                Go Back
            </Link>
            <Container>
                <Row className='justify-content-md-center'>
                    <Col xs={12} md={6}>
                        <h1>Edit Room</h1>
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type='name'
                                    placeholder='Enter name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Button type='submit' variant='primary'>
                                Update
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default RoomEditPage