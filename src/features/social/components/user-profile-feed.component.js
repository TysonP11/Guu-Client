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
  RatingPill2,
  RatingPill3,
  RatingPill4,
  ReviewByContainer,
} from "../../restaurants/components/restaurant-info-card.styles";
import MapView from "react-native-maps";
import { MapCallout } from "../../map/components/map-callout.component";

const Map = styled(MapView)`
  height: 100%;
  width: 100%;
`;

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
                    {item.rating.$numberDecimal <= 1 ? (
                      <RatingPill>
                        <Text>Awful</Text>
                      </RatingPill>
                    ) : item.rating.$numberDecimal <= 2 ? (
                      <RatingPill2>
                        <Text>Meh</Text>
                      </RatingPill2>
                    ) : item.rating.$numberDecimal <= 3 ? (
                      <RatingPill3>
                        <Text>Good</Text>
                      </RatingPill3>
                    ) : (
                      <RatingPill4>
                        <Text>Awesome</Text>
                      </RatingPill4>
                    )}
                  </ProfileReviewList>
                  <RestaurantInfoCard restaurant={item} />
                </Spacer>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item._id}
        />
      ) : (
        <View style={{ height: 450 }}>
          <Map
            region={{
              latitude: parseFloat(reviews[0].restaurantId.address.latitude),
              longitude: parseFloat(reviews[0].restaurantId.address.longitude),
              latitudeDelta: 0.02,
              longitudeDelta: 0.02,
            }}
          >
            {reviews.map((review) => {
              return (
                <MapView.Marker
                  key={review._id}
                  title={review.restaurantId.name}
                  coordinate={{
                    latitude: parseFloat(review.restaurantId.address.latitude),
                    longitude: parseFloat(
                      review.restaurantId.address.longitude
                    ),
                  }}
                >
                  <Image
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 200,
                      borderWidth: 2,
                      borderColor:
                        review.rating.$numberDecimal <= 1
                          ? "#869fb4"
                          : review.rating.$numberDecimal <= 2
                          ? "#f8f8f8"
                          : review.rating.$numberDecimal <= 3
                          ? "#f9a11b"
                          : "#f26522",
                    }}
                    source={{
                      uri: "https://picsum.photos/200",
                    }}
                  />
                  <MapView.Callout
                    onPress={() =>
                      navigation.navigate("RestaurantDetail", {
                        restaurant: review,
                      })
                    }
                  >
                    <MapCallout restaurant={review} />
                  </MapView.Callout>
                </MapView.Marker>
              );
            })}
          </Map>
        </View>
      )}
    </ProfileFeed>
  );
};
