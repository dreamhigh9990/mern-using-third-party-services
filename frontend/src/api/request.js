import Cookies from 'js-cookie';
import createProfileApi from './ProfileApi';
import createAuthApi from './AuthApi';
import createSpaceApi from './SpaceApi';
import createPostApi from './PostApi';
import createCommentApi from './CommentApi';
import createUserApi from './UserApi';

// import { getStore } from '../redux/store';
// import MainActions from '../redux/MainRedux';

const API_MAP = {
  auth: createAuthApi,
  space: createSpaceApi,
  post: createPostApi,
  profile: createProfileApi,
  comment: createCommentApi,
  user: createUserApi
};

export default async function request(apiName, func, params = [], apiOptions) {
  // const store = getStore();
  const createApi = API_MAP[apiName];
  const token = Cookies.get('memorial-token');

  if (!createApi) {
    throw new Error(`API ${apiName} not found`);
  }

  const api = createApi(token, apiOptions);
  // store.dispatch(MainActions.setLoading(true));
  const resp = await api[func](...params);
  // store.dispatch(MainActions.setLoading(false));
  return resp;
}
