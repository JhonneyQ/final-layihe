// import React, { useContext } from 'react';
// import { SocketContext } from '../vidCont';


// const Notifications = () => {
//   const { answerCall, call, callAccepted } = useContext(SocketContext);

//   console.log("call",call);
  

//   return (
//     <>
//       <h3>hi</h3>
//       {call.isReceivingCall && !callAccepted && (
//         <div style={{ display: 'flex', justifyContent: 'space-around' }}>
//           {/* <h1>{call.name} is calling:</h1> */}
//           <button  onClick={answerCall}>
//             Answer
//           </button>
//         </div>
//       )}
//     </>
//   );
// };

// export default Notifications;