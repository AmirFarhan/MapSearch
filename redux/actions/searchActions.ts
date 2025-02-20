import { Place } from "@/types/placeTypes";
import { ADD_SEARCH_HISTORY, SearchActionTypes } from "../../types/reduxTypes";
import { Dispatch } from "redux";

export const addSearchHistory = (place: Place) => {
  return (dispatch: Dispatch<SearchActionTypes>) => {
    dispatch({
      type: ADD_SEARCH_HISTORY,
      payload: place,
    });
  };
};
