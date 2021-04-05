import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigation from "./TabNavigation";
import Calls from "../screens/Call/Calls";
import Call from "../screens/Call/Call";
import Chat from "../screens/Chat/Chat";
import Cart from "../screens/Order/Cart";
import Categories from "../screens/Order/Categories";

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
        <LoggedInNavigation.Screen 
            name="Calls"
            component={Calls}
            options={{
                title : "주변 콜 찾기"
            }}
        />
        <LoggedInNavigation.Screen 
            name="Call"
            component={Call}
        />
        <LoggedInNavigation.Screen
            name="Chat"
            component={Chat}
        />
        <LoggedInNavigation.Screen
            name="Cart"
            component={Cart}
            options={{
                title : "장바구니"
            }}
        />
        <LoggedInNavigation.Screen
            name="Categories"
            component={Categories}
            options={{
                title : "음식 카테고리 선택"
            }}
        />
    </LoggedInNavigation.Navigator>
)