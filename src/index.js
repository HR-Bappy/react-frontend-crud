import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-image-upload/dist/index.css'


ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>

    <App />
    </BrowserRouter>

  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
