import Router from 'koa-router';
import * as postsCtrl from './posts.ctrl.js';
import checkLoggedIn from '../../lib/checkLoggedIn.js';

const posts = new Router();

posts.get('/', postsCtrl.list);
posts.post('/', checkLoggedIn, postsCtrl.write);

const post = new Router(); // /api/posts/:id
post.get('/', postsCtrl.read);
// 로그인 중인 사용자 작성한 포스트인지 확인. 적용.
post.delete('/', checkLoggedIn, postsCtrl.checkOwnPost, postsCtrl.remove);
post.patch('/', checkLoggedIn, postsCtrl.checkOwnPost, postsCtrl.update);

//변경 .checkObjectId -> getPostById로 변경
posts.use('/:id', postsCtrl.getPostById, post.routes());

// module.exports = posts;
export default posts;
