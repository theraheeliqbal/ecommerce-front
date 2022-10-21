import React from 'react';
import ReactDOM from 'react-dom';
//import App from './App';
import AllRoutes from './Routes';


// instead of rendering app we will render routes

ReactDOM.render(
  <React.StrictMode>
    <AllRoutes />
  </React.StrictMode>,
  document.getElementById('root')
);
