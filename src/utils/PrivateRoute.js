import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
  const userData = localStorage.getItem("userData");
  // console.log("user = ", user)

  return (
    userData ? <Outlet/> : <Navigate to='/login'/>
  )
}
export default PrivateRoute;
