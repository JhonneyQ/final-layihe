import React, { useContext, useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./index.scss";
import { AuthContext } from "../../components/authContext";
import { ChatContext } from "../../components/chatContext";

const Rprofile = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { userChat } = useContext(ChatContext);

  const [get, setGet] = useState(null);
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [change, setChange] = useState("def");

  console.log(get, "get");

  // Fetch user profile data
  const getData = useCallback(async () => {
    if (!id) return;
    try {
      const res = await axios.get(`http://localhost:8080/api/user/find/${id}`);
      setGet(res.data);
      setFollowing(res.data.following || []);
      setFollowers(res.data.followers || []);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, [id]);

  useEffect(() => {
    getData();
  }, [id, getData]);

  // Fetch all users
  useEffect(() => {
    const getUserList = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/user");
        setAllUsers(res.data);
      } catch (error) {
        console.error("Error fetching all users:", error);
      }
    };

    getUserList();
  }, []);

  // Filter users
  const followingUsers = allUsers.filter((q) => following.includes(q?._id));
  const followersUsers = allUsers.filter((q) => followers.includes(q?._id));

  // Follow a user
  const foll = async () => {
    try {
      await axios.post("http://localhost:8080/api/user/follow", {
        userId: get?._id,
        followerId: user?._id,
      });

      // Update state instead of refetching
      setFollowers((prev) => [...prev, user?._id]);
    } catch (error) {
      console.log(error);
    }
  };

  // Unfollow a user
  const unfoll = async () => {
    try {
      await axios.post("http://localhost:8080/api/user/unfollow", {
        userId: get?._id,
        followerId: user?._id,
      });

      // Update state instead of refetching
      setFollowers((prev) => prev.filter((id) => id !== user?._id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="profile">
      <div className="container">
        <div className="all">
          <div className="prof">
            <div className="pro">
              <div className="nag">
                {get?.image && <img src={get.image} alt={get?.name} />}
                <span>{get?.name || "User Not Found"}</span>
                <div className="count">
                  <div className="nam">
                    <h3>Followers</h3>
                    <p>{followers.length}</p>
                  </div>
                  <div className="nam">
                    <h3>Following</h3>
                    <p>{following.length}</p>
                  </div>
                  {followers.includes(user?._id) ? (
                    <button className="followF" onClick={unfoll}>Unfollow</button>
                  ) : (
                    <button className="followF" onClick={foll}>Follow</button>
                  )}
                </div>
              </div>
              <p>{get?.bio || "No bio available"}</p>
            </div>
          </div>

          <div className="cardSelect">
            <button onClick={() => setChange("followers")}>Followers</button>
            <button onClick={() => setChange("following")}>Following</button>
          </div>
          <div className="line"></div>

          <div className="chatbox">
            {userChat?.length > 0 && (
              <div className="chatt">
                {change === "followers" &&
                  followersUsers.map((q) => (
                    <div key={q._id} className="followers">
                      <img src={q.image} alt={q.name} />
                      <p>{q.name}</p>
                    </div>
                  ))}

                {change === "following" &&
                  followingUsers.map((q) => (
                    <div key={q._id} className="following">
                      <img src={q.image} alt={q.name} />
                      <p>{q.name}</p>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rprofile;
