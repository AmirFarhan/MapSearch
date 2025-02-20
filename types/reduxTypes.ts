import { Place } from "@/types/placeTypes";

export interface SearchState {
  history: Place[];
}

export const ADD_SEARCH_HISTORY = "ADD_SEARCH_HISTORY";

interface AddSearchHistoryAction {
  type: typeof ADD_SEARCH_HISTORY;
  payload: Place;
}

export type SearchActionTypes = AddSearchHistoryAction;
