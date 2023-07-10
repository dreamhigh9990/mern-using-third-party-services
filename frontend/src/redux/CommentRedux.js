import { createReducer, createActions } from 'reduxsauce';
import request from 'api/request';

/* --------------------- Types and Action Creators ---------------- */
const { Types, Creators } = createActions({
  setCurrentComment: ['currentComment'],
  setComments: ['comments'],
  addComment: ['comment'],
  setCommentsLoading: ['commentsLoading'],
  changeComment: ['content']
});

export const CommentTypes = Types;

Creators.loadComments = (spaceId, postId) => {
  return async dispatch => {
    dispatch(Creators.setComments([]));
    dispatch(Creators.setCommentsLoading(true));

    const resp = await request(
      'comment',
      'list',
      [
        {
          filters: { post: postId },
          limit: 100
        }
      ],
      { spaceId }
    );

    if (resp.ok) {
      dispatch(Creators.setComments(resp.data.data));
    }

    dispatch(Creators.setCommentsLoading(false));
  };
};

export default Creators;

/* --------------------- Selectors ---------------- */
export const CommentSelectors = {
  selectCurrentComment: state => state.comments.currentComment,
  selectComments: state => state.comments.comments,
  selectCommentsLoading: state => state.comments.commentsLoading
};

/* --------------------- Initial State ----------------- */
export const INITIAL_STATE = {
  currentComment: {},
  comments: [],
  commentsLoading: false
};

/* ------------------- Reducers --------------------- */

export const setComments = (state, { comments }) => ({
  ...state,
  comments
});

export const addComment = (state, { comment }) => ({
  ...state,
  comments: [comment, ...state.comments]
});

export const setCommentsLoading = (state, { commentsLoading }) => ({
  ...state,
  commentsLoading
});

export const setCurrentComment = (state, { currentComment }) => ({
  ...state,
  currentComment
});

export const changeComment = (state, { content }) => ({
  ...state,
  currentComment: {
    ...state.currentComment,
    content
  }
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_COMMENTS]: setComments,
  [Types.SET_CURRENT_COMMENT]: setCurrentComment,
  [Types.ADD_COMMENT]: addComment,
  [Types.SET_COMMENTS_LOADING]: setCommentsLoading,
  [Types.CHANGE_COMMENT]: changeComment
});
