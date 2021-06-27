import {ADD_PLAYLIST} from './playlistType';

const initialState = [
  {
    id: 1,
    name: 'Hindi Songs',
    audioFiles: [
      {
        id: 1,
        name: 'Kal Ho Na Ho',
        path: '/emulated/0/download/kal-ho-na-ho.mp3',
      },
    ],
    timestamp: new Date().getTime(),
  },
];

const playlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLAYLIST:
      return [...state, action.payload];

    default:
      return state;
  }
};

export default playlistReducer;