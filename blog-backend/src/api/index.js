const Router = require('koa-router');
const api = new Router();

//순서1
const posts = require('./posts');
//순서2
api.use('/posts', posts.routes());

//라우터 내보내기.
module.exports = api;
