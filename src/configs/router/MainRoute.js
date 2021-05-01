import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import io from "socket.io-client";

import PublicRoute from "./module/PublicRoute";
import PrivateRoute from "./module/PrivateRoute";

import Login from "../../pages/Login";
import Register from "../../pages/Register";
import ForgotPassword from "../../pages/ForgotPassword";
import Chat from "../../pages/Chat";

function App() {
  const [socket, setSocket] = useState(null);

  const setupSocket = () => {
    const newSocket = io("http://localhost:8080");
    setSocket(newSocket);
  };

  useEffect(() => {
    setupSocket();
  }, []);

  return (
    <Router>
      <Switch>
        <PublicRoute exact path="/" component={Login} />
        <PublicRoute path="/register" component={Register} />
        <PublicRoute path="/forgot-password" component={ForgotPassword} />
        <PrivateRoute path="/chat" component={Chat} socket={socket} />
      </Switch>
    </Router>
  );
}

export default App;
