import React, { useState } from 'react';
import { Navigate, Link } from "react-router-dom";
import Layout from "../core/Layout";
import { signin, authenticate, isAuthenticated } from "../auth";

const Signin = () => {
    const [values, setValues] = useState({
        email: "theraheeliqbal@gmail.com",
        password: "abc123",
        error: '',
        loading: false,
        redirectToReferrer: false
    });

    const { email, password, loading, error, redirectToReferrer } = values;

    const { user } = isAuthenticated(); // take users information from local storage


    const handleChange = param => event => {
        setValues({ ...values, error: '', [param]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: '', loading: true, redirectToReferrer: false });

        signin({ email, password }).then(data => {
            if (data.err) {
                setValues({ ...values, error: data.err, loading: false, redirectToReferrer: false });
            }
            else { //authenticate need 2 aurgument (data, callback), // to save data/users information at local storage
                authenticate(data, () => {  // this call back function is next() in authenticate()
                    setValues({ ...values, redirectToReferrer: true });
                });
            }
        });

    };

    const signInForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input
                    onChange={handleChange("email")}
                    type="email"
                    className="form-control"
                    value={email}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input
                    onChange={handleChange("password")}
                    type="password"
                    className="form-control"
                    value={password}
                />
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">
                Submit
            </button>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : "none" }}>
            {error}
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-info">
                <h2>Loading...</h2>
            </div>
        );

    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user && user.role === 1) {
                return <Navigate to="/admin/dashboard" />;
            } else {
                return <Navigate to="/user/dashboard" />;

            }
        }
        if(isAuthenticated()) {
            return <Navigate to="/" />;
        }
    }

    return (
        <Layout
            title="Signin"
            description="Signin to Node React E-commerce App"
            className="container container-fluid col-md-8 offset-md-2"
        >
            {showLoading()}
            {showError()}
            {signInForm()}
            <hr style={{ clear: 'both', visibility: 'hidden' }} />
            {redirectUser()}
        </Layout>
    );
};

export default Signin;