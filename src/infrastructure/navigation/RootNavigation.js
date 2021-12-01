import { StackActions } from "@react-navigation/native";

export function navigate(name, params) {
  StackActions.navigate(name, params);
}
