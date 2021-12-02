import React, { useContext, useState } from "react";
import { FlatList, Text, TouchableOpacity, Image, View } from "react-native";
import styled from "styled-components/native";
import { ActivityIndicator, Colors } from "react-native-paper";
import { SafeArea } from "../../../components/utility/safe-area.component";

import { ProfileContext } from "../../../services/profile/user-profile.context";

import {
  UserListItem,
  ProfileNameListItem,
} from "../components/user-profile.styles";
import { Spacer } from "../../../components/spacer/spacer.component";
import { UserProfileHeader } from "../components/user-profile-header.component";

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;
const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const FollowListUser = ({ navigation, route }) => {
  const { users } = route.params;
  const user = {
    username: "thso11",
  };
  const { following, followers, isLoading } = useContext(ProfileContext);

  //console.log(route.params);
  return (
    <View>
      <UserProfileHeader user={user} />
      <FlatList
        data={users}
        renderItem={({ item }) => {
          return (
            <UserListItem>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("My Profile", {
                    user: item,
                  })
                }
              >
                <Spacer position="left" size="large">
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
                </Spacer>

                <ProfileNameListItem>{item.username}</ProfileNameListItem>
              </TouchableOpacity>
            </UserListItem>
          );
        }}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};
