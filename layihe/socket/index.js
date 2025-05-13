const { Server } = require("socket.io");
const axios = require("axios");

const io = new Server({
    cors: {
        origin: "http://localhost:5173", // Allow frontend to connect
        methods: ["GET", "POST"],
        
    }
});

let onlineUser = []; // Tracks online users





io.on("connection", (socket) => {
    console.log("New connection", socket.id);

    // const userId = socket.handshake.query.id;






    // Add new user to the online user list
    socket.on("addNewUser", (userId) => {



        if (!onlineUser.some((user) => user.userId === userId)) {
            onlineUser.push({
                userId,
                socketId: socket.id
            });
            console.log("Online Users", onlineUser);
            io.emit("getonlineUsers", onlineUser);
        }
    });

    // Handle sending messages
    socket.on("sendMessage", (message) => {
        const user = onlineUser.find((user) => user.userId === message.recipientId);
        if (user) {
            io.to(user.socketId).emit("getMessage", message);
        }
    });
    socket.on("disconnect", () => {
        onlineUser = onlineUser.filter((user) => user.socketId !== socket.id);
        io.emit("getonlineUsers", onlineUser);
        socket.broadcast.emit("callEnded")
    });

    socket.on("callUser", ({ userToCall, signalData, from }) => {



        io.to(userToCall).emit("callUser", { signal: signalData, from });

    });

    socket.on("answerCall", (data) => {
        io.to(data.to).emit("callAccepted", data.signal)
    });

    socket.emit("me", socket.id);

    // Handle disconnections





});

io.listen(3000);
