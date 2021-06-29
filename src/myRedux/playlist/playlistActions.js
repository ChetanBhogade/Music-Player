import {ADD_PLAYLIST, REMOVE_PLAYLIST} from './playlistType';

export const addPlaylist = playlistData => {
  return {
    type: ADD_PLAYLIST,
    payload: playlistData,
  };
};

export const removePlaylist = data => {
  return {
    type: REMOVE_PLAYLIST,
    payload: data,
  };
};
