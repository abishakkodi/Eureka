import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { setCurrentPageReducer, userLoggedInReducer, setCurrentUserReducer, updateCounterReducer, setBookMarkedVideosReducer } from './adminReducers';
import { setTopVideosReducer, setPlaylistReducer, setCurrentVideoReducer, setRecentVideosReducer} from './videoReducers';

export default combineReducers({
  routing: routerReducer,
  setCurrentPageReducer,
  userLoggedInReducer,
  setCurrentUserReducer,
  updateCounterReducer,
  setBookMarkedVideosReducer,
  setTopVideosReducer,
  setPlaylistReducer,
  setCurrentVideoReducer,
  setRecentVideosReducer
});



