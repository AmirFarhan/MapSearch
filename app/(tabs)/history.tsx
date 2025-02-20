import { StyleSheet, SafeAreaView, Text, ScrollView } from "react-native";
import { Card, List } from "@ant-design/react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Ionicons } from "@expo/vector-icons";
import { Place } from "@/types/placeTypes";
import { Link } from "expo-router";

export default function History() {
  const history = useSelector((state: RootState) => state.search.history);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Card style={styles.card}>
          <Card.Header
            title={<Text style={styles.headerTitle}>Search History</Text>}
          />
          <List>
            {history.map((place: Place, index: number) => (
              <Link 
                href={{
                  pathname: "/(tabs)",
                  params: { placeId: place.place_id }
                }}
                asChild
                key={place.place_id}
              >
                <List.Item
                  thumb={<Ionicons name="location" color="#0084FF" size={30} style={styles.icon} />}
                  style={[
                    styles.listItem,
                    index === history.length - 1 && styles.lastItem
                  ]}
                >
                  <Text>{place.description}</Text>
                </List.Item>
              </Link>
            ))}
          </List>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f5f5f5",
  },
  card: {
    borderRadius: 10,
    overflow: "hidden",
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#333",
  },
  icon: {
    paddingRight: 10,
  },
  listItem: {
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ddd",
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  clearButton: {
    margin: 15,
    borderRadius: 5,
  },
});
