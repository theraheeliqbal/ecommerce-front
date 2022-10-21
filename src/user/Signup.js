import React, { useState } from 'react';
import Layout from '../core/Layout';
import { Link } from 'react-router-dom';
import { signup } from '../auth'; //../auth/index.js

const Signup = () => {
    
    // const [name, setName] = useState('');
    // const [email, setemail] = useState('');
    // for multiple useState...as following
    const [values, setValues] = useState({
        name: 'Raheel Iqbal',
        email: 'theraheeliqbal@gmail.com',
        password: 'abc123',
        error: '',
        success: false
    });

     // * destructure all value to use in clickSubmit function to send then to backend 
    const { name, email, password, success, error } = values;

    const handleChange = param => event => { // Param could be name/email/password
        setValues({ ...values, error: '', [param]: event.target.value });
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error: ''});
        //signup(name, email, password); // * destructure values used
        // pass then as object {name: name, email: email, password: password}
        // key and value are same to just name, email, password
        
        signup({ name, email, password }).then(data => { // ,then can be moved to signup
            if (data.errors) {
                setValues({ ...values, error: data.errors, success: false });
            }
            else {
                setValues({
                    ...values,
                    name: '',
                    email: '',  
                    password: '',
                    error: '',
                    success: true
                });
            }
        });

    }

    const signUpForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input 
                    onChange={handleChange('name')} 
                    type="text" 
                    className="form-control" 
                    value={name} 
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input 
                    onChange={handleChange('email')}
                    type="email"
                    className="form-control"
                    value={email}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input
                    onChange={handleChange('password')}
                    type="password"
                    className="form-control"
                    value={password}
                />
            </div>
            
            <button onClick={clickSubmit} className="btn btn-primary"> {/* when button is click send data to the backend/server */}
                Submit
            </button>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {`Signup Failed: ${error}`}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
            New account is created. Please <Link to="/Signin">Signin</Link>
        </div>
    );

    return (
        <Layout title="Signup" description="Signup to React" className="container container-fluid col-md-8 offset-md-2">
            {showSuccess()}
            {showError()}
            {signUpForm()}
            {/* JSON.stringify(values)} { /* when there is change we can see data in live */ }
        </Layout>
    );
};

export default Signup;