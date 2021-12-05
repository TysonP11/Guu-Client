import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components/native";
import { ActivityIndicator, Colors } from "react-native-paper";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";
import { FavouritesContext } from "../../../services/favourites/favourites.context";
import { Search } from "../components/search.component";
import { ReviewInfoCardItem } from "../components/review-info-card-item.component";
import {
  OtherOptions,
  OtherOptionsContainer,
} from "../components/restaurant-info-card.styles";
import { Text } from "../../../components/typography/text.component";

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;
const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const RestaurantsScreen = ({ navigation }) => {
  const {
    isLoading,
    restaurants,
    reviews: { reviews },
    retrieveRestaurants,
  } = useContext(RestaurantsContext);

  const { favourites } = useContext(FavouritesContext);
  const [isToggled, setIsToggled] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(1);

  const switchReview = (maxLength) => {
    if (maxLength > 1) {
      setReviewIndex((prevState) => prevState % maxLength);
      setReviewIndex((prevState) => prevState + 1);
    } else {
      setReviewIndex(1);
    }
  };

  useEffect(() => {
    retrieveRestaurants("");
  }, []);

  return (
    <SafeArea>
      <Search
        isFavouritesToggled={isToggled}
        onFavouritesToggle={() => setIsToggled(!isToggled)}
      />
      {isLoading || reviews === null || reviews === undefined ? (
        <LoadingContainer>
          <Loading size={50} animating={true} color={Colors.blue300} />
        </LoadingContainer>
      ) : (
        <>
          {reviews.length === 0 ? (
            <></>
          ) : (
            <>
              <Text variant="label">{reviewIndex}</Text>
              <ReviewInfoCardItem
                review={reviews[reviewIndex - 1]}
                navigation={navigation}
              />
              <OtherOptionsContainer>
                <OtherOptions onPress={() => switchReview(reviews.length)}>
                  <Text>Not Interested</Text>
                </OtherOptions>
              </OtherOptionsContainer>
            </>
          )}
        </>
      )}
    </SafeArea>
  );
};
