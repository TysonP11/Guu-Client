import React from "react";

import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import { RestaurantDetailScreen } from "../../features/restaurants/screens/restaurant-detail.screen";
import { MyProfileScreen } from "../../features/social/screens/user-profile.screen";
import { FollowListUser } from "../../features/social/screens/user-follow-list.screen";
import { UserMenuScreen } from "../../features/social/screens/user-menu.screen";

const SocialStack = createStackNavigator();

export const SocialNavigator = () => {
  return (
    <SocialStack.Navigator
      headerMode="screen"
      screenOptions={{
        ...TransitionPresets.ModalPresentationIOS,
      }}
    >
      <SocialStack.Screen
        name="Profile"
        component={MyProfileScreen}
        header={null}
      />
      <SocialStack.Screen
        name="RestaurantDetail"
        component={RestaurantDetailScreen}
      />
      <SocialStack.Screen
        name="FollowList"
        component={FollowListUser}
        options={({ route }) => ({ title: route.params.name })}
      />
      <SocialStack.Screen name="UserMenu" component={UserMenuScreen} />
    </SocialStack.Navigator>
  );
};
