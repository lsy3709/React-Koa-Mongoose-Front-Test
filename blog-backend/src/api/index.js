import Router from 'koa-router';
import posts from './posts/index.js';

const api = new Router();
//순서2
api.use('/posts', posts.routes());

// module.exports = api;
export default api;
