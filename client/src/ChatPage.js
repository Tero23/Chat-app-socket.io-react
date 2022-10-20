import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  ADD_ROOM_MUTATION,
  GET_USERS_QUERY,
  GET_USER_QUERY,
  GET_ROOM_QUERY,
} from "./queries/queries";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const { loading, error, data } = useQuery(GET_USERS_QUERY);

  if (loading) return <p>Loading...</p>;

  console.log(data.users.some((obj) => obj.username === "Tero"));

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      if (data.users.some((obj) => obj.username === username)) {
        socket.emit("join_room", room);
        setShowChat(true);
      } else {
        return <p>Username Not registered!!</p>;
      }
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="Your Name..."
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
