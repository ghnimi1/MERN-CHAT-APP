import React, { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRooms, deleteRoom } from '../redux/actions/roomActions'
import Loader from '../components/Loader'

const RoomsListPage = () => {
    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.user.user)
    const { rooms, loading } = useSelector((state) => state.rooms)
    const { success } = useSelector(state => state.deleteRoom)
    const { success: successUpdate } = useSelector(state => state.updateRoom)
    useEffect(() => {
        dispatch(fetchRooms())
    }, [dispatch, success, successUpdate])
    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(deleteRoom(id))
        }
    }
    return (
        <>
            <h1>Rooms</h1>
            {loading ? (
                <Loader />
            ) : (
                <Table striped bordered hover variant='dark' responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {rooms?.map((room) => (
                            <tr key={room._id}>
                                <td>{room._id}</td>
                                <td>{room.name}</td>
                                <td>
                                    <NavLink to={`/admin/room/${room._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                    </NavLink>
                                    <Button
                                        variant='danger'
                                        className='btn-sm'
                                        onClick={() => deleteHandler(room._id)}
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

export default RoomsListPage