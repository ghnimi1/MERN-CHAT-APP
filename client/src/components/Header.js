import React, { useEffect } from 'react';
import { Navbar, NavDropdown, Button, Container, NavLink } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { fetchUser, updateOfflineUser } from "../redux/actions/userActions"

const Header = () => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.user.user)
    useEffect(() => {
        dispatch(fetchUser())
    }, [dispatch, userInfo, navigate, token])
    const Logout = () => {
        dispatch(updateOfflineUser())
        localStorage.removeItem('token')
        navigate('/signin')
    }
    return (
        <div className="App">
            <Navbar collapseOnSelect expand="xl"
                style={{ backgroundColor: 'darkslategrey', color: 'white' }}
                variant="dark">
                <Container>
                    <Link to="/" style={{ textDecoration: 'none' }} >
                        <Navbar.Brand>CHAT-ROOM</Navbar.Brand>
                    </Link>
                    <Navbar.Collapse className="justify-content-end">
                        {!token && (
                            <>
                                <Link to='/signin' >
                                    <Button style={{ marginRight: '2px' }} variant="outline-info">Sign In</Button>
                                </Link>
                                <Link to='/signup'>
                                    <Button variant="outline-info">Sign up</Button>
                                </Link>
                            </>
                        )}
                    </Navbar.Collapse>
                    {token && userInfo.isAdmin === false && (<Navbar.Collapse className="justify-content-end">
                        <NavDropdown title={userInfo?.userName} id='username'>
                            <NavLink>
                                <NavDropdown.Item as={Link} to='/profile'>Profile</NavDropdown.Item>
                            </NavLink>
                            <NavDropdown.Item
                                onClick={() => Logout()}
                            >
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Navbar.Collapse>)}
                    {token && userInfo?.isAdmin && (
                        <NavDropdown title={userInfo?.userName} id='username'>
                            <NavLink>
                                <NavDropdown.Item as={Link} to='/profile'>
                                    Profile
                                </NavDropdown.Item>
                            </NavLink>
                            <NavLink>
                                <NavDropdown.Item as={Link} to='/admin/users' >Users</NavDropdown.Item>
                            </NavLink>
                            <NavLink >
                                <NavDropdown.Item as={Link} to='/admin/rooms'>Rooms</NavDropdown.Item>
                            </NavLink>
                            <NavDropdown.Item
                                onClick={() => Logout()}>
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    )}
                </Container>
            </Navbar>
        </div >
    )
}
export default Header;