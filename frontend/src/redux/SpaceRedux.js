import { createReducer, createActions } from 'reduxsauce';
import request from 'api/request';
import MainActions from './MainRedux';

/* --------------------- Types and Action Creators ---------------- */
const { Types, Creators } = createActions({
  setSpace: ['space'],
  setPosts: ['posts'],
  addPosts: ['posts'],
  setCurrentPost: ['currentPost'],
  setPostsLoading: ['postsLoading']
});

export const SpaceTypes = Types;

// @TODO load paginated
Creators.loadPosts = spaceId => {
  return async dispatch => {
    dispatch(Creators.setPosts([]));
    dispatch(Creators.setPostsLoading(true));

    const resp = await request(
      'post',
      'list',
      [
        {
          limit: 100
        }
      ],
      { spaceId }
    );

    if (resp.ok) {
      dispatch(Creators.setPosts(resp.data.data));
    }

    dispatch(Creators.setPostsLoading(false));
    dispatch(MainActions.setLoading(false));
  };
};

export default Creators;

/* --------------------- Selectors ---------------- */
export const SpaceSelectors = {
  selectCurrentSpace: state => state.currentSpace.space,
  selectCurrentPost: state => state.currentSpace.currentPost,
  selectPosts: state => state.currentSpace.posts,
  selectPostsLoading: state => state.currentSpace.postsLoading
};

/* --------------------- Initial State ----------------- */
export const INITIAL_STATE = {
  space: null,
  currentPost: null,
  posts: [],
  postsLoading: false
};

/* ------------------- Reducers --------------------- */

export const setSpace = (state, { space }) => ({
  ...state,
  space
});

export const setPosts = (state, { posts }) => ({
  ...state,
  posts
});

export const addPosts = (state, { posts }) => ({
  ...state,
  posts: [...posts, ...state.posts]
});

export const setPostsLoading = (state, { postsLoading }) => ({
  ...state,
  postsLoading
});

export const setCurrentPost = (state, { currentPost }) => ({
  ...state,
  currentPost
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_SPACE]: setSpace,
  [Types.SET_POSTS]: setPosts,
  [Types.SET_CURRENT_POST]: setCurrentPost,
  [Types.ADD_POSTS]: addPosts,
  [Types.SET_POSTS_LOADING]: setPostsLoading
});
