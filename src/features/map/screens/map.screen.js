import React, { useContext, useState, useEffect } from "react";
import MapView from "react-native-maps";
import styled from "styled-components/native";

import { LocationContext } from "../../../services/location/location.context";
import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";

import { Search } from "../components/search.component";
import { MapCallout } from "../components/map-callout.component";
import { Image, View } from "react-native";

const Map = styled(MapView)`
  height: 100%;
  width: 100%;
`;

export const MapScreen = ({ navigation }) => {
  const { location, userLocation } = useContext(LocationContext);
  const {
    restaurants = [],
    reviews: { reviews },
    isLoading,
    retrieveRestaurants,
  } = useContext(RestaurantsContext);

  const [latDelta, setLatDelta] = useState(0);

  //const { lat, lng, viewport } = location;

  const { latitude, longitude } = userLocation;

  // useEffect(() => {
  //   const northeastLat = viewport.northeast.lat;
  //   const southwestLat = viewport.southwest.lat;

  //   setLatDelta(northeastLat - southwestLat);
  // }, [location, viewport]);

  useEffect(() => {
    retrieveRestaurants("");
  }, []);

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
      {isLoading ||
      reviews === null ||
      reviews === undefined ||
      reviews.length === 0 ? (
        <View></View>
      ) : (
        <Map
          region={{
            latitude: parseFloat(reviews[0].restaurantId.address.latitude),
            longitude: parseFloat(reviews[0].restaurantId.address.longitude),
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
        >
          {reviews.map((review) => {
            return (
              <MapView.Marker
                key={review._id}
                title={review.restaurantId.name}
                coordinate={{
                  latitude: parseFloat(review.restaurantId.address.latitude),
                  longitude: parseFloat(review.restaurantId.address.longitude),
                }}
              >
                <Image
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 200,
                    borderWidth: 2,
                    borderColor:
                      review.rating.$numberDecimal <= 1
                        ? "#869fb4"
                        : review.rating.$numberDecimal <= 2
                        ? "#f8f8f8"
                        : review.rating.$numberDecimal <= 3
                        ? "#f9a11b"
                        : "#f26522",
                  }}
                  source={{
                    uri: "https://picsum.photos/200",
                  }}
                />
                <MapView.Callout
                  onPress={() =>
                    navigation.navigate("RestaurantDetail", {
                      restaurant: review,
                    })
                  }
                >
                  <MapCallout restaurant={review} />
                </MapView.Callout>
              </MapView.Marker>
            );
          })}
        </Map>
      )}
    </>
  );
};
