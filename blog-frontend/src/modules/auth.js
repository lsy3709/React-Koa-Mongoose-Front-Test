import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const SAMPLE_ACTION = 'auth/SAMPLE_ACTION';
const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

export const sampleAction = createAction(SAMPLE_ACTION);
export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form, // 회원가입, 로그인
    key, //username, password, passwordConfirm
    value, // 실제 바꾸는 값
  }),
);

export const initializeForm = createAction(INITIALIZE_FORM, (form) => form);

const initialState = {
  register: {
    username: '',
    password: '',
    passwordConfirm: '',
  },
  login: {
    username: '',
    password: '',
  },
};

const auth = handleActions(
  {
    [SAMPLE_ACTION]: (state, action) => state,

    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value; // state.register.username 변경함.
      }),

    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
    }),
  },
  initialState,
);

export default auth;
