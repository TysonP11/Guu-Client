import React from "react";

import { Text, View } from "react-native";
import { ProfileMenu } from "./user-profile-menu.component";
import {
  MenuWrapper,
  ProfileHeader,
  ProfileMenuContainer,
  ProfileName,
} from "./user-profile.styles";
import { Button, Menu, Divider, Provider } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react/cjs/react.development";
import { ProfileContext } from "../../../services/profile/user-profile.context";

export const UserProfileHeader = ({ user }) => {
  const { username } = user;
  const { visible, closeMenu, openMenu } = useContext(ProfileContext);

  return (
    <ProfileHeader>
      <ProfileName>{username}</ProfileName>
      <ProfileMenu />
    </ProfileHeader>
  );
};
