import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../chatContext";
import axios from "axios";

const Potential = () => {
  const { potential, createChat } = useContext(ChatContext);
  const [userr, setUserr] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserr(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="all-users">
      {potential.map((u, index) => (
        <div
          className="user"
          key={index}
          onClick={() => createChat(userr._id, u._id)}
        >
          {u.name}
        </div>
      ))}
    </div>
  );
};

export default Potential;
