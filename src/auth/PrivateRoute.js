import React from "react";
import { Navigate, Outlet} from "react-router-dom";
import { isAuthenticated } from "./index";

// https://www.youtube.com/watch?v=7Jk3RE4O2qI
// https://www.youtube.com/watch?v=z5s28GAgB1M
// https://v5.reactrouter.com/web/example/auth-workflow
// How to route back to previous page after logged-in

const PrivateRoute = () => {
    return ( 
        //props.auth ? <Outlet /> : <Navigate to="/Signin" />
        isAuthenticated  ? <Outlet /> : <Navigate to="/Signin" /> // Navigate to="/Signin" should be previous page.
    )
}
export default PrivateRoute;


 