import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabIcon from "../components/TabIcon";
import MethodSelect from "../screens/Order/MethodSelect";
import Chats from "../screens/Chat/Chats";
import Favorites from "../screens/Restaurant/Favorites";
import Orders from "../screens/Order/Orders";
import SettingsHome from "../screens/Settings/SettingsHome";
import styles from "../styles";
import { StatusBar } from "react-native";
import { useReactiveVar } from "@apollo/client";
import { myCallVar } from "../reactiveVars";
import MyCall from "../screens/Order/MyCall";

const TabNavigation = createBottomTabNavigator();

const SELECTED_TAB_COLOR = styles.themeColor;

export default ({ navigation, route }) => {
  const myCall = useReactiveVar(myCallVar);
  console.log(myCall);
  return (
    <>
      <StatusBar />
      <TabNavigation.Navigator
        tabBarOptions={{
          tabStyle: {
            paddingVertical: 5,
          },
          style: {
            backgroundColor: styles.bgColor,
            height: 55,
            paddingTop: 15,
            paddingBottom: 3,
            // alignItems : "center",
          },
          labelStyle: {
            marginTop: 13,
          },
          activeTintColor: SELECTED_TAB_COLOR,
        }}
      >
        <TabNavigation.Screen
          name="Home"
          component={myCall ? MyCall : MethodSelect}
          options={{
            tabBarIcon: ({ focused }) =>
              focused ? (
                <TabIcon name="home" color={SELECTED_TAB_COLOR} />
              ) : (
                <TabIcon name="home-outline" />
              ),
            tabBarLabel: "홈",
          }}
        />
        <TabNavigation.Screen
          name="Chats"
          component={Chats}
          options={{
            tabBarIcon: ({ focused }) =>
              focused ? (
                <TabIcon
                  name="chatbubble-ellipses"
                  size={24}
                  color={SELECTED_TAB_COLOR}
                />
              ) : (
                <TabIcon name="chatbubble-ellipses-outline" size={24} />
              ),
            tabBarLabel: "채팅",
          }}
        />
        <TabNavigation.Screen
          name="Favorites"
          component={Favorites}
          options={{
            tabBarIcon: ({ focused }) =>
              focused ? (
                <TabIcon
                  name="heart-sharp"
                  size={24.5}
                  color={SELECTED_TAB_COLOR}
                />
              ) : (
                <TabIcon name="heart-outline" size={24.5} />
              ),
            tabBarLabel: "찜",
          }}
        />
        <TabNavigation.Screen
          name="Orders"
          component={Orders}
          options={{
            tabBarIcon: ({ focused }) =>
              focused ? (
                <TabIcon name="newspaper" color={SELECTED_TAB_COLOR} />
              ) : (
                <TabIcon name="newspaper-outline" />
              ),
            tabBarLabel: "주문내역",
          }}
        />
        <TabNavigation.Screen
          name="User"
          component={SettingsHome}
          options={{
            tabBarIcon: ({ focused }) =>
              focused ? (
                <TabIcon
                  name="person-circle"
                  size={25}
                  color={SELECTED_TAB_COLOR}
                />
              ) : (
                <TabIcon name="person-circle-outline" size={25} />
              ),
            tabBarLabel: "계정",
          }}
        />
      </TabNavigation.Navigator>
    </>
  );
}
