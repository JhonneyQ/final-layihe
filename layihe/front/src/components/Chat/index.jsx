import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ChatUsers = ({ chat, user }) => {

  const [recipientUser, setRecipientUser] = useState(null)

  const recipientId = chat?.members.find((id) => id !== user?._id)
  // console.log(chat);
 
  

  useEffect(() => {
    const getUser = async () => {

      if (!recipientId) return null

      const response = await axios(`http://localhost:8080/api/user/find/${recipientId}`)

      setRecipientUser(response.data)

    }

    getUser()
  }, [recipientId])
  
  

  

  return (
    <>
      <div className='sidename'>
        <div className='names'>{recipientUser?.name}</div>
        <div className='text'>text message</div>
      </div>
      <div>

      </div>
    </>
  )
}

export default ChatUsers