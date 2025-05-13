const { Server } = require("socket.io");


const io = new Server({
    cors: {
        origin: "http://localhost:5173", // Allow frontend to connect
        methods: ["GET", "POST"],
        
    }
});

let onlineUser = []; // Tracks online users



// Fetch users when server starts





io.on("connection", (socket) => {
    console.log("New connection", socket.id);

    // Retrieve userId from query parameters
    // const userId = socket.handshake.query.userId;

    
   

    // Add user to onlineUsers array if not already present
    socket.on("addNewUser", (userId) => {

        if (!onlineUser.some((user) => user.userId === userId)) {
            onlineUser.push({
                userId,
                socketId: socket.id
            });
            console.log("Online Usersss", onlineUser);
            io.emit("getOnlineUsers", onlineUser);
        }
    });


    // Handle user disconnection
  

    // Video call handlers
    socket.on("callUser", ({ userToCall, signalData, from }) => {
      
      console.log("caller",userToCall);
      
       if(userToCall){
        io.to(userToCall).emit("callUser", { signal: signalData, from });
       }
      
    });

    socket.on("answerCall", (data) => {
        io.to(data.to).emit("callAccepted", data.signal);
    });

    // Send socket ID to client
    socket.emit("me", socket.id);

    socket.on("disconnect", () => {
        onlineUser = onlineUser.filter((user) => user.socketId !== socket.id);
        io.emit("getonlineUsers", onlineUser);
        socket.broadcast.emit("callEnded");
    });
});


io.listen(3030);
