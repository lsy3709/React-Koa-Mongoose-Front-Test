import Joi from 'joi';
import User from '../../models/user.js';
/*
post /api/auth/register
{
    username:'lsy',
    password:'1234'
}
*/
export const register = async (ctx) => {
  //회원가입
  //검증
  const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(20).required(),
    password: Joi.string().required(),
  });
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { username, password } = ctx.request.body;
  try {
    const exists = await User.findByUsername(username);
    if (exists) {
      ctx.status = 409; // 충돌
      return;
    }
    const user = new User({
      username,
    });
    await user.setPassword(password);
    await user.save(); // db save

    ctx.body = user.serialize();
  } catch (e) {
    ctx.throw(500, e);
  }
};
export const login = async (ctx) => {
  //로그인
};
export const check = async (ctx) => {
  //로그인 상태 확인
};
export const logout = async (ctx) => {
  //로그아웃
};
