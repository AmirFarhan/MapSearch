import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import searchReducer from "@/redux/reducers/searchReducer";
import { addSearchHistory } from "@/redux/actions/searchActions";
import { SearchState } from "@/types/reduxTypes";

describe("searchReducer", () => {
  let store: ReturnType<typeof setupStore>;

  // Helper function to create a store for testing
  const setupStore = (preloadedState?: Partial<SearchState>) =>
    configureStore({
      reducer: { search: searchReducer },
      middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(thunk), // Ensure thunk is a function
      preloadedState: preloadedState ? { search: preloadedState } : undefined,
    });

  beforeEach(() => {
    store = setupStore({ history: [] }); // Initialize store with empty history
  });

  it("adds a search history entry", async () => {
    const place = { description: "Test Place", place_id: "123" };

    // Dispatch the action
    await store.dispatch<any>(addSearchHistory(place));

    // Get the updated state
    const state = store.getState().search;

    // Assertions
    expect(state.history).toHaveLength(1);
    expect(state.history[0]).toEqual(place);
  });
});
