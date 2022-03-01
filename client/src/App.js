import { Card, Container } from "react-bootstrap";
import { Route, Routes } from "react-router";
import './App.css'
import Header from "./components/Header";
import ChatPage from "./pages/ChatPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ProtectedRoute from "./ProtectedRoute";
import UsersListPage from "./pages/UsersListPage";
import RoomsListPage from "./pages/RoomsListPage";
import UserEditPage from "./pages/UserEditPage";
import RoomEditPage from "./pages/RoomEditPage";
import ProfileDetails from "./pages/ProfileDetails";

function App() {
  return (
    <Container className='mt-3'>
      <Card style={{
        minHeight: '95vh', position: 'absolute',
        right: '150px', left: '150px',
      }}>
        <Header />
        <Routes>
          <Route exact
            path="/"
            element={<ProtectedRoute component={<HomePage />} />}
          />
          <Route exact
            path="/signup"
            element={<SignUpPage />}
          />
          <Route exact
            path="/signin"
            element={<SignInPage />}
          />
          <Route exact
            path="/admin/users"
            element={<ProtectedRoute component={<UsersListPage />} />}
          />
          <Route exact
            path="/admin/user/:id/edit"
            element={<ProtectedRoute component={<UserEditPage />} />}
          />
          <Route exact
            path="/admin/rooms"
            element={<ProtectedRoute component={<RoomsListPage />} />} />
          <Route exact
            path="/admin/room/:id/edit"
            element={<ProtectedRoute component={<RoomEditPage />} />}
          />
          <Route exact
            path="/chat/:room_id/:room_name"
            element={<ProtectedRoute component={<ChatPage />} />}
          />
          <Route exact
            path="/profile"
            element={<ProtectedRoute component={<ProfilePage />} />}
          />
          <Route exact
            path="/profile/:id"
            element={<ProtectedRoute component={<ProfileDetails />} />}
          />
        </Routes>
      </Card>
    </Container>
  );
}

export default App;
