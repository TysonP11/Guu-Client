import React, { useState, useEffect } from "react";

import { locationRequest, locationTransform } from "./location.service";
import * as Location from "expo-location";

export const LocationContext = React.createContext();

export const LocationContextProvider = ({ children }) => {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [address, setAddress] = useState(null);

  let apiKey = "AIzaSyAHLhAqzLF3Xr3AEaME4SMsE4UGtNjPEVk";

  const onSearch = (searchKeyword) => {
    setIsLoading(true);
    setKeyword(searchKeyword);
  };

  const getLocation = () => {
    (async () => {
      //console.log("here");
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        console.log("permission denied");
      }

      Location.setGoogleApiKey(apiKey);

      //console.log(status);

      let { coords } = await Location.getCurrentPositionAsync();

      setUserLocation(coords);

      //console.log(coords);

      if (coords) {
        let { longitude, latitude } = coords;

        let regionName = await Location.reverseGeocodeAsync({
          longitude,
          latitude,
        });
        setAddress(regionName[0]);
        //console.log(address);
        //console.log(regionName, "nothing");
      }

      // console.log();
    })();
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <LocationContext.Provider
      value={{
        isLoading,
        error,
        location,
        search: onSearch,
        keyword,
        userLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
