import React from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";

interface LocationMapProps {
  region: Region;
}

const LocationMap: React.FC<LocationMapProps> = ({ region }) => {
  return (
    <MapView style={styles.map} region={region}>
      <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
    </MapView>
  )
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

export default LocationMap;
