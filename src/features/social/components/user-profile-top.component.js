import React from "react";
import { Text } from "../../../components/typography/text.component";
import { Image } from "react-native";
import { SvgXml } from "react-native-svg";
import star from "../../../../assets/star";
import { colors } from "../../../infrastructure/theme/colors";
import { UserProfileHeader } from "./user-profile-header.component";
import {
  ButtonText,
  FollowButton,
  OverallReviewsInfo,
  ProfileFollowContainer,
  ProfileFollowDetail,
  ProfileInfo,
  ProfileTop,
  ReviewsInfo,
  TagPill,
  TagsContainer,
} from "./user-profile.styles";
import { Button } from "react-native-paper";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

export const UserProfileTop = ({
  user,
  followers,
  following,
  reviews,
  averageRating,
  tags,
  navigation,
}) => {
  const ratingArray = Array.from(new Array(Math.floor(averageRating)));

  return (
    <ProfileTop>
      <UserProfileHeader user={user} />
      <ProfileInfo>
        <Image
          style={{
            width: 130,
            height: 130,
            borderRadius: 80,
            borderWidth: 2,
            borderColor: colors.brand.primary,
          }}
          source={require("../../../../assets/Bobby.jpeg")}
        />
        <OverallReviewsInfo>
          <ReviewsInfo>
            <Text>{averageRating} </Text>
            {ratingArray.map((_, i) => (
              <SvgXml
                key={`star-${reviews[0].restaurantId.placeId}-${i}`}
                xml={star}
                width={20}
                height={20}
              />
            ))}
            <Text> {reviews.length} Guu reviews</Text>
          </ReviewsInfo>

          <TagsContainer>
            {tags.map((t, i) => (
              <TagPill key={i}>
                <Text>{t}</Text>
              </TagPill>
            ))}
          </TagsContainer>
        </OverallReviewsInfo>
      </ProfileInfo>
      <ProfileFollowContainer>
        <ProfileFollowDetail>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("FollowList", {
                users: followers,
                name: "Followers",
              })
            }
          >
            <Text variant="caption">Followers</Text>
            <Text>{followers.length}</Text>
          </TouchableOpacity>
        </ProfileFollowDetail>
        <ProfileFollowDetail>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("FollowList", {
                users: following,
                name: "Following",
              })
            }
          >
            <Text variant="caption">Following</Text>
            <Text>{following.length}</Text>
          </TouchableOpacity>
        </ProfileFollowDetail>
        <ProfileFollowDetail>
          <FollowButton>
            <ButtonText>Follow</ButtonText>
          </FollowButton>
        </ProfileFollowDetail>
      </ProfileFollowContainer>
    </ProfileTop>
  );
};
