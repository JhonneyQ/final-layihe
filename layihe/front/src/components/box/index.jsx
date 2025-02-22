import React, { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../chatContext';
import axios from 'axios';
import moment from "moment"
import InputEmoji from "react-input-emoji"
import "./index.scss"
import { IoSend } from "react-icons/io5";

const Box = () => {

    const [get, setGet] = useState([]);
    const [userr, setUserr] = useState(null);
    const { userChat, iseMessageLoading, messages, currentChat, sendTextMessages } = useContext(ChatContext)
    const [recipientUser, setRecipientUser] = useState(null)
    const [textMessage, setTextMessage] = useState("")

    // const [sub, setSub] = useState("");

    // const handleSubmit = (e) => {
    //     e.preventDefault(); // Prevent page refresh
    //     console.log("Message Sent:", sub);
    //     setSub(""); // Clear input field
    // };

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







    const recipientId = currentChat?.members.find((id) => id !== userr?._id)

    // console.log(recipientId);







    useEffect(() => {
        const getUser = async () => {

            if (!recipientId) return null

            const response = await axios(`http://localhost:8080/api/user/find/${recipientId}`)

            setRecipientUser(response.data)

        }

        getUser()
    }, [recipientId])

    if (!recipientUser) return (<p className='err'>no validation </p>)

    if (iseMessageLoading) return (<p className='err'> loading chat </p>)




    return (
        <div>


            <div className='head'>
                <h3>{recipientUser?.name}</h3>
                <div className='message'>
                    {messages && messages.map((message, index) => (<div key={index} className={`${message?.senderId === userr?._id ? "message-self " : ""}`}>
                        <span>{message.text}</span>
                        {/* <span>{moment(message.createAt).calendar()}</span> */}
                    </div>))}
                    <div className='inp'>

                        <InputEmoji value={textMessage} onChange={setTextMessage} />
                        <button
                            type="submit"
                            className="but"
                            onClick={(e) => {
                                e.preventDefault(); // Prevent any unintended default behavior
                                sendTextMessages(textMessage, userr, currentChat._id, sendTextMessages);
                                setTextMessage(""); // Clear input field after sending
                            }}
                        >
                            <IoSend />
                        </button>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default Box