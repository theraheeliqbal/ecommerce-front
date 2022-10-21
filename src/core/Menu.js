import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'; // Link is like <a href="https://home.com/signin">signin</a>
import { signout, isAuthenticated } from '../auth';
import { useLocation, useNavigate, useParams } from 'react-router-dom'; // instead of WithRouter
// WithRouter is no more available in V6, so we create custom function for WithRouter

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{ location, navigate, params } /* This will be added to DOM props as props.router*/}
            />
        );
    }
    return ComponentWithRouterProp;
}


// <Link className="nav-link" style={isActive(props.router, '/Signup')} to="/Signup">Signup</Link>
// if we are at home.com/signin then it is history and "/Signup" is path to compare which is this page is active right now.
const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: '#ff9900' }
    }
    else {
        return { color: '#ffffff' }
    }

}

// props are properties of current DOM + WithRouter props as we are exporting Menu with WithRouter(Menu) i.e P
const Menu = (props) => {
       
    return (
        <div >
            {/* console.log(props.router.location)
            <Link> will redirect to certain pages
            console.log(props)*/
            }
            <ul className="nav nav-tabs bg-primary" >
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(props.router, '/')} to="/">Home Page</Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" style={isActive(props.router, '/shop')} to="/shop">Shop</Link>
                </li>

                {isAuthenticated() && isAuthenticated().user.role === 0 && (
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(props.router, "/user/dashboard")} to="/user/dashboard"> Dashboard</Link>
                    </li>
                )}
                
                {isAuthenticated() && isAuthenticated().user.role === 1 && (
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(props.router, "/admin/dashboard")} to="/admin/dashboard"> Dashboard</Link>
                    </li>
                )}

                {!isAuthenticated() && (
                    // A common pattern in React is for a component to return multiple elements. 
                    // Fragments let you group a list of children without adding extra nodes (<div>) to the DOM.
                    // <></> is new way to fragment
                    <Fragment>
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive(props.router, '/Signin')} to="/Signin" >Signin</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" style={isActive(props.router, '/Signup')} to="/Signup">Signup</Link>
                        </li>
                    </Fragment>
                )}

                {isAuthenticated() && (
                    <li className="nav-item">
                        <span
                            className="nav-link" style={{ cursor: "pointer", color: "#ffffff" }}
                            onClick={() =>
                                signout(() => {
                                    props.router.navigate("/"); // props.router.navigate() = history.push() due to custom withRouter
                                })
                            }
                        >Signout
                        </span>
                    </li>
                )}

                <li className="nav-item">
                    <Link className="nav-link" style={isActive(props.router, '/Testing')} to="/Testing">Testing</Link>
                </li>

            </ul>
        </div>
    )
}

export default withRouter(Menu); // use custom withRouter function as it is outdated;