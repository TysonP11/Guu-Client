import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components/native";
import { Searchbar } from "react-native-paper";

import { LocationContext } from "../../../services/location/location.context";
import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";

const SearchContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

export const RestaurantSearch = ({
  isFavouritesToggled,
  onFavouritesToggle,
}) => {
  const { restaurantKeyword, restaurantSearch } = useContext(
    RestaurantsContext
  );
  const [searchKeyword, setSearchKeyword] = useState(restaurantKeyword);

  useEffect(() => {
    setSearchKeyword(restaurantKeyword);
  }, [restaurantKeyword]);

  return (
    <SearchContainer>
      <Searchbar
        icon={isFavouritesToggled ? "heart" : "heart-outline"}
        onIconPress={onFavouritesToggle}
        placeholder="Search for a location"
        value={searchKeyword}
        onSubmitEditing={() => {
          restaurantSearch(searchKeyword);
        }}
        onChangeText={(text) => {
          setSearchKeyword(text);
        }}
      />
    </SearchContainer>
  );
};
