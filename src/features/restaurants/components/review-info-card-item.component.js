import React, { useEffect } from 'react'
import { TouchableOpacity, Image } from 'react-native'
import { ActivityIndicator, Colors } from 'react-native-paper'
import { Spacer } from '../../../components/spacer/spacer.component'
import styled from 'styled-components/native'
import { Text } from '../../../components/typography/text.component'
import { RestaurantInfoCard } from '../components/restaurant-info-card.component'
import {
  SingleCardView,
  ReviewByContainer,
  RatingPill,
  RatingButtonContainer,
  RatingButton,
  RatingButtonSmall,
  RatingButton2,
  RatingButtonSmall2,
} from './restaurant-info-card.styles'
import { ProfileNameListItem } from '../../social/components/user-profile.styles'
const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`
const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`

const ratingMap = new Map()
ratingMap.set('1', 'Awful')
ratingMap.set('2', 'Meh')
ratingMap.set('3', 'Good')
ratingMap.set('4', 'Awesome')

const ratingTexts = ['Awful', 'Meh', 'Good', 'Awesome', 'Awesome']
export const ReviewInfoCardItem = ({
  review,
  navigation,
  checkReviewed
}) => {



  return !review ||
    !navigation ? (
    <LoadingContainer>
      <Loading size={50} animating={true} color={Colors.blue300} />
    </LoadingContainer>
  ) : (
    <>
      <ReviewByContainer>
        <Text variant='label'>Rated </Text>
        <RatingPill>
          <Text>{ratingTexts[Math.floor(review.rating.$numberDecimal)]}</Text>
        </RatingPill>
        <Spacer position='right' size='medium'>
          <Text variant='label'>by </Text>
        </Spacer>
        <Image
          style={{
            width: 40,
            height: 40,
            borderRadius: 200,
            borderWidth: 2,
            //borderColor: colors.brand.primary,
          }}
          source={{
            uri: 'https://picsum.photos/200',
          }}
        />

        <ProfileNameListItem>
          <Text variant='label'>{review.userId.username}</Text>
        </ProfileNameListItem>
      </ReviewByContainer>
      <SingleCardView>
        <Spacer position='bottom' size='large'>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('RestaurantDetail', {
                restaurant: review,
              })
            }
          >
            <Spacer position='bottom' size='large'>
              <RestaurantInfoCard restaurant={review} />
            </Spacer>
          </TouchableOpacity>
        </Spacer>
      </SingleCardView>

      {/* {isReviewed ? (
        <Text>Reviewed</Text>
      ) : (
        <>
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
              <Text variant='small'>Awesome</Text>
            </RatingButtonSmall2>
          </RatingButtonContainer>
        </>
      )} */}
    </>
  )
}
