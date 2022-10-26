import { useRef, useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignInContext } from "../context/SignInContext";
import { LOGIN_USER_MUTATION } from "../queries/queries";
import { useMutation } from "@apollo/client";
import Cookie from "js-cookie";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();

  const navigate = useNavigate();

  const { username, setUsername, isLoggedIn, setIsLoggedIn } =
    useContext(SignInContext);
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const [loginUser, { error, loading }] = useMutation(LOGIN_USER_MUTATION, {
    variables: {
      username,
      password: pwd,
    },
  });

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    loginUser();
    setPwd("");
  };
  if (Cookie.get().id) setIsLoggedIn(true);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong!</p>;

  return (
    <>
      {isLoggedIn ? (
        navigate("/rooms")
      ) : (
        <section className="register-form-body">
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
            <button>Sign In</button>
          </form>
          <p>
            Need an Account?
            <br />
            <span className="line">
              <Link to="/">Sign Up</Link>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Login;
