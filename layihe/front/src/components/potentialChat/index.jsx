import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../chatContext";
import axios from "axios";
import { AuthContext } from "../authContext";
import "./index.scss"

const Potential = () => {
  const { potential, createChat, onlineUsers } = useContext(ChatContext);
  const [userr, setUserr] = useState(null);
  const [ser, setSer] = useState("")

  const { user } = useContext(AuthContext)





  const searching = potential?.filter((q) => q.name.toLowerCase().trim().includes(ser.toLocaleLowerCase().trim()))





  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserr(JSON.parse(storedUser));
    }
  }, []);



  return (
    <div className="all-users">
      <input placeholder="search user" onChange={(e) => setSer(e.target.value)} />

      {ser !== "" ? <div className="abc">
        {potential && searching.map((u, index) => (
          <div key={index}>

            <div
              className="user"

              onClick={() => createChat(user?._id, u._id)}
            >
              <p> {u.name}</p>


              <div className={onlineUsers?.some((user) => user?.userId === u?._id) ? "user-Online" : "offline"}></div>
            </div>
          </div>

        ))}
      </div> : false}
    </div>
  );
};

export default Potential;
