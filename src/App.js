import React from "react";
import { Provider } from "react-redux";
import Route from "./configs/router/MainRoute";
import store from "./configs/redux/store";

import "./assets/css/auth.css";
import "./assets/css/chat.css";

function App() {
  return (
    <Provider store={store}>
      <Route />
    </Provider>
  );
}

export default App;
