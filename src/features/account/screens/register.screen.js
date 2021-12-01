import React, { useState, useContext } from "react";
import { TextInput, Image } from "react-native";
import { ActivityIndicator, Colors } from "react-native-paper";
import { SafeArea } from "../../../components/utility/safe-area.component";
import {
  AccountBackground,
  AccountCover,
  AccountContainer,
  AuthButton,
  AuthInput,
  ErrorContainer,
  Title,
  AccountLogoContainer,
  NavigationButton,
  NavigationContainer,
  NavigationText,
  AccountBottomContainer,
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

export const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("first name");
  const [lastName, setLastName] = useState("last name");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");

  const { onRegister, isLoading, error } = useContext(AuthenticationContext);
  return (
    <SafeArea>
      <AccountLogoContainer>
        <Title>Guu</Title>
      </AccountLogoContainer>
      <AccountContainer>
        <AccountRowContainer>
          <TextInput
            placeholder="Email"
            value={email}
            textContentType="emailAddress"
            keyboardType="email-address"
            autoCapitalize="none"
            style={AuthInputStyles.register}
            onChangeText={(u) => setEmail(u)}
          />
          <TextInput
            placeholder="Username"
            value={username}
            textContentType="username"
            keyboardType="email-address"
            autoCapitalize="none"
            style={AuthInputStyles.register}
            onChangeText={(u) => setUsername(u)}
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
              style={AuthInputStyles.register}
              onChangeText={(p) => setPassword(p)}
            />
            <TextInput
              placeholder="Repeat Password"
              value={repeatedPassword}
              textContentType="password"
              secureTextEntry
              autoCapitalize="none"
              style={AuthInputStyles.register}
              onChangeText={(p) => setRepeatedPassword(p)}
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
            <AuthButton
              onPress={() =>
                onRegister(
                  firstName,
                  lastName,
                  email,
                  password,
                  repeatedPassword,
                  username
                )
              }
            >
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
          <NavigationText>Already a member? </NavigationText>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <NavigationButton>Sign in</NavigationButton>
          </TouchableOpacity>
        </NavigationContainer>
        <AgreementsText>Terms and Aggreements</AgreementsText>
      </AccountBottomContainer>
    </SafeArea>
  );
};
