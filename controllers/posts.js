import PostContent from "../models/postContent.js"
import mongoose from 'mongoose'

export const getPost = async (req, res) => {
  try {
    const postContent = await PostConpostContent.find()

    res.status(200).json(postContent)
  } catch (error) {
    res.status(404).json({message: error.meesage})
  }
}

export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new PostContent({...post, creator: req.userId, createdAt: new Date().toISOString()})

  try {
    await newPost.save()

    res.status(201).json(newPost)
  } catch (error) {
    res.status(409).json({message: error.meesage})
  }
}

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')
  
  const updatePost = await PostContent.findByIdAndUpdate(_id, {...post, _id}, { new: true })
  
  res.json(updatePost)
}

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');
  
  await PostContent.findByIdAndRemove(id);

  res.json({ message: 'post deleted successfully' });
}

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) return res.json({ message: "Unauthenticated" });

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

  const post = await PostContent.findById(id);

  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const updatedPost = await PostContent.findByIdAndUpdate(id, post, { new: true });
  
  res.json(updatedPost)
}