import React, { useContext, useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { ActivityIndicator, Colors } from "react-native-paper";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { UserProfileTop } from "../components/user-profile-top.component";
import { UserProfileFeed } from "../components/user-profile-feed.component";
import { ProfileContext } from "../../../services/profile/user-profile.context";
import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";
import { ScrollView } from "react-native-gesture-handler";
import { useEffect } from "react/cjs/react.development";

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;
const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const MyProfileScreen = ({ navigation, route }) => {
  const { user } = useContext(AuthenticationContext);

  const {
    following,
    followers,
    isLoading,
    reviews,
    averageRating,
    tags,
    viewOptions,
    setViewing,
    setViewingUser,
  } = useContext(ProfileContext);

  const { restaurants } = useContext(RestaurantsContext);

  useEffect(() => {
    if (!route || !route.params || !route.params.viewingUser) {
      setViewingUser(user);
    } else {
      setViewingUser(route.params.viewingUser);
    }
  }, []);

  //console.log("isLoading" + isLoading);
  return (
    <SafeArea>
      {isLoading && (
        <LoadingContainer>
          <Loading size={50} animating={true} color={Colors.blue300} />
        </LoadingContainer>
      )}
      <ScrollView>
        <UserProfileTop
          user={user.user}
          followers={followers.followers}
          following={following.following}
          reviews={reviews}
          averageRating={averageRating}
          tags={tags}
          navigation={navigation}
        />
        <UserProfileFeed
          user={user}
          restaurants={restaurants}
          navigation={navigation}
          setViewing={setViewing}
          viewOptions={viewOptions}
          reviews={reviews}
        />
      </ScrollView>
    </SafeArea>
  );
};
