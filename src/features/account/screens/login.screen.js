import React, { useState, useContext } from "react";
import { ActivityIndicator, Colors } from "react-native-paper";
import { TextInput, Image } from "react-native";
import { SafeArea } from "../../../components/utility/safe-area.component";
import {
  NavigationButton,
  NavigationContainer,
  NavigationText,
  AccountBottomContainer,
  AccountContainer,
  AuthButton,
  ErrorContainer,
  Title,
  AccountLogoContainer,
  ButtonText,
  AgreementsText,
  AuthInputStyles,
  SocialLoginContainer,
  SocialButtonContainer,
  AccountRowContainer,
} from "../components/account.styles";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { TouchableOpacity } from "react-native-gesture-handler";

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin, error, isLoading } = useContext(AuthenticationContext);
  return (
    <SafeArea>
      <AccountLogoContainer>
        <Title>Guu</Title>
      </AccountLogoContainer>
      <AccountContainer>
        <AccountRowContainer>
          <TextInput
            placeholder="Username"
            value={email}
            textContentType="username"
            keyboardType="email-address"
            autoCapitalize="none"
            style={AuthInputStyles.login}
            onChangeText={(u) => setEmail(u)}
          />
        </AccountRowContainer>

        <Spacer size="large">
          <AccountRowContainer>
            <TextInput
              placeholder="Password"
              value={password}
              textContentType="password"
              secureTextEntry
              autoCapitalize="none"
              style={AuthInputStyles.login}
              onChangeText={(p) => setPassword(p)}
            />
          </AccountRowContainer>
        </Spacer>
        <Spacer size="large">
          <ErrorContainer size="large">
            {error && <Text variant="error">{error}</Text>}
          </ErrorContainer>
        </Spacer>
        <Spacer size="large">
          {!isLoading ? (
            <AuthButton onPress={() => onLogin(email, password)}>
              <ButtonText>Join</ButtonText>
            </AuthButton>
          ) : (
            <ActivityIndicator animating={true} color={Colors.blue300} />
          )}
        </Spacer>
      </AccountContainer>
      <SocialLoginContainer>
        <NavigationText>
          -------------------- OR --------------------
        </NavigationText>
        <SocialButtonContainer>
          <TouchableOpacity>
            <Image source={require("../../../../assets/icons/Group20.png")} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require("../../../../assets/icons/XMLID1.png")} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require("../../../../assets/icons/XMLID36.png")} />
          </TouchableOpacity>
        </SocialButtonContainer>
      </SocialLoginContainer>
      <AccountBottomContainer>
        <NavigationContainer>
          <NavigationText>New to Guu? </NavigationText>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <NavigationButton>Sign up</NavigationButton>
          </TouchableOpacity>
        </NavigationContainer>
        <AgreementsText>Terms and Aggreements</AgreementsText>
      </AccountBottomContainer>
    </SafeArea>
  );
};
