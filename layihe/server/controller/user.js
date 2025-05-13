const userBlog = require("../model/user");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");



const createToken = (_id, role) => {
    const jwtkey = process.env.JWT_SECRET_KEY;
    return jwt.sign({ _id, role }, jwtkey, { expiresIn: "3d" });
};

const registerUser = async (req, res) => {
    try {
        console.log("Received register request:", req.body); // Debugging Log
        
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        let user = await userBlog.findOne({ email });
        if (user) return res.status(400).json({ message: "User with this email already exists" });

        user = new userBlog({ name, email, password, role });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();

        const token = createToken(user._id, user.role);

        res.status(200).json({ _id: user._id, name, email, role: user.role, token });
    } catch (error) {
        console.error("Error in registerUser:", error); // Log the actual error
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await userBlog.findOne({ email });
        if (!user) return res.status(400).json("Invalid email or password");

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) return res.status(400).json("Invalid email or password");

        const token = createToken(user._id, user.role);

        res.status(200).json({ _id: user._id, name: user.name, email, role: user.role, token });
    } catch (error) {
        res.status(500).json(error);
    }
};

const findUser = async (req, res) => {
    const { userId } = req.params
    try {
        let user = await userBlog.findById(userId)

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
}

const getUsers = async (req, res) => {
    try {
        let users = await userBlog.find()

        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
}


const followUser = async (req, res) => {
    try {
        const { userId } = req.body;
        const { followerId } = req.body;


        if (userId === followerId) {
            return res.status(400).json({ message: "You can't follow yourself!" });
        }

        await userBlog.updateOne(
            { _id: userId },
            { $addToSet: { followers: followerId } }
        );

        await userBlog.updateOne(
            { _id: followerId },
            { $addToSet: { following: userId } }
        );

        res.status(200).json({ message: "User followed successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const unfollowUser = async (req, res) => {
    try {
        const { userId } = req.body;
        const { followerId } = req.body;

        await userBlog.updateOne(
            { _id: userId },
            { $pull: { followers: followerId } }
        );

        await userBlog.updateOne(
            { _id: followerId },
            { $pull: { following: userId } }
        );

        res.status(200).json({ message: "User unfollowed successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const addToFavorites = async (req, res) => {
    try {
        const { userId, reelId } = req.body;

    
        if (!userId || !reelId) {
            return res.status(400).json({ message: "userId and reelId are required" });
        }

     
        const result = await userBlog.updateOne(
            { _id: userId },
            { $addToSet: { favorites: reelId } } 
        );

        

        
        if (result.modifiedCount === 0) {
            return res.status(400).json({ message: "Reel is already in favorites or user not found" });
        }

        return res.status(200).json({ message: "Reel added to favorites successfully" });

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

const delFavorites = async (req, res) => {
    try {
        const { userId, reelId } = req.body;

      
        if (!userId || !reelId) {
            return res.status(400).json({ message: "userId and reelId are required" });
        }

      
        const result = await userBlog.updateOne(
            { _id: userId },
            { $pull: { favorites: reelId } } 
        );

    
        if (result.modifiedCount === 0) {
            return res.status(400).json({ message: "Reel is already in favorites or user not found" });
        }

        return res.status(200).json({ message: "Reel added to favorites successfully" });

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

const addSaved = async (req, res) => {
    try {
        const { userId, reelId } = req.body;

    
        if (!userId || !reelId) {
            return res.status(400).json({ message: "userId and reelId are required" });
        }

     
        const result = await userBlog.updateOne(
            { _id: userId },
            { $addToSet: { saved: reelId } } 
        );

        
        if (result.modifiedCount === 0) {
            return res.status(400).json({ message: "Reel is already in favorites or user not found" });
        }

        return res.status(200).json({ message: "Reel added to favorites successfully" });

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

const delSaved = async (req, res) => {
    try {
        const { userId, reelId } = req.body;

      
        if (!userId || !reelId) {
            return res.status(400).json({ message: "userId and reelId are required" });
        }

      
        const result = await userBlog.updateOne(
            { _id: userId },
            { $pull: { saved: reelId } } 
        );

    
        if (result.modifiedCount === 0) {
            return res.status(400).json({ message: "Reel is already in favorites or user not found" });
        }

        return res.status(200).json({ message: "Reel added to favorites successfully" });

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

const toggleBanStatus = async (req, res) => {
    try {
        const { userId } = req.body;

        // Validate input
        if (!userId) {
            return res.status(400).json({ message: "userId is required" });
        }

        // Find the user
        const user = await userBlog.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Toggle the banned status
        const newBannedStatus = !user.banned; // Flip the current value
        const result = await userBlog.updateOne(
            { _id: userId },
            { $set: { banned: newBannedStatus } }
        );

        if (result.modifiedCount === 0) {
            return res.status(400).json({ message: "No changes were made" });
        }

        return res.status(200).json({
            message: `User ${newBannedStatus ? "banned" : "unbanned"} successfully`,
            banned: newBannedStatus
        });

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

module.exports = {
    registerUser, loginUser, findUser, getUsers, followUser,
    unfollowUser, addToFavorites, delFavorites, addSaved, delSaved, toggleBanStatus
}