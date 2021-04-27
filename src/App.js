import React, { useEffect, useState } from "react";
import io from "socket.io-client";

function App() {
  const Url = process.env.REACT_APP_API_URL;

  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const setupSocket = () => {
    const newSocket = io(`${Url}`);
    newSocket.on("connect", () => {});
    setSocket(newSocket);
  };

  useEffect(() => {
    setupSocket();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("reqMessage", (data) => {
        setMessages([...messages, data]);
      });
    }
  }, [socket, messages]);

  const handleClick = () => {
    socket.emit("sendMessage", message);
    setMessage("");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-4 pt-4">
          <h5 className="mb-4">Messages</h5>
          <ul className="list-group">
            {messages.map((item, index) => (
              <li className="list-group-item" key={index}>
                {item}
              </li>
            ))}
          </ul>
          <input
            type="text"
            name="message"
            id="message"
            className={`form-control ${messages.length > 0 && "mt-4"}`}
            value={message}
            placeholder="Write your message"
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="button"
            className="btn btn-primary mt-4"
            onClick={handleClick}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
