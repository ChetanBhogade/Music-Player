import {
  ADD_PLAYLIST,
  ADD_PLAYLIST_SONG,
  PLAYER_STATE,
  REMOVE_PLAYLIST,
} from './playlistType';

export const addPlaylist = playlistData => {
  return {
    type: ADD_PLAYLIST,
    payload: playlistData,
  };
};

export const removePlaylist = id => {
  return {
    type: REMOVE_PLAYLIST,
    payload: id,
  };
};

export const addPlaylistSong = data => {
  return {
    type: ADD_PLAYLIST_SONG,
    payload: data, // id, newSongDetails
  };
};

export const setPlayerState = state => {
  return {
    type: PLAYER_STATE,
    payload: state,
  };
};
