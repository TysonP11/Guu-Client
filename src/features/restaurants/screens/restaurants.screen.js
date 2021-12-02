import React, { useContext, useState, useEffect } from "react";
import { FlatList, TouchableOpacity, Image, View } from "react-native";
import styled from "styled-components/native";
import { ActivityIndicator, Colors } from "react-native-paper";

import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { FavouritesBar } from "../../../components/favourites/favourites-bar.component";

import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";
import { FavouritesContext } from "../../../services/favourites/favourites.context";

import { Text } from "../../../components/typography/text.component";
import { Search } from "../components/search.component";
import { RestaurantInfoCard } from "../components/restaurant-info-card.component";
import {
  SingleCardView,
  ReviewByContainer,
  RatingPill,
  RatingButtonContainer,
  RatingButton,
  RatingButtonSmall,
  RatingButton2,
  RatingButtonSmall2,
  OtherOptions,
  OtherOptionsContainer,
} from "../components/restaurant-info-card.styles";
import {
  ProfileNameListItem,
  TagPill,
  UserListItem,
} from "../../social/components/user-profile.styles";

const RestaurantList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;
const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

const ratingTexts = ["Awful", "Meh", "Good", "Awesome", "Awesome"];

export const RestaurantsScreen = ({ navigation }) => {
  const { isLoading, restaurants, reviews } = useContext(RestaurantsContext);
  const { favourites } = useContext(FavouritesContext);
  const [isToggled, setIsToggled] = useState(false);

  useEffect(() => {
    if (reviews && reviews.reviews && reviews.reviews.length > 0) {
      console.log(reviews.reviews[0]);
      console.log(Math.floor(reviews.reviews[0].rating.$numberDecimal));
    }
  }, [reviews]);

  return (
    <SafeArea>
      {isLoading && (
        <LoadingContainer>
          <Loading size={50} animating={true} color={Colors.blue300} />
        </LoadingContainer>
      )}
      <Search
        isFavouritesToggled={isToggled}
        onFavouritesToggle={() => setIsToggled(!isToggled)}
      />
      {/* {isToggled && (
        <FavouritesBar
          favourites={favourites}
          onNavigate={navigation.navigate}
        />
      )}
      <RestaurantList
        data={restaurants}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("RestaurantDetail", {
                  restaurant: item,
                })
              }
            >
              <Spacer position="bottom" size="large">
                <RestaurantInfoCard restaurant={item} />
              </Spacer>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.name}
      /> */}
      {reviews && reviews.reviews && reviews.reviews.length > 0 && (
        <>
          <ReviewByContainer>
            <Text variant="label">Rated </Text>
            <RatingPill>
              {reviews && reviews.reviews && reviews.reviews.length > 0 && (
                <Text>
                  {
                    ratingTexts[
                      Math.floor(reviews.reviews[0].rating.$numberDecimal)
                    ]
                  }
                </Text>
              )}
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
          <SingleCardView>
            <Spacer position="bottom" size="large">
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("RestaurantDetail", {
                    restaurant: reviews.reviews[0],
                  })
                }
              >
                <Spacer position="bottom" size="large">
                  <RestaurantInfoCard restaurant={reviews.reviews[0]} />
                </Spacer>
              </TouchableOpacity>
            </Spacer>
          </SingleCardView>
          <RatingButtonContainer>
            <RatingButtonSmall>
              <Text>Awful</Text>
            </RatingButtonSmall>
            <RatingButton>
              <Text>Meh</Text>
            </RatingButton>
            <RatingButton2>
              <Text>Good</Text>
            </RatingButton2>
            <RatingButtonSmall2>
              <Text variant="small">Awesome</Text>
            </RatingButtonSmall2>
          </RatingButtonContainer>
          <OtherOptionsContainer>
            <OtherOptions>
              <Text>Not Interested</Text>
            </OtherOptions>
          </OtherOptionsContainer>
        </>
      )}
    </SafeArea>
  );
};
