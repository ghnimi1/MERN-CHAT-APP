import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers, deleteUser } from '../redux/actions/userActions'
import Loader from '../components/Loader'

const UsersListPage = () => {
    const dispatch = useDispatch()
    const { users, loading } = useSelector((state) => state.users)
    const { success } = useSelector(state => state.deleteUser)
    const { success: successUpdate } = useSelector(state => state.updateUser)
    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch, success, successUpdate])
    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(deleteUser(id))
        }
    }
    return (
        <>
            <h1>Users</h1>
            {loading ? (
                <Loader />
            ) : (
                <Table striped bordered hover variant='dark' responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>USERNAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.userName}</td>
                                <td>
                                    <a href={`mailto:${user.email}`}>{user.email}</a>
                                </td>
                                <td>
                                    {user.isAdmin ? (
                                        <i className='fas fa-check' style={{ color: 'green' }}></i>
                                    ) : (
                                        <i className='fas fa-times' style={{ color: 'red' }}></i>
                                    )}
                                </td>
                                <td>
                                    <NavLink to={`/admin/user/${user._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                    </NavLink>
                                    <Button
                                        variant='danger'
                                        className='btn-sm'
                                        onClick={() => deleteHandler(user._id)}
                                    >
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}
export default UsersListPage