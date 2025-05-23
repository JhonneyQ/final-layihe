import React, { useCallback, useContext, useEffect, useState } from "react";
import "./index.scss";
import { AuthContext } from "../../components/authContext";
import { Link } from "react-router-dom";
import axios from "axios";
import { IoMdSettings } from "react-icons/io";
import { IoIosExit } from "react-icons/io";
import { ChatContext } from "../../components/chatContext";
import ChatUsers from "../../components/Chat";
import Potential from "../../components/potentialChat";
import Box from "../../components/box";
import { LuUpload } from "react-icons/lu";


const Profile = () => {
  // const [sort, setSort] = useState("def");
  const [change, setChange] = useState("def");
  const [get, setGet] = useState([]);
  const [userr, setUserr] = useState(null); // ✅ Set initial state to null

  const { user, logoutUser } = useContext(AuthContext);
  const { userChat, userChatLoading, updateCurrentChat } = useContext(ChatContext);
  const [following, setFollowing] = useState([])
  const [followers, setFollowers] = useState([])
  const [allUsers, setAllUsers] = useState([])
  const [fols, setFols] = useState(Number)
  const [foling, setFoling] = useState(Number)






  useEffect(() => {
    const getFollowing = async () => {
      if (get?.followers) {
        setFollowing(get.followers);
      }
    };

    getFollowing()
  }, [get])

  useEffect(() => {
    const getFollowers = async () => {
      if (get?.following) {
        setFollowers(get.following);
      }
    };

    getFollowers()
  }, [get])




  const filter = allUsers.filter((q) => {
    return following.includes(q?._id);
  });
  const filterr = allUsers.filter((q) => {
    return followers.includes(q?._id);
  });











  useEffect(() => {
    if (userr && userr._id) {
      getData();
    }
  }, [userr]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserr(JSON.parse(storedUser));
    }
  }, []);



  const getData = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/user/find/${userr._id}`);
      setGet(res.data);
      setFols(res.data.followers)
      setFoling(res.data.following)
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };



  const foll = async (id) => {
    try {
      const res = await axios.post("http://localhost:8080/api/user/follow", { userId: id, followerId: user?._id })
    } catch (error) {
      console.log(error);

    }


  }

  const unfoll = async (id) => {
    try {
      const res = await axios.post("http://localhost:8080/api/user/unfollow", { userId: id, followerId: user?._id })
    } catch (error) {
      console.log(error);

    }
  }

  const getUser = async () => {
    if (!user?._id) return;


    const res = await axios(`http://localhost:8080/api/user`);

    setAllUsers(res.data)

  };

  useEffect(() => {


    getUser()

  }, [user, foll, unfoll])




  return (
    <section className="profile">
      <div>
        <svg style={{ display: "none" }}>
          <defs>
            <g id="home">
              <path
                fill="#90A4AE"
                d="M42,48H6c-3.3,0-6-2.7-6-6V6c0-3.3,2.7-6,6-6h36c3.3,0,6,2.7,6,6v36C48,45.3,45.3,48,42,48z"
              />
              <path fill="#212121" d="M20.8,35.5v-9.6h6.4v9.6h8V22.7H40L24,8.3L8,22.7h4.8v12.8H20.8z" />
            </g>

            <g id="search">
              <path
                fill="#90A4AE"
                d="M22.9,20.1h-1.5l-0.5-0.5c1.8-2.1,2.9-4.8,2.9-7.7C23.8,5.3,18.5,0,11.9,0S0,5.3,0,11.9s5.3,11.9,11.9,11.9
          c3,0,5.7-1.1,7.7-2.9l0.5,0.5v1.4l9.1,9.1l2.7-2.7L22.9,20.1z M11.9,20.1c-4.5,0-8.2-3.7-8.2-8.2s3.7-8.2,8.2-8.2s8.2,3.7,8.2,8.2
          S16.4,20.1,11.9,20.1z"
              />
            </g>

            {/* <g id="map">
              <path
                fill="#90A4AE"
                d="M16,14.2c-1,0-1.8,0.8-1.8,1.8s0.8,1.8,1.8,1.8c1,0,1.8-0.8,1.8-1.8S17,14.2,16,14.2z M16,0
          C7.2,0,0,7.2,0,16c0,8.8,7.2,16,16,16s16-7.2,16-16C32,7.2,24.8,0,16,0z M19.5,19.5L6.4,25.6l6.1-13.1l13.1-6.1L19.5,19.5z"
              />
            </g> */}

            {/* <g id="planner">
              <path
                fill="#90A4AE"
                d="M28.4,3.6h-1.8V0h-3.6v3.6H8.9V0H5.3v3.6H3.6C1.6,3.6,0,5.1,0,7.1L0,32c0,2,1.6,3.6,3.6,3.6h24.9c2,0,3.6-1.6,3.6-3.6V7.1C32,5.1,30.4,3.6,28.4,3.6z M28.4,32H3.6V12.4h24.9V32z M7.1,16H16v8.9H7.1V16z"
              />
            </g> */}
          </defs>
        </svg>

        <nav className="nav__cont">
          <ul className="nav">
            <li className="nav__items">
              <LuUpload />
              <Link to="/post" >Post</Link>
            </li>

            <li className="nav__items">

              <IoIosExit className="ic" />
              {user && <button onClick={logoutUser}>Logout</button>}

            </li>

            {/* <li className="nav__items">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                <use xlinkHref="#map"></use>
              </svg>
              <a href="/">Map</a>
            </li>

            <li className="nav__items">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 35.6">
                <use xlinkHref="#planner"></use>
              </svg>
              <a href="/">Planner</a>
            </li> */}
          </ul>
        </nav>

      </div>
      <div className="people">
        <div className="potential">
          <Potential />
        </div>
        <div className="chatname">
          {userChat?.length < 1 ? null : (<div className="chatt">
            <div>
              {userChatLoading && <p>Loading chats...</p>}
              {userChat?.map((chat, index) => {


                return (
                  <div key={index} onClick={() => updateCurrentChat(chat)}>
                    <ChatUsers chat={chat} user={userr} className="users" />
                  </div>
                )
              })}
            </div>
          </div>)}
        </div>
      </div>
      <div className="container">
        <div className="all">
          {/* <VideoPlayer />
          <Sidebar>
            <Notifications/>
          </Sidebar> */}

          <div className="prof">
            <div className="pro">
              <div className="nag">
                <img src={get.image} />
                <span>{get.name}</span>
                <div className="count">
                  <div className="nam">
                    <h3>followers</h3>
                    <p>{fols.length}</p>
                  </div>
                  <div className="nam">
                    <h3>following</h3>
                    <p>{foling.length}</p>
                  </div>
                </div>
              </div>
              <p>{get.bio}</p>

            </div>
          </div>
          <div className="add"></div>
          <div className="cardSelect">
            <button onClick={() => setChange("moments")}>Chat</button>
            <button onClick={() => setChange("followers")}>Following</button>
            <button onClick={() => setChange("following")}>Followers</button>
          </div>
          <div className="line"></div>
          <div className="chatbox">
            {userChat?.length < 1 ? null : (<div className="chatt">
              {change === "moments" && <Box className="box" />}
              {change === "followers" &&
                filterr.map((q) => (
                  <div key={q._id} className="followers">
                    <img src={q.image} alt={q.name} />
                    <p>{q.name}</p>
                    {q.followers?.includes(user?._id) ? (
                      <button onClick={() => unfoll(q._id)}>Unfollow</button>
                    ) : (
                      <button onClick={() => foll(q._id)}>Follow</button>
                    )}
                  </div>
                ))}

              {change === "following" &&
                filter.map((q) => (
                  <div key={q._id} className="following">
                    <img src={q.image} alt={q.name} />
                    <p>{q.name}</p>
                    {q.followers?.includes(user?._id) ? (
                      <button onClick={() => unfoll(q._id)}>Unfollow</button>
                    ) : (
                      <button onClick={() => foll(q._id)}>Follow</button>
                    )}
                  </div>
                ))}
            </div>)}
          </div>






          {/* <div className="">
            {change === "moments" && (
              <div className="sort">
                <button onClick={() => setSort("def")}>All</button>
                <button onClick={() => setSort("reels")}>Reels</button>
                <button onClick={() => setSort("posts")}>Post</button>
              </div>
            ) }
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Profile;
