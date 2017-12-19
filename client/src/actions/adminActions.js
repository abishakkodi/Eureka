export function setCurrentPage(page){
  return {
    type: 'SET_CURRENT_PAGE',
    currentPage: page
  }
}

export function userLoggedIn( bool ) {
  return {
    type: 'USER_LOGGED_IN',
    loggedIn: true;
  }
}

export function setCurrentUser(currentUser) {
  return {
      type: 'SET_CURRENT_USER',
      currentUser
  }
}


export function updateCounter(counter) {
  return {
      type: 'UPDATE_COUNTER',
      counter
  }
}

export function setBookMarkedVideos(bookmarkedVideos){
  return {
    type: 'SET_BOOKMARKED_VIDEOS',
    bookmarkedVideos
  }
}
