import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MethodSelect from "../screens/Order/MethodSelect";
import TabNavigation from "./TabNavigation";

const LoggedInNavigation = createStackNavigator();

export default ({navigation, route}) => (
    <LoggedInNavigation.Navigator
        initialRouteName="TabNavigation"
    >
        <LoggedInNavigation.Screen 
            name="TabNavigation"
            component={TabNavigation}
            options={{
                headerShown : false
            }}
        />
    </LoggedInNavigation.Navigator>
)