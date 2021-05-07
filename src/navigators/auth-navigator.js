import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SignIn from "../screens/signin";
import { StackNavHeaderOptions } from "./headerStyles";
import registerNavigator from "./register-navigator";

const { Navigator, Screen } = createStackNavigator();

export default AuthNavigator = () => (
  <Navigator>
    <Screen
      name="SignIn"
      component={SignIn}
      options={StackNavHeaderOptions.primary}
    />
    <Screen
      name="Register"
      component={registerNavigator}
      options={{
        ...StackNavHeaderOptions.secondary,
        title: "New account",
      }}
    />
  </Navigator>
);
