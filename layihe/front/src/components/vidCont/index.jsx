// import React, { createContext, useState, useRef, useEffect, useContext } from 'react';
// import { io } from 'socket.io-client';
// import Peer from 'simple-peer';
// import { AuthContext } from '../authContext';

// export const SocketContext = createContext();

// const ContextProvider = ({ children }) => {
//   const { user } = useContext(AuthContext);
//   const [callAccepted, setCallAccepted] = useState(false);
//   const [callEnded, setCallEnded] = useState(false);
//   const [stream, setStream] = useState(null);
//   const [call, setCall] = useState({});
//   const [me, setMe] = useState('');
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const [socket, setSocket] = useState(null);

//   const myVideo = useRef();
//   const userVideo = useRef();
//   const connectionRef = useRef();

//   // Initialize socket connection
//   useEffect(() => {
//     const newSocket = io('http://localhost:3030');
//     setSocket(newSocket);

//     return () => {
//       newSocket.disconnect();
//     };
//   }, []);

//   // Emit "addNewUser" and listen for online users
//   useEffect(() => {
//     if (!socket) return;

//     socket.emit('addNewUser', user?._id);

//     socket.on('getOnlineUsers', (res) => {
//       setOnlineUsers(res);
//     });

//     return () => {
//       socket.off('getOnlineUsers');
//     };
//   }, [socket]);

//   // Request media devices (only after socket is initialized)
//   useEffect(() => {
//     if (!socket) return;

//     navigator.mediaDevices.getUserMedia({ video: false, audio: true })
//       .then((currentStream) => {
//         setStream(currentStream);
//         if (myVideo.current) {
//           myVideo.current.srcObject = currentStream;
//         }
//       })
//       .catch((error) => {
//         console.error('Error accessing media devices:', error);
//       });

//   }, [socket]); // Added socket as dependency

//   // Listen for socket events
//   useEffect(() => {
//     if (!socket) return;

//     socket.on('me', (id) => {
//       console.log('Socket ID received:', id);
//       setMe(id);
//     });

//     socket.on('callUser', ({ from, signal }) => {
//       console.log('Call received from:', from);
//       setCall({ isReceivingCall: true, from, signal });
//     });

//     return () => {
//       socket.off('me');
//       socket.off('callUser');
//     };
//   }, [socket]);

//   useEffect(() => {
//     if (stream && myVideo.current) {
//       myVideo.current.srcObject = stream;
//     }
//   }, [stream]);

//   const answerCall = () => {
//     if (!socket || !call?.from) {
//       console.error("Socket or call information is missing.");
//       return;
//     }

//     setCallAccepted(true);

//     const peer = new Peer({ initiator: false, trickle: false, stream });

//     peer.on('signal', (data) => {
//       console.log('Answering call with signal:', data);
//       socket.emit('answerCall', { signal: data, to: call.from });
//     });

//     peer.on('stream', (currentStream) => {
//       console.log('Remote stream received');
//       if (userVideo.current) {
//         userVideo.current.srcObject = currentStream;
//       }
//     });

//     peer.signal(call?.signal);
//     connectionRef.current = peer;
//   };

//   const callUser = (id) => {
//     if (!socket) {
//       console.error("Socket is not initialized.");
//       return;
//     }

//     // if (!stream) {
//     //   console.error("Stream is not available yet.");
//     //   return;
//     // }

//     if (!id) {
//       console.error("User ID to call is undefined.");
//       return;
//     }

//     const peer = new Peer({ initiator: true, trickle: false, stream });

//     peer.on('signal', (data) => {
//       console.log('Calling user with signal:', data);
//       socket.emit('callUser', { userToCall: id, signalData: data, from: me });
//     });

//     peer.on('stream', (currentStream) => {
//       console.log('Remote stream received');
//       if (userVideo.current) {
//         userVideo.current.srcObject = currentStream;
//       }
//     });

//     socket.on('callAccepted', (signal) => {
//       console.log('Call accepted with signal:', signal);
//       setCallAccepted(true);
//       peer.signal(signal);
//     });

//     connectionRef.current = peer;
//   };

//   const leaveCall = () => {
//     setCallEnded(true);
//     if (connectionRef.current) {
//       connectionRef.current.destroy();
//       connectionRef.current = null;
//     }
//     window.location.reload();
//   };

//   return (
//     <SocketContext.Provider
//       value={{
//         call,
//         callAccepted,
//         myVideo,
//         userVideo,
//         stream,
//         callEnded,
//         me,
//         callUser,
//         leaveCall,
//         answerCall,
//         socket,
//         onlineUsers,
//       }}
//     >
//       {children}
//     </SocketContext.Provider>
//   );
// };

// export default ContextProvider;
