import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import axios from "axios";
import camelcaseKeys from 'camelcase-keys'

// Set axios default endpoint
axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;

// snake to camel
axios.interceptors.response.use(
  response => {
    const { data } = response;

    if(data.data) {
      const convertedData = camelcaseKeys(data.data);
      return { ...response, data: {...data, data: convertedData} };
    } else {
      const convertedData = camelcaseKeys(data);
      return { ...response, data: convertedData};
    }

  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
