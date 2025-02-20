import axios from "axios";
import { fetchPlaceDetails, fetchPlaces } from "@/api/placeAPI";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);

describe("placeAPI", () => {
  afterEach(() => {
    mock.reset();
  });

  it("fetches place predictions successfully", async () => {
    mock.onGet(/autocomplete/).reply(200, { predictions: [{ description: "Place A" }] });

    const places = await fetchPlaces("Place");
    expect(places).toEqual([{ description: "Place A" }]);
  });

  it("fetches place details successfully", async () => {
    mock.onGet(/details/).reply(200, { result: { geometry: { location: { lat: 1, lng: 2 } }, name: "Place A" } });

    const details = await fetchPlaceDetails("123");
    expect(details).toEqual({ lat: 1, lng: 2, name: "Place A" });
  });

  it("handles API errors", async () => {
    mock.onGet(/autocomplete/).networkError();
    
    await expect(fetchPlaces("Place")).rejects.toThrow();
  });
});
