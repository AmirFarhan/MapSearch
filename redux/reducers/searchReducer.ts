import { ADD_SEARCH_HISTORY, SearchState, SearchActionTypes } from "../../types/reduxTypes";

const initialState: SearchState = {
  history: [],
};

const searchReducer = (state = initialState, action: SearchActionTypes): SearchState => {
  switch (action.type) {
    case ADD_SEARCH_HISTORY:
      return {
        ...state,
        history: [
          action.payload,
          ...state.history.filter((place) => place.place_id !== action.payload.place_id),
        ],
      }
    default:
      return state;
  }
};

export default searchReducer;
