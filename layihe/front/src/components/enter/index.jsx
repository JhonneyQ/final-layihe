// import React, { useState, useContext } from 'react';
// import { SocketContext } from '../vidCont';
// import { ChatContext } from '../chatContext';
// import { AuthContext } from '../authContext';






// const Sidebar = ({ children }) => {
//     const { callAccepted, callEnded, leaveCall, callUser, onlineUsers } = useContext(SocketContext);
//     const { currentChat } = useContext(ChatContext);
//     const { user } = useContext(AuthContext);


//     const recipientId = currentChat?.members.find((id) => id !== user?._id)

//     const cal = onlineUsers?.find((q) =>q.userId === recipientId)
  
    
   
    
    
   
    
//     return (
//         < >

//             <div>
//                 {callAccepted && !callEnded ? (
//                     <button  onClick={leaveCall} >
//                         Hang Up
//                     </button>
//                 ) : (
//                     <button  onClick={() => callUser(cal && cal?.socketId)}>
//                         Call
//                     </button>
//                 )}
//             </div>


//             {children}

//         </>
//     );
// };

// export default Sidebar;