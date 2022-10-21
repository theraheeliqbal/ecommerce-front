import React, {useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// BrowserRouter will wrap rest of the application/routes
// Props are also accessible through BrowserRouter e.g. home.com/userID:12489 , userID:12489 is props
// NOTE: Switch doesn't work in v6, replaced with Routes and element instead component

import Signup from './user/Signup';
import Signin from './user/Signin';
import Home from './core/Home';
import Testing from './user/Testing'
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import Dashboard from './user/UserDashboard';
import AdminDashboard from './user/AdminDashboard';
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct'
import Shop from './core/Shop';

// AllRoutes returns ent application becau entire application is based on components
const AllRoutes = () => {
    //const { user: { _id, name, email, role } } = isAuthenticated(); // nested destructure
    
    return (
        <BrowserRouter> {/* browserRouter instead of <div> to wrap all the routes*/}
            <Routes>
                <Route path="/"         element={<Home />} /> {/* element is react component */}
                <Route path="/Signup"   element={<Signup />} />
                <Route path="/Signin"   element={<Signin />} />
                <Route path="/shop"   element={<Shop />} />
                
                <Route element={<PrivateRoute />}> 
                    <Route path="/user/dashboard"   element={<Dashboard />} />
                </Route>

                <Route element={<AdminRoute />} > 
                    <Route path="/admin/dashboard"   element={<AdminDashboard />} />
                    <Route path="/create/category"   element={<AddCategory />} />
                    <Route path="/create/product"   element={<AddProduct />} />
                    <Route path="/Testing"   element={<Testing />} />
                </Route>

            </Routes>
        </BrowserRouter>
    );
};

export default AllRoutes;