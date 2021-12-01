import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Text, Button } from "react-native";
import { colors } from "../theme/colors";

import { SafeArea } from "../../components/utility/safe-area.component";

import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { SocialNavigator } from "./social.navigator";
import { RestaurantsNavigator } from "./restaurants.navigator";
import { MapScreen } from "../../features/map/screens/map.screen";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Restaurants: "md-restaurant",
  Map: "md-search",
  MyProfile: "md-person",
};

const Settings = () => {
  const { onLogout } = useContext(AuthenticationContext);
  return (
    <SafeArea>
      <Text>Settings</Text>
      <Button title="logout" onPress={() => onLogout()} />
    </SafeArea>
  );
};

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({ size, color }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
  };
};

export const AppNavigator = () => (
  <Tab.Navigator
    screenOptions={createScreenOptions}
    tabBarOptions={{
      activeTintColor: colors.brand.primary,
      inactiveTintColor: "grey",
      showLabel: false,
    }}
  >
    <Tab.Screen name="Restaurants" component={RestaurantsNavigator} />
    <Tab.Screen name="Map" component={MapScreen} />
    <Tab.Screen name="MyProfile" component={SocialNavigator} />
  </Tab.Navigator>
);
