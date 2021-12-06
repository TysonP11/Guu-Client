import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components/native'
import { ActivityIndicator, Colors } from 'react-native-paper'
import { SafeArea } from '../../../components/utility/safe-area.component'
import { RestaurantsContext } from '../../../services/restaurants/restaurants.context'
import { FavouritesContext } from '../../../services/favourites/favourites.context'
import { Search } from '../components/search.component'
import { ReviewInfoCardItem } from '../components/review-info-card-item.component'
import {
  OtherOptions,
  OtherOptionsContainer,
} from '../components/restaurant-info-card.styles'
import { Text } from '../../../components/typography/text.component'

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`
const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`

export const RestaurantsScreen = ({ navigation }) => {
  const {
    isLoading,
    restaurants,
    reviews: { reviews },
    retrieveRestaurants,
    checkReviewed,
    isReviewed,
    postReview
  } = useContext(RestaurantsContext)
  const { favourites } = useContext(FavouritesContext)
  const [isToggled, setIsToggled] = useState(false)
  const [reviewIndex, setReviewIndex] = useState(1)

  const switchReview = (maxLength) => {
    if (maxLength > 1) {
      setReviewIndex((prevState) => prevState % maxLength)
      setReviewIndex((prevState) => prevState + 1)
    } else {
      setReviewIndex(1)
    }
  }

  useEffect(() => {
    if (!reviews || !reviewIndex || reviews.length === 0) return
    checkReviewed(reviews[reviewIndex - 1].restaurantId._id)
  }, [reviews, reviewIndex])

  useEffect(() => {
    retrieveRestaurants('')
  }, [])

  return isLoading || !reviews || reviews.length === 0 ? (
    <LoadingContainer>
      <Loading size={50} animating={true} color={Colors.blue300} />
    </LoadingContainer>
  ) : (
    <SafeArea>
      <Search
        isFavouritesToggled={isToggled}
        onFavouritesToggle={() => setIsToggled(!isToggled)}
      />
      {/* {isToggled && (
        <FavouritesBar
          favourites={favourites}
          onNavigate={navigation.navigate}
        />
      )}
      <RestaurantList
        data={restaurants}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("RestaurantDetail", {
                  restaurant: item,
                })
              }
            >
              <Spacer position="bottom" size="large">
                <RestaurantInfoCard restaurant={item} />
              </Spacer>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.name}
      /> */}
      <Text variant='label'>{reviewIndex}</Text>
      <ReviewInfoCardItem
        review={reviews[reviewIndex - 1]}
        navigation={navigation}
        isReviewed={isReviewed}
        postReview={postReview}
        rating={reviews.length > 0 && reviews[reviewIndex - 1] && Math.floor(reviews[reviewIndex - 1].rating.$numberDecimal).toString()}
      />
      <OtherOptionsContainer>
        <OtherOptions onPress={() => switchReview(reviews.length)}>
          <Text>Not Interested</Text>
        </OtherOptions>
      </OtherOptionsContainer>
    </SafeArea>
  )
}
