const ReelBlog = require("../model/reels");






const getAllReels = async (req, res) => {
    try {
      const users = await ReelBlog.find({});
  
      res.status(200).json({ data: users, message: "success!" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };



  const getReelsById = async (req, res) => {
    const { id } = req.params;
    try {
      const reel = await ReelBlog.findById(id);
  
      res.status(200).json({ data: reel, message: "success!" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };


  const deleteReels = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedReel = await  ReelBlog.findByIdAndDelete(id);
      res.status(200).json({
        deletedReel,
        message: "deleted successfully!",
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };


  const editReels = async (req, res) => {
    const { id } = req.params;
  
    try {
      const updatedUser = await ReelBlog.findByIdAndUpdate(
        id,
        {
          ...req.body,
        },
        {
          new: true,
        }
      );
  
      res.status(200).json({
        message: "updated successfully!",
        updatedUser,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };



  const postReel = async (req, res) => {

  
    try {
      const post = ReelBlog(
        {
          ...req.body
        }
      );

      await post.save()

  
      res.status(200).json({
        message: "updated successfully!",
        post,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  module.exports = {
    getAllReels,
    getReelsById,
    deleteReels,
    postReel,
    editReels
  }