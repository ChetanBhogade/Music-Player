import {ADD_PLAYLIST, REMOVE_PLAYLIST} from './playlistType';
import uuid from 'react-native-uuid';

const initialState = {
  playlist: [
    {
      id: uuid.v4(),
      name: 'Favorite Songs',
      audioFiles: [],
      timestamp: new Date().getTime(),
    },
  ],
};

const playlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLAYLIST:
      return {
        ...state,
        playlist: [...state.playlist, action.payload],
      };

    case REMOVE_PLAYLIST:
      return {
        ...state,
        playlist: state.playlist.filter(list => list.id !== action.payload),
      };

    default:
      return state;
  }
};

export default playlistReducer;
