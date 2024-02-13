export const actionType = {
  SET_USER: "SET_USER",
  SET_ALL_USER: "SET_ALL_USER",
  SET_ALL_ARTIST: "SET_ALL_ARTIST",
  SET_ALL_ALBUM: "SET_ALL_ALBUMS",
  SET_ALL_SONG: "SET_ALL_SONG",
  SET_FILTER_TERM: "SET_FILTER_TERM",
  SET_ARTIST_FILTER: "SET_ARTIST_FILTER",
  SET_LANGUAGE_FILTER: "SET_LANGUAGE_FILTER",
  SET_ALBUM_FILTER: "SET_ALBUM_FILTER",
  SET_ALERT_TYPE : "SET_ALERT_TYPE",
  SET_ISSONG_PLAY: "SET_ISSONG_PLAY",
  SET_SONG_INDEX: "SET_SONG_INDEX",
  SET_SEARCH_TERM: "SET_SEARCH_TERM",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionType.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    case actionType.SET_ALL_USER:
      return {
        ...state,
        allUser: action.allUser,
      };
    case actionType.SET_ALL_SONG:
      return {
        ...state,
        allSong: action.allSong,
      };
    case actionType.SET_ALL_ARTIST:
      return {
        ...state,
        allArtist: action.allArtist,
      };

    case actionType.SET_ALL_ALBUM:
      return {
        ...state,
        allAlbums: action.allAlbums,
      };

      case actionType.SET_FILTER_TERM:
      return {
        ...state,
        filterTerm: action.filterTerm,
      };

      case actionType.SET_ARTIST_FILTER:
      return {
        ...state,
        artistFilter: action.artistFilter,
      };

      case actionType.SET_LANGUAGE_FILTER:
        return {
          ...state,
          languageFilter: action.languageFilter,
        };

        case actionType.SET_ALBUM_FILTER:
            return {
              ...state,
              albumFilter: action.albumFilter,
            };
            case actionType.SET_ALERT_TYPE:
              return {
                ...state,
                alertType: action.alertType,
              };


              case actionType.SET_ISSONG_PLAY:
      return {
        ...state,
        isSongPlaying: action.isSongPlaying,
      };

    case actionType.SET_SONG_INDEX:
      return {
        ...state,
        songIndex: action.songIndex,
      };
      case actionType.SET_SEARCH_TERM:
        return {
          ...state,
          searchTerm: action.searchTerm,
        };
    default:
      return state;
  }
};

export default reducer;
