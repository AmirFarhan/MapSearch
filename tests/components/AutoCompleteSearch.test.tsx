import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import AutoCompleteSearch from "../../components/AutoCompleteSearch";
import { Place } from "@/types/placeTypes";

describe("AutoCompleteSearch", () => {
  const mockHandleQueryChange = jest.fn();
  const mockHandleSelect = jest.fn();

  const mockSuggestions: Place[] = [
    { description: "Kuala Lumpur", place_id: "1" },
    { description: "Selangor", place_id: "2" },
  ];

  it("renders input field with placeholder", () => {
    const { getByPlaceholderText } = render(
      <AutoCompleteSearch 
        query=""
        suggestions={[]} 
        handleQueryChange={mockHandleQueryChange} 
        handleSelect={mockHandleSelect}
      />
    );

    expect(getByPlaceholderText("Search for a place")).toBeTruthy();
  });

  it("calls handleQueryChange when input text changes", () => {
    const { getByPlaceholderText } = render(
      <AutoCompleteSearch 
        query=""
        suggestions={mockSuggestions} 
        handleQueryChange={mockHandleQueryChange} 
        handleSelect={mockHandleSelect}
      />
    );

    const input = getByPlaceholderText("Search for a place");
    fireEvent.changeText(input, "Kuala Lumpur");

    expect(mockHandleQueryChange).toHaveBeenCalledWith("Kuala Lumpur");
  });

  it("shows suggestions when input is focused and hides on blur", async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(
      <AutoCompleteSearch 
        query="Kuala" 
        suggestions={mockSuggestions} 
        handleQueryChange={mockHandleQueryChange} 
        handleSelect={mockHandleSelect}
      />
    );

    const input = getByPlaceholderText("Search for a place");

    fireEvent(input, "focus");
    await waitFor(() => expect(getByText("Kuala Lumpur")).toBeTruthy());

    fireEvent(input, "blur");
    await waitFor(() => expect(queryByText("Kuala Lumpur")).toBeNull());
  });

  it("calls handleSelect when a suggestion is pressed", async () => {
    const { getByText } = render(
      <AutoCompleteSearch 
        query="Kuala" 
        suggestions={mockSuggestions} 
        handleQueryChange={mockHandleQueryChange} 
        handleSelect={mockHandleSelect}
      />
    );

    const suggestion = getByText("Kuala Lumpur");
    fireEvent.press(suggestion);

    expect(mockHandleSelect).toHaveBeenCalledWith(mockSuggestions[0]);
  });
});
