import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../chatContext";
import axios from "axios";
import { AuthContext } from "../authContext";
import "./index.scss"

const Potential = () => {
  const { potential, createChat, onlineUsers } = useContext(ChatContext);
  const [userr, setUserr] = useState(null);

  const { user } = useContext(AuthContext)










  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserr(JSON.parse(storedUser));
    }
  }, []);



  return (
    <div className="all-users">

      {potential && potential.map((u, index) => (
        <div>

          <div
            className="user"
            key={index}
            onClick={() => createChat(user?._id, u._id)}
          >
            <p> {u.name}</p>
  

            <div className={onlineUsers?.some((user) => user?.userId === u?._id) ? "user-Online" : "offline"}></div>
          </div>
        </div>

      ))}
    </div>
  );
};

export default Potential;
