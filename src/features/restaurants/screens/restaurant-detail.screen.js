import React, { useState } from "react";
import { Image, ScrollView, View } from "react-native";
import { List } from "react-native-paper";
import styled from "styled-components/native";
import { RestaurantInfoCard } from "../components/restaurant-info-card.component";

import { SafeArea } from "../../../components/utility/safe-area.component";
import {
  RatingPill,
  RatingPill2,
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

export const RestaurantDetailScreen = ({ route }) => {
  const [breakfastExpanded, setBreakfastExpanded] = useState(false);
  const [lunchExpanded, setLunchExpanded] = useState(false);
  const [dinnerExpanded, setDinnerExpanded] = useState(false);
  const [drinksExpanded, setDrinksExpanded] = useState(false);

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

  const { restaurant } = route.params;
  return (
    <SafeArea>
      <RestaurantInfoCard restaurant={restaurant} />
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
      <FlatList
        data={users}
        renderItem={({ item }) => {
          return (
            <ReviewListItem>
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

              <ProfileNameListItem>{item.username}</ProfileNameListItem>
            </ReviewListItem>
          );
        }}
        keyExtractor={(item) => item._id}
      />
      <View style={{ bottom: 236 }}>
        <ReviewListItem>
          <Text variant="label">Rated </Text>
          <RatingPill2>
            <Text>Awesome</Text>
          </RatingPill2>
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

          <ProfileNameListItem>huong22</ProfileNameListItem>
        </ReviewListItem>
      </View>
    </SafeArea>
  );
};
