import HeaderContainer from '../containers/common/HeaderContainer';
import PostViewr from '../components/post/PostViewr';
import { useParams } from 'react-router-dom';

const PostPage = () => {
  const { username, postId } = useParams();
  return (
    <>
      <HeaderContainer />
      <PostViewr />
    </>
  );
};

export default PostPage;
