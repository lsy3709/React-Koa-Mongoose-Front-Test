import Post from '../../models/post.js';
import mongoose from 'mongoose';
import Joi from 'joi';
//추가
import sanitizeHtml from 'sanitize-html';

const { ObjectId } = mongoose.Types;

//HTML 허용할 태그 목록
//추가
const sanitizeOption = {
  allowedTags: [
    'h1',
    'h2',
    'b',
    'i',
    'u',
    's',
    'p',
    'ul',
    'ol',
    'li',
    'blockquote',
    'a',
    'img',
  ],
  allowedAttributes: {
    a: ['href', 'name', 'target'],
    img: ['src'],
    li: ['class'],
  },
  allowedSchemes: ['data', 'http'],
};

// 로그인 중인 사용자가 작성한 포스트인지 확인.
export const checkOwnPost = (ctx, next) => {
  const { user, post } = ctx.state;
  if (post.user._id.toString() !== user._id) {
    ctx.status = 403;
    return;
  }
  return next();
};

//기존 만들었던 checkObjectId -> getPostById로 변경
export const getPostById = async (ctx, next) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400; //Bad Request
    return;
  }
  try {
    const post = await Post.findById(id);
    if (!post) {
      ctx.status = 404; // not found
      return;
    }
    ctx.state.post = post;
    return next();
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
게시글 샘플 
{
    title:'제목',
    body:'내용',
    tags: ['태그1','태그2']
}
*/
export const write = async (ctx) => {
  //검증 추가
  const schema = Joi.object().keys({
    title: Joi.string().required(), // required() 있으면 필수 검사 항목
    body: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(),
  });

  //실패시
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { title, body, tags } = ctx.request.body;

  const post = new Post({
    title,
    //수정
    body: sanitizeHtml(body, sanitizeOption),
    tags,
    // 포스트에 유저추가
    user: ctx.state.user,
  });
  try {
    await post.save();
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};
// html 없애고 내용이 길면 200자 제한하는 함수
const removeHtmlAndShorten = (body) => {
  const filtered = sanitizeHtml(body, {
    allowedTags: [],
  });
  return filtered.length < 200 ? filtered : `${filtered.slice(0, 200)}...`;
};

export const list = async (ctx) => {
  //query 문자열 -> 숫자 변환 필요.
  // 값없으면 1을 기본.

  // 2번 파라미터 10진법 의미
  const page = parseInt(ctx.query.page || '1', 10);

  if (page < 1) {
    ctx.status = 400;
    return;
  }

  //사용자, 태그로 필터링
  const { tag, username } = ctx.query;
  // 사용자, 태그 값이 유효시 객체에 넣기.
  const query = {
    ...(username ? { 'user.username': username } : {}),
    ...(tag ? { tags: tag } : {}),
  };

  try {
    //query 추가
    const posts = await Post.find(query)
      .sort({ _id: -1 })
      .limit(10)
      .skip((page - 1) * 10)
      .lean()
      .exec();

    //마지막 페이지번호 추가.
    //query 추가
    const postCount = await Post.countDocuments(query).exec();
    ctx.set('Last-Page', Math.ceil(postCount / 10));

    // 200자이상 문자열 자르기.
    // 방법1
    // ctx.body = posts
    //   .map((post) => post.toJSON())
    //   .map((post) => ({
    //     ...post,
    //     body:
    //       // 200자 이상 자르고 마지막에 ... 점개 표시해줌.
    //       post.body.length < 200 ? post.body : `${post.body.slice(0, 200)}...`,
    //   }));

    //방법2
    ctx.body = posts.map((post) => ({
      ...post,
      body:
        //추가 , 리팩토링
        removeHtmlAndShorten(post.body),
    }));
  } catch (e) {
    ctx.throw(500, e);
  }
};

// id로 포스트 찾는 코드 리팩토링
export const read = async (ctx) => {
  ctx.body = ctx.state.post;
};

export const remove = async (ctx) => {
  const { id } = ctx.params;
  try {
    await Post.findByIdAndRemove(id).exec();
    ctx.status = 204; // no content , 성공이지만 응답데이터없음
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
PATCH /api/posts/:id 
{
    title:'수정',
    body: '수정 내용',
    tags: ['수정','태그']
}
*/

export const update = async (ctx) => {
  const { id } = ctx.params;

  //검증.
  const schema = Joi.object().keys({
    title: Joi.string(),
    body: Joi.string(),
    tags: Joi.array().items(Joi.string()),
  });

  //실패시
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  //추가
  const nextData = { ...ctx.request.body };
  if (nextData.body) {
    nextData.body = sanitizeHtml(nextData.body, sanitizeOption);
  }

  try {
    const post = await Post.findByIdAndUpdate(id, nextData, {
      // 이 값이 설정해야 업데이트된 데이터를 반환.
      // false , 업데이트 전 데이터 반환.
      new: true,
    }).exec();
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};
