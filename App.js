import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components/native";
import * as firebase from "firebase";

import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";
import {
  useFonts as useRighteous,
  Righteous_400Regular,
} from "@expo-google-fonts/righteous";

import { theme } from "./src/infrastructure/theme";
import { Navigation } from "./src/infrastructure/navigation";

import { RestaurantsContextProvider } from "./src/services/restaurants/restaurants.context";
import { LocationContextProvider } from "./src/services/location/location.context";
import { FavouritesContextProvider } from "./src/services/favourites/favourites.context";
import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";
import { ProfileContextProvider } from "./src/services/profile/user-profile.context";

const firebaseConfig = {
  apiKey: "AIzaSyBmKwzXIQ_7iufDh4U6GyU_4Wc-hyDEnf8",
  authDomain: "mealstogo-b2612.firebaseapp.com",
  projectId: "mealstogo-b2612",
  storageBucket: "mealstogo-b2612.appspot.com",
  messagingSenderId: "158582890553",
  appId: "1:158582890553:web:2ef50439fcd80f2ede2de8",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  const [righteousLoaded] = useRighteous({
    Righteous_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded || !righteousLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          <ProfileContextProvider>
            <FavouritesContextProvider>
              <LocationContextProvider>
                <RestaurantsContextProvider>
                  <Navigation />
                </RestaurantsContextProvider>
              </LocationContextProvider>
            </FavouritesContextProvider>
          </ProfileContextProvider>
        </AuthenticationContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
