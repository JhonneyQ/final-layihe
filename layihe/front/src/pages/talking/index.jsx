// import React, { useContext, useEffect, useRef } from 'react';
// import { SocketContext } from '../../components/vidCont';
// import "./index.scss"

// const VideoPlayer = () => {
//   const { callAccepted, myVideo, userVideo, callEnded, stream } = useContext(SocketContext);
  
//   // Refs for videos

//   // Assign stream to video element
//   // useEffect(() => {
//   //   if (myVideoRef.current && stream) {
//   //     myVideoRef.current.srcObject = stream;
//   //   }
//   // }, [stream]);

//   // useEffect(() => {
//   //   if (userVideoRef.current && call?.stream) {
//   //     userVideoRef.current.srcObject = call.stream;
//   //   }
//   // }, [call]);

//   return (
//     <div>
//       {/* My Video */}
//       {stream && (
//         <div>
//           <video ref={myVideo} muted autoPlay playsInline className='vid'  />
//         </div>
//       )}

//       {/* User's Video */}
//       {callAccepted && !callEnded && (
//         <div>
//           <video ref={userVideo} autoPlay playsInline className='vid'  />
//         </div>
//       )}
//     </div>
//   );
// };

// export default VideoPlayer;
