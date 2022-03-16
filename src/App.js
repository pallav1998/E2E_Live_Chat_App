import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";
import Button from "@mui/material/Button";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    } else {
      alert("Please Enter the Name and Room Id.");
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="Enter Name..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Enter Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <Button onClick={joinRoom} variant="contained">
            Join A Room
          </Button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
