import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function Navbar() {
  const { authState, setAuthState } = useContext(AuthContext);
  let navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      username: "",
      id: 0,
      status: false,
    });
    navigate("/login");
  };

  return (
    <div className="navbar">
      {!authState.status ? (
        <div className="right">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      ) : (
        <>
          <div className="left">
            <Link to="/">Home Page</Link>
            <Link to="/create-post">Create A Post</Link>
          </div>
          <div className="right">
            <p>
              Logged in as{" "}
              <Link to={`/profile/${authState.id}`}>{authState.username}</Link>
            </p>
            <Link onClick={logout}>Logout</Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Navbar;
