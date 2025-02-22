import React, { createContext, useCallback, useEffect, useState } from 'react'
import axios from "axios"
import { io } from "socket.io-client"


export const ChatContext = createContext()

const ChatProv = ({ children, user }) => {

    const [userChat, setUserChat] = useState(null)
    const [userChatLoading, setUserChatLoading] = useState(false)
    const [potential, setPotential] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setmessages] = useState(null)
    const [iseMessageLoading, setiseMessageLoading] = useState(false)
    const [pot, setPot] = useState([])
    const [newMessage, setNewMessage] = useState(null)
    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])


    console.log("onlineUsers", onlineUsers);
    

    useEffect(() => {
        const newSocket = io("http://localhost:3000")
        setSocket(newSocket)

        return () => {
            newSocket.disconnect()
        }
    }, [user])

    useEffect(() => {
        if (socket === null) return
        socket.emit("addNewUser", user?._id)
        socket.on("getonlineUsers", (res)=>{
            setOnlineUsers(res)
        })

        return () => {
            socket.off("getOnlineUsers")
        }
    }, [socket])


    useEffect(() => {
        if (socket === null) return

        const recipientId = currentChat?.members.find((id) => id !== user?._id)

        socket.emit("sendMessage", {...newMessage, recipientId})
        
    }, [newMessage])

    useEffect(() => {
        if (socket === null) return

        socket.on("getMessage", res => {
            if(currentChat?._id !== res.chatId) return

            setmessages((prev) => [...prev, res])
        })

        return () =>{
            socket.off("getMessage")
        }
        
    }, [socket, currentChat])




    useEffect(() => {

        const getUser = async () => {
            if (!user?._id) return;


            const res = await axios(`http://localhost:8080/api/user`);


            const pChat = res.data.filter((u) => {
                let isChatCreated = false;


                if (user._id === u._id) return false;


                if (userChat) {
                    isChatCreated = userChat?.some((chat) => {
                        return chat.members[0] === u._id || chat.members[1] === u._id;
                    });
                }

                return !isChatCreated;
            });


            setPotential(pChat);

            
        };

        getUser()
        
    }, [userChat])

    useEffect(() => {
        const getUserChat = async () => {
            if (!user?._id) return;

            setUserChatLoading(true);
            try {
                const res = await axios.get(`http://localhost:8080/api/chat/${user._id}`);
                setUserChat(res.data);
            } catch (error) {
                console.error("Error fetching user chats:", error);
            }
            setUserChatLoading(false);
        };

        getUserChat();
    }, [user]);








    useEffect(() => {
        const getMessages = async () => {



            setiseMessageLoading(true)
            const res = await axios(`http://localhost:8080/api/message/${currentChat?._id}`)




            setiseMessageLoading(false)
            setmessages(res.data)





        }

        getMessages()


    }, [currentChat])


    // {
    //     userChat?.map((chat, index) => {



    //         return (
    //             <div key={index} onClick={() => setCurrentChat(chat)}>

    //             </div>
    //         )
    //     })
    // }

    const updateCurrentChat = useCallback((chat) => {
        setCurrentChat(chat)


    }, [currentChat])












    const sendTextMessages = useCallback(async (textMessage, sender, currentChatId, setTextMessage) => {
        if (!textMessage) return console.log("it is empty");
        const response = await axios.post(`http://localhost:8080/api/message`, {
            chatId: currentChatId,
            senderId: sender._id,
            text: textMessage

        })

        setNewMessage(response.data)
        setmessages((prev) => [...prev, response.data])
        setTextMessage("")
    }, [])



    const createChat = useCallback(async (firstId, secondId) => {
        const res = await axios.post(`http://localhost:8080/api/chat`, {
            firstId,
            secondId
        })
        setUserChat((prev) => [...prev, res.data])
    }, [])



    return (
        <ChatContext.Provider value={{ userChat, userChatLoading, createChat, potential, updateCurrentChat, iseMessageLoading, messages, currentChat, sendTextMessages , onlineUsers}}>{children}</ChatContext.Provider>
    )
}

export default ChatProv