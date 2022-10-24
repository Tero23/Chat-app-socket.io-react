import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found">
      <FaExclamationTriangle size="5em" />
      <h1>404</h1>
      <p>Sorry, this page does not exist!</p>
      <Link to="/">Go Back</Link>
    </div>
  );
};

export default NotFound;