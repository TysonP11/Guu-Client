import React from "react";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import {
  AccountBackground,
  AccountContainer,
  AccountCover,
  AuthButton,
  Title,
} from "../components/account.styles";

export const AccountScreen = ({ navigation }) => {
  return (
    <SafeArea>
      <AccountCover />
      <AccountContainer>
        <AuthButton
          icon="lock-open-outline"
          mode="contained"
          onPress={() => navigation.navigate("Login")}
        >
          Login
        </AuthButton>
        <Spacer size="large">
          <AuthButton
            icon="email"
            mode="contained"
            onPress={() => navigation.navigate("Register")}
          >
            Register
          </AuthButton>
        </Spacer>
      </AccountContainer>
    </SafeArea>
  );
};
