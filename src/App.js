import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import Signup from './Signup';
import Profile from './Profile';
import ProfileForm from './ProfileForm';
import Home from "./Home";
import Search from "./Search";
import UserProvider from "./UserContext"
import Messages from "./pages/Messages/Messages";


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
          </Route>
          <Route path="/messages" element={<Messages/>}/>
          <Route exact path="/signup" element={<Signup/>}/>
          <Route exact path="/login" element={<Login/>}/>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
