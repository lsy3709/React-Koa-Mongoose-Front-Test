import EditorContainer from '../containers/write/EditorContainer';
import Responsive from '../components/common/Responsive';
import WriteActionButtonsContainer from '../containers/write/WriteActionButtonsContainer';
import TagBoxContainer from '../containers/write/TagBoxContainer';
import { Helmet } from 'react-helmet-async';

const WritePage = () => {
  return (
    <Responsive>
      <Helmet>
        <title>글 작성하기 - REACTERS</title>
      </Helmet>
      <EditorContainer />
      <TagBoxContainer />
      <WriteActionButtonsContainer />
    </Responsive>
  );
};

export default WritePage;
