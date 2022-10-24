import { useMutation } from "@apollo/client";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { ADD_ROOM_MUTATION } from "./queries/queries";

const AddRoom = () => {
  const [name, setName] = useState("");
  const [addRoom, { error, loading }] = useMutation(ADD_ROOM_MUTATION, {
    variables: {
      name,
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    addRoom();
    Navigate("/chat");
  };
  return (
    <form>
      <h1>Add Room</h1>
      <label>Room Name: </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <button>Add</button>
    </form>
  );
};

export default AddRoom;
