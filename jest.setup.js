import "react-native-gesture-handler/jestSetup";

jest.mock("react-native-reanimated", () => require("react-native-reanimated/mock"));
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({ navigate: jest.fn() })
}));
jest.mock("@bang88/react-native-ultimate-listview", () => ({
  UltimateListView: () => null,
}));
