import mongoose from 'mongoose';

const { Schema } = mongoose;

const PostSchema = new Schema({
  title: String,
  body: String,
  tags: [String], // 문자열로 구성된 배열
  publishedDate: {
    type: Date,
    default: Date.now, // 현재 날짜를 기본값
  },
});

const Post = mongoose.model('Post', PostSchema);
export default Post;
