import { GET_ROOMS_QUERY, LOGOUT_USER_MUTATION } from "../queries/queries";
import { useQuery, useMutation } from "@apollo/client";
import { SignInContext } from "../context/SignInContext";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AddRoom from "../components/AddRoom";
import Cookie from "js-cookie";

const Rooms = () => {
  const { setRoomName } = useContext(SignInContext);
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(SignInContext);
  const {
    error: error2,
    loading: loading2,
    data: data2,
  } = useQuery(GET_ROOMS_QUERY);

  const [logout] = useMutation(LOGOUT_USER_MUTATION);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading2) return <p>Loading...</p>;
  if (error2) return <p>Something went wrong!</p>;

  return (
    <>
      <button onClick={handleLogout}>Logout</button>
      {isLoggedIn ? (
        <div className="roomList">
          <h3>Rooms Available:</h3>
          <ul>
            {data2.getRooms.map((room) => (
              <li key={room.id}>
                <Link
                  to={Cookie.get().id ? "/joinRoom" : "/login"}
                  onClick={setRoomName(room.name)}
                >
                  {room.name}
                </Link>
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
