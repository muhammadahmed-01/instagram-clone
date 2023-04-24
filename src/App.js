import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from './pages/Login/Login';
import PrivateRoute from './utils/PrivateRoute';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import ProfileForm from './pages/ProfileForm';
import Home from "./pages/Home";
import Search from "./pages/Search";
import UserProvider from "./utils/UserContext"
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications"

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route element={<PrivateRoute/>}>
            <Route path="/" element={<Home/>}/>
            <Route path="/search" element={<Search/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/profile-edit" element={<ProfileForm/>}/>
            <Route path="/messages" element={<Messages/>}/>
            <Route path="/notifications" element={<Notifications/>}/>
          </Route>
          <Route exact path="/signup" element={<Signup/>}/>
          <Route exact path="/login" element={<Login/>}/>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
