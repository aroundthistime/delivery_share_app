import React from "react";
import { TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import TabNavigation from "./TabNavigation";
import Calls from "../screens/Call/Calls";
import Call from "../screens/Call/Call";
import Chat from "../screens/Chat/Chat";
import Cart from "../screens/Order/Cart";
import Categories from "../screens/Order/Categories";
import Order from "../screens/Order/Order";
import Restaurants from "../screens/Order/Restaurants";
import Restaurant from "../screens/Restaurant/Restaurant";
import Menu from "../screens/Restaurant/Menu";
import UserReviews from "../screens/Review/User/UserReviews";
import WriteUserReview from "../screens/Review/User/WriteUserReview";
import Confirm from "../screens/Payment/Confirm";
import Payment from "../screens/Payment/Payment";
import Kakaopay from "../screens/Payment/Kakaopay";

const CartLink = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={{ marginRight: 10 }}>
    <Ionicons name="cart" size={28} color="black" />
  </TouchableOpacity>
);

const LoggedInNavigation = createStackNavigator();

export default ({ navigation, route }) => (
  <LoggedInNavigation.Navigator initialRouteName="TabNavigation">
    <LoggedInNavigation.Screen
      name="TabNavigation"
      component={TabNavigation}
      options={{
        headerShown: false,
      }}
    />
    <LoggedInNavigation.Screen
      name="Calls"
      component={Calls}
      options={{
        title: "주변 콜 찾기",
        headerTitleAlign: "center",
      }}
    />
    <LoggedInNavigation.Screen name="Call" component={Call} />
    <LoggedInNavigation.Screen name="Chat" component={Chat} />
    <LoggedInNavigation.Screen
      name="Cart"
      component={Cart}
      options={{
        title: "장바구니",
        headerTitleAlign: "center",
      }}
    />
    <LoggedInNavigation.Screen
      name="Categories"
      component={Categories}
      options={({ navigation }) => ({
        title: "음식 카테고리 선택",
        headerTitleAlign: "center",
        headerRight: () => (
          <CartLink onPress={() => navigation.navigate("Cart")} />
        ),
      })}
    />
    <LoggedInNavigation.Screen
      name="Order"
      component={Order}
      options={{
        title: "주문내역",
        headerTitleAlign: "center",
      }}
    />
    <LoggedInNavigation.Screen
      name="Restaurants"
      component={Restaurants}
      options={({ navigation }) => ({
        headerTitleAlign: "center",
        headerRight: () => (
          <CartLink onPress={() => navigation.navigate("Cart")} />
        ),
      })}
    />
    <LoggedInNavigation.Screen
      name="Restaurant"
      component={Restaurant}
      options={({ navigation }) => ({
        title: "음식 카테고리 선택",
        headerTitleAlign: "center",
        headerRight: () => (
          <CartLink onPress={() => navigation.navigate("Cart")} />
        ),
      })}
    />
    <LoggedInNavigation.Screen
      name="Menu"
      component={Menu}
      options={({ navigation }) => ({
        headerTitleAlign: "center",
        headerRight: () => (
          <CartLink onPress={() => navigation.navigate("Cart")} />
        ),
      })}
    />

    <LoggedInNavigation.Screen
      name="UserReviews"
      component={UserReviews}
      options={{
        title: "유저리뷰",
        headerTitleAlign: "center",
      }}
    />

    <LoggedInNavigation.Screen
      name="WriteUserReview"
      component={WriteUserReview}
      options={{
        title: "유저리뷰작성",
        headerTitleAlign: "center",
      }}
    />

    <LoggedInNavigation.Screen
      name="Confirm"
      component={Confirm}
      options={{ title: "최종확인", headerTitleAlign: "center" }}
    />

    <LoggedInNavigation.Screen
      name="Payment"
      component={Payment}
      options={{ title: "결제창", headerTitleAlign: "center" }}
    />

    <LoggedInNavigation.Screen
      name="Kakaopay"
      component={Kakaopay}
      options={{ title: "카카오페이", headerTitleAlign: "center" }}
    />
  </LoggedInNavigation.Navigator>
);
