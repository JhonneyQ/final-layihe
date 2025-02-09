const ChampionBlog = require("../model/champions");








const getAllChampions = async (req, res) => {
    try {
      const users = await ChampionBlog.find({});
  
      res.status(200).json({ data: users, message: "success!" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };



  const getChampionsById = async (req, res) => {
    const { id } = req.params;
    try {
      const reel = await ChampionBlog.findById(id);
  
      res.status(200).json({ data: reel, message: "success!" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };


  const deleteChampions = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedReel = await  ChampionBlog.findByIdAndDelete(id);
      res.status(200).json({
        deletedReel,
        message: "deleted successfully!",
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };


  const editChampions = async (req, res) => {
    const { id } = req.params;
  
    try {
      const updatedUser = await ChampionBlog.findByIdAndUpdate(
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



  const postChampions = async (req, res) => {

  
    try {
      const post = ChampionBlog(
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
    getAllChampions,
    getChampionsById,
    deleteChampions,
    postChampions,
    editChampions
  }

 