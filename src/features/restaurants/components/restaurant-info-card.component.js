import React from "react";
import { SvgXml } from "react-native-svg";
import { View } from "react-native";

import { Favourite } from "../../../components/favourites/favourite.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import star from "../../../../assets/star";
import open from "../../../../assets/open";

import {
  RestaurantCard,
  RestaurantCardCover,
  Info,
  Section,
  SectionEnd,
  Rating,
  Icon,
  Address,
} from "./restaurant-info-card.styles";

export const RestaurantInfoCard = ({ restaurant = {} }) => {
  const {
    name = "Some Restaurant",
    icon = "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
    photos = [
      "https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg",
    ],
    address = "100 some random street",
    isOpenNow = true,
    rating = 4,
    isClosedTemporarily = true,
    placeId,
    restaurantId,
  } = restaurant;

  console.log(restaurant);

  var ratingArray = Array.from(
    new Array(Math.floor(restaurantId.avgRating.$numberDecimal))
  );

  if (restaurantId.avgRating.$numberDecimal === "0") {
    console.log("zero rating");
    ratingArray = Array.from(new Array(1));
  }

  return (
    <RestaurantCard elevation={5}>
      <View>
        {/* <Favourite restaurant={restaurant} /> */}
        {restaurantId.photos.length > 0 ? (
          <RestaurantCardCover
            key={restaurantId.name}
            source={{
              uri:
                "https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg",
            }}
          />
        ) : (
          <RestaurantCardCover
            key={restaurantId.address.name}
            source={{
              uri:
                "https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg",
            }}
          />
        )}
      </View>
      <Info>
        <Text variant="label">{restaurantId.name}</Text>
        <Section>
          <Rating>
            {ratingArray.map((_, i) => (
              <SvgXml
                key={`star-${placeId}-${i}`}
                xml={star}
                width={20}
                height={20}
              />
            ))}
          </Rating>
          {/* <SectionEnd>
             {isClosedTemporarily && (
              <Text variant="error">CLOSED TEMPORARILY</Text>
            )} 
            <Spacer position="left" size="large">
              {isOpenNow && <SvgXml xml={open} width={20} height={20} />}
            </Spacer>
            <Spacer position="left" size="large">
              <Icon source={{ uri: icon }} />
            </Spacer>
          </SectionEnd> */}
        </Section>
        <Address>{address}</Address>
      </Info>
      {/* <View style={{ height: 50 }}>
        <Text></Text>
      </View> */}
    </RestaurantCard>
  );
};
