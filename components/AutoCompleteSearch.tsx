import React, { useState } from "react";
import { Input, List, Card } from "@ant-design/react-native";
import { Keyboard, StyleSheet } from "react-native";
import { Place } from "@/types/placeTypes";

interface AutoCompleteSearchProps {
  query: string,
  suggestions: Place[],
  handleQueryChange: (input: string) => void
  handleSelect: (place: Place) => {},
}

const AutoCompleteSearch: React.FC<AutoCompleteSearchProps> = ({
  query,
  suggestions,
  handleQueryChange,
  handleSelect,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleBlur = () => {
    setShowDropdown(false)
    Keyboard.dismiss();
  }

  const handleFocus = () => {
    setShowDropdown(true);
  }

  return (
    <>
      <Input
        value={query}
        style={styles.input}
        onChangeText={(text) => {
          handleQueryChange(text);
        }}
        placeholder="Search for a place"
        onBlur={handleBlur}
        onFocus={handleFocus}
      />
      {showDropdown && suggestions.length > 0 && (
        <Card style={styles.dropdown}>
          <List>
            {suggestions.map((item: Place) => (
              <List.Item key={item.place_id} onPress={() => handleSelect(item)}>
                {item.description}
              </List.Item>
            ))}
          </List>
        </Card>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: "white",
  },
  dropdown: {
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    maxHeight: 200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 1000,
  },
  suggestion: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
})

export default AutoCompleteSearch;