import * as React from "react";

import { Button, Menu, Divider, Provider } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import {
  MenuWrapper,
  MenuWrapperStyle,
  ProfileMenuContainer,
} from "./user-profile.styles";

export const ProfileMenu = ({ navigation }) => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <Button onPress={() => navigation.navigate("UserMenu")}>
      <Ionicons name="md-menu" size={24} color="black" />
    </Button>
  );
};
