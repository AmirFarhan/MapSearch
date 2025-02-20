import { Keyboard, SafeAreaView, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addSearchHistory } from "@/redux/actions/searchActions";
import { Place } from "@/types/placeTypes";
import { useLocalSearchParams } from "expo-router";
import LocationMap from "@/components/LocationMap";
import AutoCompleteSearch from "@/components/AutoCompleteSearch";
import { fetchPlaceDetails, fetchPlaces } from "@/api/placeAPI";
import { INITIAL_REGION } from "@/constants/region";

export default function Index() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Place[]>([]);
  const [region, setRegion] = useState(INITIAL_REGION); 
  const { placeId } = useLocalSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (placeId) {
      fetchPlaceDetails(placeId as string)
        .then((details: { lat: number, lng: number, name: string }) => {
          setRegion((prev) => ({ ...prev, latitude: details.lat, longitude: details.lng }));
          setQuery(details.name);
          setSuggestions([]);
        })
        .catch((error) => {
          console.log("Error fetching place details: ", error);
        });
    }
  }, [placeId]);

  const handleQueryChange = (text: string) => {
    setQuery(text);
    
    setTimeout(async () => {
      fetchPlaces(text)
        .then((places: Place[]) => {
          setSuggestions(places);
        })
        .catch((error) => {
          console.log("Error fetching places: ", error);
        });
    }, 500);
  }

  const handleSelect = async (place: Place) => {
    fetchPlaceDetails(place.place_id)
      .then((details: { lat: number, lng: number, name: string }) => {
        dispatch(addSearchHistory({ description: place.description, place_id: place.place_id }) as any);
        setRegion((prev) => ({ ...prev, latitude: details.lat, longitude: details.lng }));
        setQuery(details.name);
        setSuggestions([]);
        Keyboard.dismiss();
      })
      .catch((error) => {
        console.log("Error fetching place details: ", error);
      });
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.searchContainer}>
        <AutoCompleteSearch
          query={query}
          suggestions={suggestions}
          handleQueryChange={handleQueryChange}
          handleSelect={handleSelect}
        />
      </SafeAreaView>
      <LocationMap region={region} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    position: "absolute",
    top: 10,
    left: 20,
    right: 20,
    zIndex: 1000,
    padding: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});
