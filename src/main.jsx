import React from "react";
import ReactDOM from 'react-dom/client'
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store";
import "react-bootstrap-typeahead/css/Typeahead.css";
import 'react-loading-skeleton/dist/skeleton.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
)