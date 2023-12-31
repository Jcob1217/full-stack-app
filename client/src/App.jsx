import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Navbar from "./pages/Navbar";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <Navbar />
          <div className="page-content">
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/create-post" exact element={<CreatePost />} />
              <Route path="/post/:id" exact element={<Post />} />
              <Route path="/login" exact element={<Login />} />
              <Route path="/register" exact element={<Register />} />
              <Route path="/profile/:id" exact element={<Profile />} />
              <Route path="*" exact element={<PageNotFound />} />
            </Routes>
          </div>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
