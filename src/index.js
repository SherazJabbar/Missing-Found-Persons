import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import "./index.css";
import App from "./app/Layout/App";
import {Provider} from 'react-redux';
import {configureStore} from './app/store/configureStore';
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

const rootEl = document.getElementById("root");
const store= configureStore();

function render() {
  ReactDOM.render(
    <Provider store={store}>
       <BrowserRouter>
      <App />
    </BrowserRouter>
    </Provider>
   ,

    rootEl
  );
}

if (module.hot) {
  module.hot.accept("./app/Layout/App", function () {
    setTimeout(render);
  });
}

render();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
