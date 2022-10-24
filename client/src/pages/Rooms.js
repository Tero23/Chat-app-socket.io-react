import { GET_ROOMS_QUERY } from "../queries/queries";
import { useQuery } from "@apollo/client";
import { SignInContext } from "../context/SignInContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Rooms = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(SignInContext);
  const { error, loading, data } = useQuery(GET_ROOMS_QUERY);
  if (loading) return <p>Loading...</p>;
  console.log(data);
  if (error) return <p>Something went wrong!</p>;
  return (
    <>
      {isLoggedIn ? (
        <div>
          <h1>Rooms Available:</h1>
          <ul>
            {data.Rooms.map((room) => (
              <li key={room.id}>{room.name}</li>
            ))}
          </ul>
        </div>
      ) : (
        navigate("/login")
      )}
    </>
  );
};

export default Rooms;
