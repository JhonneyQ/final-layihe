import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../chatContext'
import "./index.scss"

const ChatUsers = ({ chat, user }) => {

  const [recipientUser, setRecipientUser] = useState(null)

  const { onlineUsers } = useContext(ChatContext)

  const recipientId = chat?.members.find((id) => id !== user?._id)

  // console.log(chat);

  const isOnline = onlineUsers?.some((user) => user?.userId === recipientUser?._id)


  useEffect(() => {
    const getUser = async () => {

      if (!recipientId) return null

      const response = await axios(`http://localhost:8080/api/user/find/${recipientId}`)

      setRecipientUser(response.data)

    }

    getUser()
  }, [recipientId])



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





  return (
    <>
      <div className='sidename'>
        <div className='pic'>
          <img src={recipientUser?.image} />
          <div className={isOnline ? "user-online" : "offline"}></div>
        </div>
        <div className='names'>{recipientUser?.name}</div>
        {recipientUser?.followers?.includes(user?._id) ? (
          <button className='fol' onClick={() => unfoll(recipientUser._id)}>Unfollow</button>
        ) : (
          <button className='fol' onClick={() => foll(recipientUser._id)}>Follow</button>
        )}
      </div>
      <div>

      </div>
    </>
  )
}

export default ChatUsers