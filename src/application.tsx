import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { App } from "./layout/App"
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import EventHawkAppReducer from "./reducers/EventHawkAppReducer";

let logger = createLogger();
let store = createStore(EventHawkAppReducer, applyMiddleware(logger));

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>),
    document.getElementById("app")
)