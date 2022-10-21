import React from "react";
import { Navigate, Outlet} from "react-router-dom";
import { isAuthenticated } from "./index";

const AdminRoute = () => {
    return ( 
        //props.auth ? <Outlet /> : <Navigate to="/Signin" />
        isAuthenticated().user.role  ? <Outlet /> : <Navigate to="/Signin" />
    )
}
export default AdminRoute;