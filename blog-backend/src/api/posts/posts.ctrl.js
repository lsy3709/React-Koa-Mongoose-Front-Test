let postId = 1; // id 초깃값

// posts 배열 초기 데이터
const posts = [
  {
    id: 1,
    title: '제목',
    body: '내용',
  },
];

// 포스트 작성 : POST /api/posts
// {title, body}
exports.write = (ctx) => {
  //REST API의 Request Body는 ctx.request.body에서 조회 가능.
  const { title, body } = ctx.request.body;
  postId += 1; // 기존 postId +1
  const post = { id: postId, title, body };
  posts.push(post);
  ctx.body = post;
};

// 포스트 목록 조회 : GET /api/posts
exports.list = (ctx) => {
  ctx.body = posts;
};

// 특정 포스트 조회 : GET /api/posts/:id
exports.read = (ctx) => {
  const { id } = ctx.params;
  // 해당 id 로 포스트 찾기.
  // 파라미터로 받아 온 값은 문자열 형식이므로 파라미터를 숫자로 변환 또는
  // 비교할 p.id 값을 문자열로 변경해야함.
  const post = posts.find((p) => p.id.toString() === id);

  if (!post) {
    ctx.status = 404;
    ctx.body = {
      message: '포스트 없음.',
    };
    return;
  }
  ctx.body = post;
};

// 특정 포스트 제거 : DELETE /api/posts/:id
exports.remove = (ctx) => {
  const { id } = ctx.params;
  //해당 id를 가진 post의 인덱스 파악.
  const index = posts.findIndex((p) => p.id.toString() === id);

  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: '포스트 없음',
    };
    return;
  }

  // index 번째 포스트 제거
  posts.splice(index, 1);
  ctx.status = 204; // no content
};

// 포스트수정(교체) : PUT /api/posts/:id
// {title, body}
exports.replace = (ctx) => {
  // 통째로 교체
  const { id } = ctx.params;
  const index = posts.findIndex((p) => p.id.toString() === id);

  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: '포스트 없음.',
    };
    return;
  }
  // 객체를 새로 만듦.
  posts[index] = {
    id,
    ...ctx.request.body,
  };
  ctx.body = posts[index];
};

// 포스트 수정(특정 필드 변경) : PATCH /api/posts/:id
// {title, body}
exports.update = (ctx) => {
  const { id } = ctx.params;
  const index = posts.findIndex((p) => p.id.toString() === id);
  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: '포스트 없음.',
    };
    return;
  }
  //기존 값을 정보 덮어씀.
  posts[index] = {
    ...posts[index],
    ...ctx.request.body,
  };
  ctx.body = posts[index];
};
