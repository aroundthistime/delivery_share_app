import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Menus from "../screens/Restaurant/Menus";
import RestaurantInfo from "../screens/Restaurant/RestaurantInfo";
import RestaurantReviews from "../screens/Review/Restaurant/RestaurantReviews";
import styles from "../styles";

const TabNavigation = createMaterialTopTabNavigator();

export default ({navigation, route}) => (
    <TabNavigation.Navigator
        tabBarOptions={{
            activeTintColor : styles.themeColor,
            inactiveTintColor : "gray",
            indicatorStyle : {
                backgroundColor : styles.themeColor
            },
            labelStyle : {
                fontSize : 14
            }
        }}
        backBehavior="initialRoute"
    >
        <TabNavigation.Screen 
            name="Menus"
            component={Menus}
            options={{
                title : "메뉴"
            }}
        />
        <TabNavigation.Screen 
            name="RestaurantInfo"
            component={RestaurantInfo}
            options={{
                title : "식당 정보"
            }}
        />
        <TabNavigation.Screen 
            name="RestaurantReviews"
            component={RestaurantReviews}
            options={{
                title : "리뷰"
            }}
        />
    </TabNavigation.Navigator>
)