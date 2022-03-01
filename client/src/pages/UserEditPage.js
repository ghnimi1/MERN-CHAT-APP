import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button, Container, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSingleUser, updateUser } from '../redux/actions/userActions'

const UserEditPage = () => {
    const { id } = useParams()
    const { user } = useSelector((state) => state.singleUser)
    const [userName, setUserName] = useState(user?.userName)
    const [email, setEmail] = useState(user?.email)
    const [isAdmin, setIsAdmin] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if (!user?.userName || user._id !== id) {
            dispatch(fetchSingleUser(id))
        } else {
            setUserName(user.userName)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
    }, [])
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser(id, { userName, email, isAdmin }))
        navigate('/admin/users')
    }
    return (
        <>
            <Link to='/admin/users' className='btn btn-light my-3'>
                Go Back
            </Link>
            <Container>
                <Row className='justify-content-md-center'>
                    <Col xs={12} md={6}>
                        <h1>Edit User</h1>
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='name'>
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type='name'
                                    placeholder='Enter username'
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='email'>
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    disabled
                                    type='email'
                                    placeholder='Enter email'
                                    value={email}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='isadmin'>
                                <Form.Check
                                    type='checkbox'
                                    label='Is Admin'
                                    checked={isAdmin}
                                    onChange={(e) => setIsAdmin(e.target.checked)}
                                ></Form.Check>
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

export default UserEditPage