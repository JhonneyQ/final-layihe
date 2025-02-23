import React, { useContext, useEffect, useState, useRef } from 'react';
import { ChatContext } from '../chatContext';
import axios from 'axios';
import moment from "moment";
import InputEmoji from "react-input-emoji";
import "./index.scss";
import { IoSend } from "react-icons/io5";

const Box = () => {
    const [get, setGet] = useState([]);
    const [userr, setUserr] = useState(null);
    const { userChat, iseMessageLoading, messages, currentChat, sendTextMessages } = useContext(ChatContext);
    const [recipientUser, setRecipientUser] = useState(null);
    const [textMessage, setTextMessage] = useState("");
    const messageContainerRef = useRef(null);


 






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
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const recipientId = currentChat?.members.find((id) => id !== userr?._id);

    useEffect(() => {
        const getUser = async () => {
            if (!recipientId) return null;
            const response = await axios(`http://localhost:8080/api/user/find/${recipientId}`);
            setRecipientUser(response.data);
        };
        getUser();
    }, [recipientId]);

    useEffect(() => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    }, [messages]);

    if (!recipientUser) return <p className='err'>No recipient user found.</p>;
    if (iseMessageLoading) return <p className='err'>Loading chat...</p>;

    return (
        <div className='head'>
            <h3>{recipientUser?.name}</h3>
            
            <div className='message'>
                <div className='message-container' ref={messageContainerRef}>
                    {messages && messages.map((message, index) => (
                        <div key={index} className={`${message?.senderId === userr?._id ? "userr " : "sender"}`}>
                            <img src={message?.senderId === userr?._id ? get.image : ""} style={message?.senderId === userr?._id ? { display: 'block' } : { display: "none" }} />
                            <p>{message.text}</p>
                            <img src={message?.senderId === userr?._id ? "" : recipientUser.image} style={message?.senderId !== userr?._id ? { display: 'block' } : { display: "none" }} />
                            {/* <span>{moment(message.createAt).calendar()}</span> */}
                        </div>
                    ))}
                </div>
                <div className='inp'>
                    <InputEmoji value={textMessage} onChange={setTextMessage} cleanOnEnter="input" />
                    <button
                        type="submit"
                        className="but"
                        onClick={(e) => {
                            e.preventDefault();
                            sendTextMessages(textMessage, userr, currentChat._id);
                            setTextMessage("");
                        }}
                    >
                        <IoSend />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Box;




