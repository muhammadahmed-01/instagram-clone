import { Navigate, Outlet } from 'react-router-dom'
import {UserContext} from "./UserContext";
import {useContext} from "react";

const PrivateRoute = () => {
  const userData = localStorage.getItem("userData");
  // console.log("user = ", user)

  return (
    userData ? <Outlet/> : <Navigate to='/login'/>
  )
}
export default PrivateRoute;
