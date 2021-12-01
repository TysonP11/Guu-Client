import React from "react";
import styled from "styled-components/native";
import { Text, View } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import {
  ProfileFeed,
  RestaurantView,
  ViewDefault,
  ViewSelectContainer,
  ViewSelected,
} from "./user-profile.styles";
import { colors } from "../../../infrastructure/theme/colors";

import { Ionicons } from "@expo/vector-icons";
import { Spacer } from "../../../components/spacer/spacer.component";
import { RestaurantInfoCard } from "../../restaurants/components/restaurant-info-card.component";
import { MapScreen } from "../../map/screens/map.screen";

const RestaurantList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;

export const UserProfileFeed = ({
  user,
  restaurants,
  navigation,
  setViewing,
  viewOptions,
}) => {
  return (
    <ProfileFeed>
      <ViewSelectContainer>
        {viewOptions.map((option) =>
          option.isSelected ? (
            <ViewSelected>
              <Ionicons
                name={option.name}
                size={24}
                color={option.isSelected ? colors.brand.primary : "grey"}
              />
            </ViewSelected>
          ) : (
            <ViewDefault onPress={() => setViewing(option.name)}>
              <Ionicons
                name={option.name}
                size={24}
                color={option.isSelected ? colors.brand.primary : "grey"}
              />
            </ViewDefault>
          )
        )}
      </ViewSelectContainer>
      {viewOptions[0].isSelected ? (
        <RestaurantList
          data={restaurants}
          horizontal={true}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("RestaurantDetail", {
                    restaurant: item,
                  })
                }
              >
                <Spacer position="right" size="large">
                  <RestaurantInfoCard restaurant={item} />
                </Spacer>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.name}
        />
      ) : (
        <View></View>
      )}
    </ProfileFeed>
  );
};
