import React, { useEffect } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import moment from "moment"
import { useParams } from 'react-router';
import { fetchSingleUser } from '../redux/actions/userActions';
function ProfileDetails() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const { user } = useSelector((state) => state.singleUser)
    useEffect(() => {
        dispatch(fetchSingleUser(id))
    }, [dispatch])
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
                {user?.online === true ? (<div
                    style={{
                        backgroundColor: 'green',
                        width: '10px', height: '10px',
                        borderRadius: '100px'
                    }}>
                </div>
                ) : (
                    < span style={{ color: '#898585', marginLeft: '5px' }}>
                        Vu : {moment(user?.lastSeen).startOf('minute').fromNow()}
                    </span>
                )}
            </div>
            <Form style={{ width: '80%' }}>
                <Form.Group controlId='name'>
                    <Form.Label>userName</Form.Label>
                    <Form.Control
                        disabled
                        type='name'
                        placeholder='Enter name'
                        value={user?.userName}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        disabled
                        type='email'
                        placeholder='Enter email'
                        value={user?.email}
                    ></Form.Control>
                </Form.Group>
            </Form>
        </div>
    );
}

export default ProfileDetails;