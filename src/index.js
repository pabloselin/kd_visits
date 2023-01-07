import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import VisitsApp from './VisitsApp';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('visits_app'));
const siteID = document.getElementById('visits_app').dataset.siteid;
root.render(
  <React.StrictMode>
    <VisitsApp siteid={siteID} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
