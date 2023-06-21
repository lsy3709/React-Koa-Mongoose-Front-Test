import React from 'react';
import { useParams } from 'react-router-dom';

const PostPage = () => {
  const { username, postId } = useParams();
  return (
    <div>
      <h1>포스트 읽기</h1>
      <h4>username : {username}</h4>
      <h4>postId : {postId}</h4>
    </div>
  );
};

export default PostPage;
