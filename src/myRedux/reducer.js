import {combineReducers} from 'redux';
import cakeReducer from './cake/cakeReducer';
import playlistReducer from './playlist/playlistReducer';

export default combineReducers({
  cakeReducer,
  playlistReducer,
});
