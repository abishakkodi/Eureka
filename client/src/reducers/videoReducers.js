export function setTopVideosReducer (state = [], action) {
  switch (action.type) {
    case 'SET_TOP_VIDEOS':
      return action.settingTopVideos;

    default:
      return state;
  }
}

export function setPlaylistReducer (state = [], action) {
  switch (action.type) {
    case 'SET_CURRENT_PAGE':
      return action.settingPlaylist;

    default:
      return state;
  }
}

export function setCurrentVideoReducer (state = 'home', action) {
  switch (action.type) {
    case 'SET_CURRENT_VIDEO':
      return action.settingCurrentVideo;

    default:
      return state;
  }
}

export function setRecentVideosReducer (state = 'home', action) {
  switch (action.type) {
    case 'SET_RECENT_VIDEOS':
      return action.settingRecentVideos;

    default:
      return state;
  }
}