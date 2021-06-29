import {ADD_PLAYLIST, ADD_PLAYLIST_SONG, REMOVE_PLAYLIST} from './playlistType';
import uuid from 'react-native-uuid';

const initialState = {
  playlist: [
    {
      id: uuid.v4(),
      name: 'Favorite Songs',
      audioFilesInfo: [
        {
          id: uuid.v4(),
          name: 'Kal Ho Na Ho',
          path: '/emulator/0/download/kal-ho-na-ho.mp3',
        },
        {
          id: uuid.v4(),
          name: 'Kal Ho Na Ho 2',
          path: '/emulator/0/download/kal-ho-na-ho-2.mp3',
        },
      ],
      timestamp: new Date().getTime(),
    },
  ],
};

const addAudioFilesInformation = (state, action) => {
  const {id, newSongDetails} = action.payload;
  let newPlaylist = [];
  for (let index = 0; index < state.playlist.length; index++) {
    const element = state.playlist[index];
    if (element.id === id) {
      element.audioFilesInfo = [...element.audioFilesInfo, newSongDetails];
    }
    newPlaylist.push(element);
  }
  return {
    ...state,
    playlist: newPlaylist,
  };
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

    case ADD_PLAYLIST_SONG:
      return addAudioFilesInformation(state, action);

    default:
      return state;
  }
};

export default playlistReducer;
