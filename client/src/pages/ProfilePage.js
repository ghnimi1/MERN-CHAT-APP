import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser, updateProfile } from '../redux/actions/userActions';

function ProfilePage() {
    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.user.user)
    const [userName, setUserName] = useState(userInfo?.userName)
    const [email, setEmail] = useState(userInfo?.email)
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    useEffect(() => {
        dispatch(fetchUser())
    }, [dispatch, userInfo])
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProfile({ id: userInfo?._id, userName, email, password }))
        setUserName('')
        setPassword('')
        setConfirmPassword('')
    }
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <h2>User Profile </h2>
                {userInfo?.online ? (<div
                    style={{
                        backgroundColor: 'green',
                        width: '10px', height: '10px',
                        borderRadius: '100px'
                    }}>

                </div>) : null}
            </div>
            <Form onSubmit={submitHandler} style={{ width: '80%' }}>
                <Form.Group controlId='name'>
                    <Form.Label>userName</Form.Label>
                    <Form.Control
                        type='name'
                        placeholder='Enter name'
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
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary' style={{ margin: '5px' }}>
                    Update
                </Button>
            </Form>
        </div>
    );
}
export default ProfilePage;