export function setCurrentPageReducer (state = 'home', action) {
  switch (action.type) {
    case 'SET_CURRENT_PAGE':
      return action.setCurrentPage;

    default:
      return state;
  }
}

export function userLoggedInReducer (state = false , action) {
  switch (action.type) {
    case  "USER_LOGGED_IN":
      return action.hasLoggedIn;
    default:
      return state;
  }
}

export function setCurrentUserReducer (state = 'admin' , action) {
  switch (action.type) {
    case  "SET_CURRENT_USER":
      return action.settingCurrentUser;
    default:
      return state;
  }
}

export function updateCounterReducer (state = 0 , action) {
  switch (action.type) {
    case  "UPDATE_COUNTER":
            return action.updatingCounter;
    default:
      return state;
  }
}

export function setBookMarkedVideosReducer (state = [], action) {
  switch (action.type) {
    case  "SET_BOOKMARKED_VIDEOS":
            return action.settingBookMarkedVideos;
    default:
      return state;
  }
}