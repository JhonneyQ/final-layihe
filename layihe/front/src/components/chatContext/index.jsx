import React, { createContext, useCallback, useEffect, useState } from 'react'
import axios from "axios"


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

    const updateCurrentChat = useCallback((chat) => {   
        setCurrentChat(chat)
    }, [])

    
    
    


    const sendTextMessages = useCallback(async (textMessage, sender, currentChatId, setTextMessage) => {
        if (!textMessage) return console.log("it is empty");
        const response = await axios.post(`http://localhost:8080/api/message`, {
            chatId: currentChatId,
            senderId: sender._id,
            text: textMessage

        })

        setNewMessage(response.data)
        setmessages((prev)=> [...prev, response.data])
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
        <ChatContext.Provider value={{ userChat, userChatLoading, createChat, potential, updateCurrentChat, iseMessageLoading, messages, currentChat, sendTextMessages }}>{children}</ChatContext.Provider>
    )
}

export default ChatProv