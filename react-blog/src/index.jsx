import React from 'react';
import ReactDOM from 'react-dom';
import App from './views/app';
import Layout from './components/layout'
import {BrowserRouter,HashRouter} from 'react-router-dom'
ReactDOM.render(
    (
      <BrowserRouter>
        <App />
      </BrowserRouter>
    //   <HashRouter>
    //     <App />
    //   </HashRouter>
    ),
  
    document.getElementById('root')
  )