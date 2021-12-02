import React, { useContext, useState } from "react";
import { FlatList, TouchableOpacity, Image, View } from "react-native";
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
import { ScrollView } from "react-native-gesture-handler";
import { Text } from "../../../components/typography/text.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";

export const UserMenuScreen = ({ navigation }) => {
  const { user, onLogout } = useContext(AuthenticationContext);

  //console.log(route.params);
  return (
    <View>
      <ScrollView>
        <UserListItem>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={() =>
              navigation.navigate("My Profile", {
                user: user.user,
              })
            }
          >
            <Spacer position="right" size="small">
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
            <Text variant={"label"}> My Profile</Text>
          </TouchableOpacity>
        </UserListItem>
        <UserListItem>
          <TouchableOpacity>
            <Text variant={"label"}>Edit Profile</Text>
          </TouchableOpacity>
        </UserListItem>
        <UserListItem>
          <TouchableOpacity onPress={() => onLogout()}>
            <Text variant={"label"}>Sign Out</Text>
          </TouchableOpacity>
        </UserListItem>
      </ScrollView>
    </View>
  );
};
