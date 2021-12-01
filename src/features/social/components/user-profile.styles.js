import styled from "styled-components/native";
import { Card, Button } from "react-native-paper";
import { StyleSheet } from "react-native";
import { Text } from "../../../components/typography/text.component";
import { colors } from "../../../infrastructure/theme/colors";

export const Icon = styled.Image`
  width: 15px;
  height: 15px;
`;

export const FollowButton = styled.TouchableOpacity.attrs({
  style: {
    shadowColor: "rgba(0,0,0, .4)", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: "#fff",
    elevation: 2, // Android
  },
})`
  padding: ${(props) => props.theme.space[2]};
  border-radius: 11px;
  background-color: ${colors.brand.primary};
  padding-left: ${(props) => props.theme.space[4]};
  padding-right: ${(props) => props.theme.space[4]};
`;

export const ButtonText = styled(Text).attrs({
  variant: "body",
})`
  color: #ffffff;
`;

export const ProfileTop = styled.View`
  background-color: #f8f8f8;
  flex: 4;
`;

export const ProfileFeed = styled.View`
  background-color: #f8f8f8;
  flex: 6;
  padding: ${(props) => props.theme.space[2]};
`;

export const ProfileHeader = styled.View`
  background-color: #f8f8f8;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  padding: ${(props) => props.theme.space[2]};
  padding-bottom: ${(props) => props.theme.space[0]};
`;

export const OverallReviewsInfo = styled.View`
  background-color: #f8f8f8;
  flex: 1;
  margin-left: ${(props) => props.theme.space[2]};
  height: 100%;
`;

export const Rating = styled.View`
  flex-direction: row;
  padding-top: ${(props) => props.theme.space[2]};
  padding-bottom: ${(props) => props.theme.space[2]};
`;

export const ViewSelected = styled.TouchableOpacity`
  border-bottom-color: ${colors.brand.primary};
  border-bottom-width: 2px;
  align-items: center;
  flex: 1;
`;

export const UserListItem = styled.View`
  background-color: #f8f8f8;
  flex-direction: row;
  justify-content: flex-start;
  padding: ${(props) => props.theme.space[2]};
  align-items: center;
`;

export const ViewDefault = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
`;

export const ViewSelectContainer = styled.View`
  flex-direction: row;
  background-color: #f8f8f8;
  justify-content: space-between;
`;

export const RestaurantView = styled.View`
  background-color: #f8f8f8;
  flex: 1;
`;

export const TagPill = styled.TouchableOpacity`
  border-width: 1px;
  background-color: #f8f8f8;
  border-color: #c4c4c4;
  border-radius: 14px;
  padding: ${(props) => props.theme.space[1]};
  padding-left: ${(props) => props.theme.space[2]};
  padding-right: ${(props) => props.theme.space[2]};
  margin-right: ${(props) => props.theme.space[2]};
  margin-bottom: ${(props) => props.theme.space[1]};
`;

export const ReviewsInfo = styled.View`
  background-color: #f8f8f8;
  flex: 1;
  flex-direction: row;
  padding: ${(props) => props.theme.space[2]};
  align-items: center;
`;

export const TagsContainer = styled.View`
  background-color: #f8f8f8;
  overflow: hidden;
  flex: 4;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  padding-left: ${(props) => props.theme.space[2]};
`;

export const ProfileInfo = styled.View`
  background-color: #f8f8f8;
  flex: 3;
  padding: ${(props) => props.theme.space[2]};
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const MenuWrapper = styled.View`
  bottom: 20px;
`;

export const MenuWrapperStyle = StyleSheet.create({
  button: {
    zIndex: 3,
    elevation: 3,
  },
});

export const ProfileMenuContainer = styled.View`
  background-color: #f8f8f8;
  width: 50px;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
`;

export const ProfileFollowContainer = styled.View`
  background-color: #f8f8f8;
  flex: 1;
  padding: ${(props) => props.theme.space[2]};
  flex-direction: row;
  justify-content: space-evenly;
`;

export const ProfileFollowDetail = styled.View`
  background-color: #f8f8f8;
  justify-content: center;
  padding: ${(props) => props.theme.space[2]};
  align-items: center;
`;

export const ProfileName = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.title};
  margin-left: ${(props) => props.theme.space[4]};
`;

export const ProfileNameListItem = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.body};
  margin-left: ${(props) => props.theme.space[2]};
`;

export const Info = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

export const Section = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const SectionEnd = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`;
