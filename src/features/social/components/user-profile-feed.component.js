import React from "react";
import styled from "styled-components/native";
import { Image, Text, View } from "react-native";
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
import {
  ProfileReviewList,
  RatingPill,
  ReviewByContainer,
} from "../../restaurants/components/restaurant-info-card.styles";

const RestaurantList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;

const ratingTexts = ["Awful", "Meh", "Good", "Awesome", "Awesome"];

export const UserProfileFeed = ({
  user,
  restaurants,
  navigation,
  setViewing,
  viewOptions,
  reviews,
}) => {
  return (
    <ProfileFeed>
      <ViewSelectContainer>
        {viewOptions.map((option) =>
          option.isSelected ? (
            <ViewSelected key="list">
              <Ionicons
                name={option.name}
                size={24}
                color={option.isSelected ? colors.brand.primary : "grey"}
              />
            </ViewSelected>
          ) : (
            <ViewDefault key="map" onPress={() => setViewing(option.name)}>
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
          data={reviews}
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
                  <ProfileReviewList>
                    <Text variant="label">Rated </Text>
                    <RatingPill>
                      <Text>
                        {ratingTexts[Math.floor(item.rating.$numberDecimal)]}
                      </Text>
                    </RatingPill>
                  </ProfileReviewList>
                  <RestaurantInfoCard restaurant={item} />
                </Spacer>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item._id}
        />
      ) : (
        <View></View>
      )}
    </ProfileFeed>
  );
};
