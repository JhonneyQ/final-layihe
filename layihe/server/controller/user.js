const userBlog = require("../model/user");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");



const createToken = (_id) => {
    const jwtkey = process.env.JWT_SECRET_KEY

    return jwt.sign({ _id }, jwtkey, { expiresIn: "3d" })
}

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let user = await userBlog.findOne({ email })

        if (user) return res.status(400).json("User with this email already exist")

        user = new userBlog({ name, email, password })
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
        await user.save()

        const token = createToken(user._id)

        res.status(200).json({ _id: user._id, name, email, token })
    } catch (error) {
        res.status(500).json(error)
    }

}

const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        let user = await userBlog.findOne({ email })
        if (!user) return res.status(400).json("Invalid email or password")

        const isValidPassword = await bcrypt.compare(password, user.password)

        if (!isValidPassword) return res.status(400).json("Invalid email or password")
        const token = createToken(user._id)

        res.status(200).json({ _id: user._id, name: user.name, email, token })
    } catch (error) {
        res.status(500).json(error)
    }
}

const findUser = async (req,res) => {
    const {userId} = req.params
    try {
        let user = await userBlog.findById(userId)

        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
}

const getUsers = async (req,res) => {
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


const update = async (req, res) => {
  try {
      const { userId } = req.body;

      await userBlog.updateOne(
          { _id: userId },

      );



      res.status(200).json({ message: "User unfollowed successfully!" });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

module.exports = { registerUser, loginUser, findUser, getUsers,followUser,
    unfollowUser, update}