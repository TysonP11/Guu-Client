import styled from "styled-components/native";
import { StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../../../infrastructure/theme/colors";

import { Text } from "../../../components/typography/text.component";

export const AccountBackground = styled.ImageBackground.attrs({
  source: require("../../../../assets/home_bg.jpg"),
})`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const AccountCover = styled.View`
  flex: 1;
  background-color: #e5e5e5;
`;

export const AuthInputStyles = StyleSheet.create({
  login: {
    borderColor: "#C4C4C4",
    width: "100%",
    borderWidth: 1,
    borderRadius: 11,
    height: 39,
    backgroundColor: "#ffffff",
    padding: 8,
  },
  register: {
    borderColor: "#C4C4C4",
    width: "47%",
    borderWidth: 1,
    borderRadius: 11,
    height: 39,
    backgroundColor: "#ffffff",
    padding: 8,
  },
});

export const SocialButtonStyle = StyleSheet.create({
  button: {
    borderColor: "#C4C4C4",
    width: 40,
    borderWidth: 1,
    borderRadius: 50,
    backgroundColor: "#ffffff",
    padding: 8,
    height: 40,
    shadowColor: "#303838",
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
  },
});

export const AccountLogoContainer = styled.View`
  flex: 3;
  background-color: #f8f8f8;
  align-items: center;
  justify-content: center;
`;

export const SocialLoginContainer = styled.View`
  flex: 1;
  background-color: #f8f8f8;
  padding: ${(props) => props.theme.space[4]};
  margin-top: ${(props) => props.theme.space[2]};
`;

export const SocialButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  background-color: #f8f8f8;
  padding: ${(props) => props.theme.space[4]};
`;

export const AccountContainer = styled.View`
  flex: 2;
  background-color: #f8f8f8;
  padding: ${(props) => props.theme.space[4]};
  margin-top: ${(props) => props.theme.space[2]};
`;

export const AccountBottomContainer = styled.View`
  flex: 1.5;
  padding: ${(props) => props.theme.space[1]};
  justify-content: space-between;
`;

export const AccountRowContainer = styled.View`
  flex: 1;
  flex-direction: row;
  padding: ${(props) => props.theme.space[1]};
  justify-content: space-between;
`;

export const NavigationContainer = styled.View`
  padding: ${(props) => props.theme.space[2]};
  margin-top: ${(props) => props.theme.space[2]};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const AuthButton = styled(Button).attrs({
  color: colors.brand.secondary,
  mode: "contained",
})`
  padding: ${(props) => props.theme.space[2]};
  border-radius: 11px;
  top: 25px;
`;

export const AuthInput = styled(TextInput).attrs({
  mode: "outlined",
});

export const Title = styled(Text).attrs({
  variant: "logo",
})`
  font-style: normal;
  font-weight: normal;
  font-size: 96px;
  line-height: 119px;
  text-align: center;

  color: #e15f43;
`;

export const ButtonText = styled(Text).attrs({
  variant: "body",
})`
  color: #fff;
`;

export const AgreementsText = styled(Text)`
  font-family: Futura;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  text-align: center;

  color: #929292;
`;

export const NavigationText = styled(Text)`
  font-family: Futura;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  text-align: center;

  color: #929292;
`;

export const NavigationButton = styled(Text)`
  font-family: Futura;
  font-style: normal;
  font-weight: 500;
  font-size: 23px;
  line-height: 30px;
  text-align: center;

  color: #4b7eff;
  margin-left: ${(props) => props.theme.space[2]};
`;

export const ErrorContainer = styled.View`
  max-width: 300px;
  align-items: center;
  align-self: center;
  height: 20px;
  margin-top: ${(props) => props.theme.space[2]};
  margin-bottom: ${(props) => props.theme.space[2]};
  top: 30px;
`;
