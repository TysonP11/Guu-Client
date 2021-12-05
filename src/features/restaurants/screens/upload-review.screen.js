import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components/native";
import { ActivityIndicator, Colors } from "react-native-paper";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";

import { Text } from "../../../components/typography/text.component";
import { View } from "react-native";
import { RestaurantSearch } from "../components/restaurant-search.component";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Spacer } from "../../../components/spacer/spacer.component";
import { RestaurantInfoCard } from "../components/restaurant-info-card.component";
import { RestaurantInfoCardAlt } from "../components/restaurant-info-card-alternative.component";
import {
  RatingPill,
  RatingButtonContainer,
  RatingButton,
  RatingButtonSmall,
  RatingButton2,
  RatingButtonSmall2,
} from "../components/restaurant-info-card.styles";

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;
const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

const RestaurantList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
    height: 330,
  },
})``;

export const UploadReviewScreen = ({ navigation }) => {
  const {
    isLoading,
    restaurants: { restaurants },
    selected,
    setSelected,
  } = useContext(RestaurantsContext);

  return (
    <SafeArea>
      <RestaurantSearch />
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <LoadingContainer>
            <Loading size={50} animating={true} color={Colors.blue300} />
          </LoadingContainer>
        </View>
      ) : (
        <>
          {restaurants === null || restaurants === undefined ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>Search for something</Text>
            </View>
          ) : (
            <>
              {restaurants.length === 0 ? (
                <></>
              ) : (
                <>
                  {!selected ? (
                    <RestaurantList
                      data={restaurants}
                      horizontal={true}
                      renderItem={({ item }) => {
                        return (
                          <View>
                            <TouchableOpacity
                              onPress={() =>
                                navigation.navigate("RestaurantDetail", {
                                  restaurant: item,
                                  pathFrom: "reviewUpload",
                                })
                              }
                            >
                              <Spacer position="right" size="large">
                                <RestaurantInfoCardAlt restaurant={item} />
                              </Spacer>
                            </TouchableOpacity>

                            <Spacer position="top" size="large">
                              <View
                                style={{
                                  alignSelf: "center",
                                }}
                              >
                                <RatingPill
                                  onPress={() => {
                                    setSelected(item);
                                  }}
                                >
                                  <Text>Review</Text>
                                </RatingPill>
                              </View>
                            </Spacer>
                          </View>
                        );
                      }}
                      keyExtractor={(item) => item._id}
                    />
                  ) : (
                    <View style={{ flex: 1, alignItems: "center" }}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("RestaurantDetail", {
                            restaurant: selected,
                            pathFrom: "reviewUpload",
                          })
                        }
                      >
                        <Spacer position="top" size="large">
                          <RestaurantInfoCardAlt restaurant={selected} />
                        </Spacer>
                      </TouchableOpacity>
                      <View style={{ top: 100 }}>
                        <RatingButtonContainer>
                          <RatingButtonSmall>
                            <Text>Awful</Text>
                          </RatingButtonSmall>
                          <RatingButton>
                            <Text>Meh</Text>
                          </RatingButton>
                          <RatingButton2>
                            <Text>Good</Text>
                          </RatingButton2>
                          <RatingButtonSmall2>
                            <Text variant="small">Awesome</Text>
                          </RatingButtonSmall2>
                        </RatingButtonContainer>
                      </View>
                    </View>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </SafeArea>
  );
};
