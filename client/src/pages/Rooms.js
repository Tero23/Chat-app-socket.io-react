import { GET_ROOMS_QUERY } from "../queries/queries";
import { useQuery } from "@apollo/client";
import { SignInContext } from "../context/SignInContext";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AddRoom from "../components/AddRoom";

const Rooms = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(SignInContext);
  const { error, loading, data } = useQuery(GET_ROOMS_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong!</p>;
  return (
    <>
      {isLoggedIn ? (
        <div>
          <h3>Rooms Available:</h3>
          <ul>
            {data.getRooms.map((room) => (
              <li key={room.id}>
                <Link to="/chat">{room.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        navigate("/login")
      )}
      <AddRoom />
    </>
  );
};

export default Rooms;
