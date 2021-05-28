import React, { useState } from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, ActivityIndicator } from "react-native";
import Menus from "../screens/Restaurant/Menus";
import RestaurantInfo from "../screens/Restaurant/RestaurantInfo";
import RestaurantReviews from "../screens/Review/Restaurant/RestaurantReviews";
import styles from "../styles";

const TabNavigation = createMaterialTopTabNavigator();

export default ({ navigation, route }) => {
    const [activeTab, setActiveTab] = useState("Menus");
    return (
        <TabNavigation.Navigator
            tabBarOptions={{
                activeTintColor: styles.themeColor,
                inactiveTintColor: "gray",
                indicatorStyle: {
                    backgroundColor: styles.themeColor
                },
                labelStyle: {
                    fontSize: 14
                }
            }}
            backBehavior="initialRoute"
        >
            <TabNavigation.Screen
                name="Menus"
                component={activeTab === "Menus" ? Menus : DefaultScreen}
                options={{
                    title: "메뉴"
                }}
                listeners={{ focus: () => setActiveTab("Menus") }}
            />
            <TabNavigation.Screen
                name="RestaurantInfo"
                component={activeTab === "RestaurantInfo" ? RestaurantInfo : DefaultScreen}
                options={{
                    title: "식당 정보"
                }}
                listeners={{ focus: () => setActiveTab("RestaurantInfo") }}
            />
            <TabNavigation.Screen
                name="RestaurantReviews"
                component={activeTab === "RestaurantReviews" ? RestaurantReviews : DefaultScreen}
                options={{
                    title: "리뷰"
                }}
                listeners={{ focus: () => setActiveTab("RestaurantReviews") }}
            />
        </TabNavigation.Navigator>
    )
}

const DefaultScreen = () => (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "white" }}>
        <ActivityIndicator color={styles.themeColor} size="large" />
    </View>
)