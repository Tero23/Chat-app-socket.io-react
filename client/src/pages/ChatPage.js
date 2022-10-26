import "../App.css";
import { useState, useContext, useRef, useEffect } from "react";
import { SignInContext } from "../context/SignInContext";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import { JOIN_ROOM_MUTATION } from "../queries/queries";
import { useMutation } from "@apollo/client";

function App() {
  const userRef = useRef();

  const navigate = useNavigate();

  const { username, setUsername, roomName, setRoomName } =
    useContext(SignInContext);
  const [roomPwd, setRoomPwd] = useState("");
  const [joinedRoom, setJoinedRoom] = useState(false);

  console.log(roomName);

  const [joinRoom, { error, loading }] = useMutation(JOIN_ROOM_MUTATION, {
    variables: {
      name: roomName,
      password: roomPwd,
    },
  });

  // useEffect(() => {
  //   userRef.current.focus();
  // }, []);

  if (Cookie.get().roomId) {
    setJoinedRoom(true);
    navigate("/chat");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    joinRoom();
    setRoomPwd("");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong!</p>;

  return (
    <div className="chat-body">
      {!joinedRoom ? (
        <form className="joinChatContainer" onSubmit={handleSubmit}>
          <h3>Join {roomName}</h3>
          {/* <label htmlFor="username">Username:</label>
          <input
            type="text"
            ref={userRef}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
            value={username}
          />
          <label htmlFor="roomName">Room:</label>
          <input
            type="text"
            placeholder="Room Name"
            onChange={(e) => setRoomName(e.target.value)}
            required
            value={roomName}
          /> */}
          <label htmlFor="roomPwd">Password:</label>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setRoomPwd(e.target.value)}
            required
          />
          <button>Join A Room</button>
        </form>
      ) : (
        navigate("/chat")
      )}
    </div>
  );
}

export default App;
