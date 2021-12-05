import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { ActivityIndicator, Colors } from "react-native-paper";
import { Spacer } from "../../../components/spacer/spacer.component";
import styled from "styled-components/native";
import { Text } from "../../../components/typography/text.component";
import { RestaurantInfoCard } from "../components/restaurant-info-card.component";
import {
  SingleCardView,
  ReviewByContainer,
  RatingPill,
  RatingPill2,
  RatingPill3,
  RatingPill4,
  RatingButtonContainer,
  RatingButton,
  RatingButtonSmall,
  RatingButton2,
  RatingButtonSmall2,
} from "./restaurant-info-card.styles";
import { ProfileNameListItem } from "../../social/components/user-profile.styles";
const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;
const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

const ratingTexts = ["Awful", "Meh", "Good", "Awesome", "Awesome"];
export const ReviewInfoCardItem = ({ review, navigation }) => {
  return !review || !navigation ? (
    <LoadingContainer>
      <Loading size={50} animating={true} color={Colors.blue300} />
    </LoadingContainer>
  ) : (
    <>
      <ReviewByContainer>
        <Text variant="label">Rated </Text>
        {review.rating.$numberDecimal <= 1 ? (
          <RatingPill>
            <Text>Awful</Text>
          </RatingPill>
        ) : review.rating.$numberDecimal <= 2 ? (
          <RatingPill2>
            <Text>Meh</Text>
          </RatingPill2>
        ) : review.rating.$numberDecimal <= 3 ? (
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

        <ProfileNameListItem>
          <Text variant="label">{review.userId.username}</Text>
        </ProfileNameListItem>
      </ReviewByContainer>
      <SingleCardView>
        <Spacer position="bottom" size="large">
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("RestaurantDetail", {
                restaurant: review,
              })
            }
          >
            <Spacer position="bottom" size="large">
              <RestaurantInfoCard restaurant={review} />
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
    </>
  );
};
