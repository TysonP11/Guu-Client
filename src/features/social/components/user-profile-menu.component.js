import * as React from "react";

import { Button, Menu, Divider, Provider } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import {
  MenuWrapper,
  MenuWrapperStyle,
  ProfileMenuContainer,
} from "./user-profile.styles";

export const ProfileMenu = () => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <Provider>
      <ProfileMenuContainer>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Button onPress={openMenu}>
              <Ionicons name="md-menu" size={24} color="black" />
            </Button>
          }
        >
          <MenuWrapper style={MenuWrapperStyle}>
            <Menu.Item onPress={() => {}} title="Item 1" />
            <Menu.Item onPress={() => {}} title="Item 2" />
            <Divider />
            <Menu.Item onPress={() => {}} title="Item 3" />
          </MenuWrapper>
        </Menu>
      </ProfileMenuContainer>
    </Provider>
  );
};
