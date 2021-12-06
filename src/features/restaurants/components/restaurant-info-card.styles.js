import styled from 'styled-components/native'
import { Card } from 'react-native-paper'

export const Icon = styled.Image`
  width: 15px;
  height: 15px;
`

export const RestaurantCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  width: 99%;
`

export const RestaurantCardCover = styled(Card.Cover)`
  padding: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.bg.primary};
`

export const Address = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.caption};
`

export const Info = styled.View`
  padding: ${(props) => props.theme.space[3]};
`

export const Rating = styled.View`
  flex-direction: row;
  padding-top: ${(props) => props.theme.space[2]};
  padding-bottom: ${(props) => props.theme.space[2]};
`

export const Section = styled.View`
  flex-direction: row;
  align-items: center;
`

export const SectionEnd = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`

export const SingleCardView = styled.View`
  flex: 1;
  align-items: center;
`
export const RatingButtonContainer = styled.View`
  background-color: #f8f8f8;
  flex: 0.7;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
`

export const ReviewByContainer = styled.View`
  background-color: #f8f8f8;
  flex-direction: row;
  justify-content: center;
  padding: ${(props) => props.theme.space[2]};
  margin-top: ${(props) => props.theme.space[5]};
  align-items: center;
`

export const ProfileReviewList = styled.View`
  background-color: #f8f8f8;
  flex-direction: row;
  justify-content: center;
  padding: ${(props) => props.theme.space[2]};
  align-items: center;
`

export const RatingPill = styled.TouchableOpacity`
  border-width: 1px;
  background-color: #869fb4;
  border-color: #c4c4c4;
  border-radius: 14px;
  padding: ${(props) => props.theme.space[2]};
  margin-right: ${(props) => props.theme.space[1]};
`

export const RatingPill2 = styled.TouchableOpacity`
  border-width: 1px;
  background-color: #f8f8f8;
  border-color: #c4c4c4;
  border-radius: 14px;
  padding: ${(props) => props.theme.space[2]};
  margin-right: ${(props) => props.theme.space[1]};
`;

export const RatingPill3 = styled.TouchableOpacity`
  border-width: 1px;
  background-color: #f9a11b;
  border-color: #c4c4c4;
  border-radius: 14px;
  padding: ${(props) => props.theme.space[2]};
  margin-right: ${(props) => props.theme.space[1]};
`;

export const RatingPill4 = styled.TouchableOpacity`
  border-width: 1px;
  background-color: #f26522;
  border-color: #c4c4c4;
  border-radius: 14px;
  padding: ${(props) => props.theme.space[2]};
  margin-right: ${(props) => props.theme.space[1]};
`

export const OtherOptions = styled.TouchableOpacity`
  border-width: 1px;
  background-color: #f8f8f8;
  border-color: #c4c4c4;
  border-radius: 14px;
  padding: ${(props) => props.theme.space[2]};
  padding-right: ${(props) => props.theme.space[4]};
  padding-left: ${(props) => props.theme.space[4]};
`

export const OtherOptionsContainer = styled.View`
  background-color: #f8f8f8;
  flex-direction: row;
  justify-content: center;
  bottom: 100px;
  padding: ${(props) => props.theme.space[2]};
  align-items: flex-start;
`

export const RatingButton = styled.TouchableOpacity`
  border-width: 2px;
  width: 120px;
  height: 120px;
  background-color: #f8f8f8;
  border-color: #c4c4c4;
  border-radius: 50px;
  bottom: 20px;
  justify-content: center;
  padding: ${(props) => props.theme.space[2]};
  align-items: center;
`

export const RatingButtonActive = styled.TouchableOpacity`
  border-width: 2px;
  width: 120px;
  height: 120px;
  background-color: #33bfff;
  border-color: #c4c4c4;
  border-radius: 50px;
  bottom: 20px;
  justify-content: center;
  padding: ${(props) => props.theme.space[2]};
  align-items: center;
`
//${isReviewed ? '#33bfff' : '#f8f8f8'}

export const RatingButton2 = styled.TouchableOpacity`
  border-width: 2px;
  width: 120px;
  height: 120px;
  background-color: #f8f8f8;
  border-color: #c4c4c4;
  border-radius: 50px;
  bottom: 20px;
  justify-content: center;
  padding: ${(props) => props.theme.space[2]};
  align-items: center;
`

export const RatingButton2Active = styled.TouchableOpacity`
  border-width: 2px;
  width: 120px;
  height: 120px;
  background-color: #f9a11b;
  border-color: #c4c4c4;
  border-radius: 50px;
  bottom: 20px;
  justify-content: center;
  padding: ${(props) => props.theme.space[2]};
  align-items: center;
`
//${isReviewed ? '#f9a11b' : '#f8f8f8'}

export const RatingButtonSmall = styled.TouchableOpacity`
  border-width: 2px;
  width: 90px;
  height: 90px;
  background-color: #f8f8f8;
  border-color: #c4c4c4;
  border-radius: 37px;
  bottom: 20px;
  justify-content: center;
  padding: ${(props) => props.theme.space[2]};
  align-items: center;
`

export const RatingButtonSmallActive = styled.TouchableOpacity`
  border-width: 2px;
  width: 90px;
  height: 90px;
  background-color: #869fb4;
  border-color: #c4c4c4;
  border-radius: 37px;
  bottom: 20px;
  justify-content: center;
  padding: ${(props) => props.theme.space[2]};
  align-items: center;
`

//${isReviewed ? '#869fb4' : '#f8f8f8'}

export const RatingButtonSmall2 = styled.TouchableOpacity`
  border-width: 2px;
  width: 90px;
  height: 90px;
  background-color: #f8f8f8 ;
  border-color: #c4c4c4;
  border-radius: 37px;
  bottom: 20px;
  justify-content: center;
  padding: ${(props) => props.theme.space[2]};
  align-items: center;
`

export const RatingButtonSmall2Active = styled.TouchableOpacity`
  border-width: 2px;
  width: 90px;
  height: 90px;
  background-color: #f26522;
  border-color: #c4c4c4;
  border-radius: 37px;
  bottom: 20px;
  justify-content: center;
  padding: ${(props) => props.theme.space[2]};
  align-items: center;
`
// ${isReviewed ? '#f26522' : '#f8f8f8'}

export const ReviewListItem = styled.View`
  background-color: #f8f8f8;
  flex-direction: row;
  justify-content: flex-start;
  padding: ${(props) => props.theme.space[2]};
  align-items: center;
  height: 80px;
  padding-left: ${(props) => props.theme.space[3]};
  border-bottom-width: 1px;
  border-bottom-color: #c4c4c4;
`
