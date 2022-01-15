import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  name: String,
  creator: String,
  tags: [String],
  selectedFile: {},
  likes: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: new Date(),
  }
});

const PostContent = mongoose.model('PostContent', postSchema);
export default PostContent;