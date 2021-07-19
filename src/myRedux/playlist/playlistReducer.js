import {
  ADD_PLAYLIST,
  ADD_PLAYLIST_SONG,
  PLAYER_STATE,
  REMOVE_PLAYLIST,
  SET_PLAYER_INFO,
} from './playlistType';
import uuid from 'react-native-uuid';

const initialState = {
  playlist: [
    {
      id: uuid.v4(),
      name: 'Favorite Songs',
      audioFilesInfo: [
        {
          id: uuid.v4(),
          title: 'Kal Ho Na Ho',
          url: '/emulator/0/download/kal-ho-na-ho.mp3',
        },
        {
          id: uuid.v4(),
          title: 'Kal Ho Na Ho 2',
          url: '/emulator/0/download/kal-ho-na-ho-2.mp3',
        },
      ],
      timestamp: new Date().getTime(),
    },
  ],
  currentPlayerState: null,
  playerInfo: {
    duration: 'mm:ss',
    position: 'mm:ss',
    sliderPercentage: (45 / 100) * 100,
    trackTitle: 'getTrack(getCurrentTrack()) use this function as it is',
  },
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

    case PLAYER_STATE:
      return {
        ...state,
        currentPlayerState: action.payload,
      };

    case SET_PLAYER_INFO:
      return {
        ...state,
        playerInfo: action.payload,
      };

    default:
      return state;
  }
};

export default playlistReducer;
