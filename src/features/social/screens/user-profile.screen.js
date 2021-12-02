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
    viewingUser,
    isFollowing,
    isOwnProfile,
  } = useContext(ProfileContext);

  const { restaurants } = useContext(RestaurantsContext);

  useEffect(() => {
    if (!route || !route.params || !route.params.user) {
      console.log("viewing logged in user");
      setViewingUser(user.user);
    } else if (route.params.user) {
      console.log(route);
      console.log("viewing other user" + JSON.stringify(route.params.user));
      setViewingUser(route.params.user);
    }
  }, [user, route]);

  //console.log("isLoading" + isLoading);
  return (
    <SafeArea>
      {isLoading ? (
        <LoadingContainer>
          <Loading size={50} animating={true} color={Colors.blue300} />
        </LoadingContainer>
      ) : (
        <ScrollView>
          {!viewingUser || !followers || !following || isLoading ? (
            <LoadingContainer>
              <Loading size={50} animating={true} color={Colors.blue300} />
            </LoadingContainer>
          ) : (
            <>
              <UserProfileTop
                isFollowing={isFollowing}
                user={viewingUser}
                loggedInUser={user.user}
                followers={followers.followers}
                following={following.following}
                reviews={reviews}
                averageRating={averageRating}
                tags={tags}
                navigation={navigation}
                isOwnProfile={isOwnProfile}
              />
              <UserProfileFeed
                user={viewingUser}
                restaurants={restaurants}
                navigation={navigation}
                setViewing={setViewing}
                viewOptions={viewOptions}
                reviews={reviews}
              />
            </>
          )}
        </ScrollView>
      )}
    </SafeArea>
  );
};
