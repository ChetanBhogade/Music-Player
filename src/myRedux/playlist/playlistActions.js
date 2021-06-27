import {ADD_PLAYLIST} from './playlistType';

export const addPlaylist = playlistData => {
  return {
    type: ADD_PLAYLIST,
    payload: playlistData,
  };
};
