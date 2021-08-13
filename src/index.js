import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

if (module.hot && process.env.NODE_ENV !== 'production') {
  module.hot.accept();
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
