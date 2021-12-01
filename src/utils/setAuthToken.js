import AsyncStorage from "@react-native-community/async-storage";
import axios from "./axios";

const setAuthToken = async (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    console.log("setAuthToken" + axios.defaults.headers);
    await AsyncStorage.setItem("jwtToken", token);
  } else {
    delete axios.defaults.headers.common["Authorization"];
    await AsyncStorage.removeItem("jwtToken");
  }
};

export default setAuthToken;
