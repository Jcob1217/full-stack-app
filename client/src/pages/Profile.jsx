import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Profile() {
  let { id } = useParams();
  const [username, setUsername] = useState("");
  const [listOfPosts, setListOfPosts] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/auth/info/${id}`).then((response) => {
      setUsername(response.data.username);
    });

    axios.get(`http://localhost:3001/posts/byUserId/${id}`).then((response) => {
      setListOfPosts(response.data);
    });
  }, []);

  const handleClick = (e, value) => {
    if (!["path", "svg"].includes(e.target.tagName.toLowerCase())) {
      navigate(`/post/${value.id}`);
    }
  };

  return (
    <div className="profilePageContainer">
      <div className="info">
        <h1>{username}'s Posts</h1>
      </div>

      <div className="listOfPosts">
        {listOfPosts.map((value, key) => {
          return (
            <div
              className="post"
              key={key}
              onClick={(e) => {
                handleClick(e, value);
              }}
            >
              <div className="title">{value.title}</div>
              <div className="body">{value.postText}</div>
              <div className="footer">
                {value.username}
                <div className="likes">
                  <label>Likes: {value.Likes.length}</label>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Profile;
