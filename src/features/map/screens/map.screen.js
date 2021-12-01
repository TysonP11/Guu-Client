import React, { useContext, useState, useEffect } from "react";
import MapView from "react-native-maps";
import styled from "styled-components/native";

import { LocationContext } from "../../../services/location/location.context";
import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";

import { Search } from "../components/search.component";
import { MapCallout } from "../components/map-callout.component";
import { View } from "react-native";

const Map = styled(MapView)`
  height: 100%;
  width: 100%;
`;

export const MapScreen = ({ navigation }) => {
  const { location, userLocation } = useContext(LocationContext);
  const { restaurants = [] } = useContext(RestaurantsContext);

  const [latDelta, setLatDelta] = useState(0);

  //const { lat, lng, viewport } = location;

  const { latitude, longitude } = userLocation;

  // useEffect(() => {
  //   const northeastLat = viewport.northeast.lat;
  //   const southwestLat = viewport.southwest.lat;

  //   setLatDelta(northeastLat - southwestLat);
  // }, [location, viewport]);

  useEffect(() => {
    if (!userLocation) {
      return;
    }
    const viewport2 = {
      northeast: {
        lat: userLocation.longitude,
        lng: userLocation.latitude,
      },
      southwest: {
        lat: userLocation.latitude,
        lng: userLocation.longitude,
      },
    };

    const northeastLat = viewport2.northeast.lat;
    const southwestLat = viewport2.southwest.lat;

    setLatDelta(northeastLat - southwestLat);
  }, [userLocation]);

  return (
    <>
      <Search />
      {!latitude ? (
        <View></View>
      ) : (
        <Map
          region={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
        >
          {restaurants.map((restaurant) => {
            return (
              <MapView.Marker
                key={restaurant.name}
                title={restaurant.name}
                coordinate={{
                  latitude: restaurant.geometry.location.lat,
                  longitude: restaurant.geometry.location.lng,
                }}
              >
                <MapView.Callout
                  onPress={() =>
                    navigation.navigate("RestaurantDetail", {
                      restaurant,
                    })
                  }
                >
                  <MapCallout restaurant={restaurant} />
                </MapView.Callout>
              </MapView.Marker>
            );
          })}
        </Map>
      )}
    </>
  );
};
