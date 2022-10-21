import { API } from '../config';

export const signup = user => { // name, email, password as an object user
    return fetch(`${API}/signup`, { // "http://localhost:8080/api/signup"
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user) // user is JS ocject, convert to JSON to send
    }) // above whole method is exact like POSTMAN signup
        .then(response => {
            return response.json();
        })
        .catch(err => {
            return err.json();
        });
};

export const signin = user => { // name, email, password as an object user
    return fetch(`${API}/signin`, { // "http://localhost:8080/api/signup"
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user) // user is JS ocject, convert to JSON to send
    }) // above whole method is exact like POSTMAN signup
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};


export const authenticate = (data, next) => { // next is callback function
    // Local storage is the property to browser window object
    // window == 'undefined' means there is no local storage
    if (typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(data));
        next();
    }
};

// Signout does not need a separate page, next() will redirect to some page
export const signout = next => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('jwt');
        next();
        return fetch(`${API}/signout`, {
            method: 'GET'
        })
            .then(response => {
                console.log('Signout: ', response);
            })
            .catch(err => console.log(err));
    }
};

export const isAuthenticated = () => {
    if (typeof window == 'undefined') {
        return false;
    }
    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'));
    } else {
        return false;
    }
};