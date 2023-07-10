import { combineReducers } from 'redux';
import { reducer as main } from './MainRedux';
import { reducer as currentSpace } from './SpaceRedux';
import { reducer as comments } from './CommentRedux';

const reducers = combineReducers({
  main,
  currentSpace,
  comments
});

export default reducers;
