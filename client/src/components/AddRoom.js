import { useMutation } from "@apollo/client";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { ADD_ROOM_MUTATION, GET_ROOMS_QUERY } from "../queries/queries";

const AddRoom = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [addRoom, { error, loading }] = useMutation(ADD_ROOM_MUTATION, {
    variables: {
      name,
      password,
    },
    refetchQueries: [{ query: GET_ROOMS_QUERY }],
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong!</p>;

  const handleSubmit = (e) => {
    e.preventDefault();
    addRoom();
    Navigate("/chat");
  };
  return (
    <form onSubmit={handleSubmit}>
      <h1>Add Room</h1>
      <label>Room Name: </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <label>Password: </label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button>Add</button>
    </form>
  );
};

export default AddRoom;
