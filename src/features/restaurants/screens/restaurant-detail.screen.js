import React, { useState } from "react";
import { Image, ScrollView, View } from "react-native";
import { List } from "react-native-paper";
import styled from "styled-components/native";
import { RestaurantInfoCard } from "../components/restaurant-info-card.component";

import { SafeArea } from "../../../components/utility/safe-area.component";
import {
  RatingPill,
  RatingPill2,
  RatingPill3,
  RatingPill4,
  ReviewByContainer,
  ReviewListItem,
} from "../components/restaurant-info-card.styles";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import {
  ProfileNameListItem,
  UserListItem,
} from "../../social/components/user-profile.styles";
import { FlatList } from "react-native-gesture-handler";
import { RestaurantInfoCardAlt } from "../components/restaurant-info-card-alternative.component";
import { useEffect } from "react";
import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";
import { useContext } from "react";

export const RestaurantDetailScreen = ({ route }) => {
  const { isLoading, setViewingRestaurantId, restaurantsReviews } = useContext(
    RestaurantsContext
  );

  const users = [
    {
      username: "thso12",
      _id: "123",
    },
    {
      username: "thso123",
      _id: "124",
    },
  ];

  useEffect(() => {
    if (!route || !route.params || !route.params.restaurant) {
      return;
    }
    setViewingRestaurantId(route.params.restaurant.restaurantId._id);
  }, [route]);

  const { restaurant, pathFrom } = route.params;
  return (
    <SafeArea>
      {pathFrom === "reviewUpload" ? (
        <RestaurantInfoCardAlt restaurant={restaurant} />
      ) : (
        <RestaurantInfoCard restaurant={restaurant} />
      )}

      {/* <ScrollView>
        <ReviewByContainer>
          <Text variant="label">Rated </Text>
          <RatingPill>
            <Text>Meh</Text>
          </RatingPill>
          <Spacer position="right" size="medium">
            <Text variant="label">by </Text>
          </Spacer>
          <Image
            style={{
              width: 40,
              height: 40,
              borderRadius: 200,
              borderWidth: 2,
              //borderColor: colors.brand.primary,
            }}
            source={{
              uri: "https://picsum.photos/200",
            }}
          />

          <ProfileNameListItem>thso12</ProfileNameListItem>
        </ReviewByContainer>
      </ScrollView> */}
      {!restaurantsReviews ||
      !restaurantsReviews.reviews ||
      restaurantsReviews.reviews.lengh === 0 ? (
        <></>
      ) : (
        <FlatList
          data={restaurantsReviews.reviews}
          renderItem={({ item }) => {
            return (
              <ReviewListItem>
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

                <Spacer position="right" size="medium">
                  <Text variant="label">by </Text>
                </Spacer>

                <Image
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 200,
                    borderWidth: 2,
                    //borderColor: colors.brand.primary,
                  }}
                  source={{
                    uri: "https://picsum.photos/200",
                  }}
                />

                {/* <ProfileNameListItem>{item.username}</ProfileNameListItem> */}
              </ReviewListItem>
            );
          }}
          keyExtractor={(item) => item._id}
        />
      )}
    </SafeArea>
  );
};
