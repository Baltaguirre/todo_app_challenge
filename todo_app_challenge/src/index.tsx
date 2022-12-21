import React from "react";
import { Provider } from "react-redux";
import reducer from "./redux/store/reducers/index";
import { legacy_createStore as createStore, applyMiddleware  } from "redux";
import thunk from 'redux-thunk'
import ReactDOM from "react-dom";
import App from "./App";

const store = createStore(reducer,applyMiddleware(thunk));
const app = (
  <Provider store={store}>
    <App />
  </Provider>
);
ReactDOM.render(app, document.getElementById("root"));
