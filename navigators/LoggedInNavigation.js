import React from "react";
import { Alert, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import styled from "styled-components";
import HeaderRightContainer from "../components/HeaderRightContainer";
import TabNavigation from "./TabNavigation";
import Calls from "../screens/Call/Calls";
import Call from "../screens/Call/Call";
import Chat from "../screens/Chat/Chat";
import Cart from "../screens/Order/Cart";
import Categories from "../screens/Order/Categories";
import Order from "../screens/Order/Order";
import Restaurants from "../screens/Order/Restaurants";
import Search from "../screens/Order/Search";
import Restaurant from "../screens/Restaurant/Restaurant";
import Menu from "../screens/Restaurant/Menu";
import ClearBtn from "../components/ClearBtn";
import { useCart, useClearCart } from "../Contexts/CartContext";
import constants from "../constants";
import CallMakeForm from "../screens/Order/CallMakeForm";
import SelectLocation from "../screens/Order/SelectLocation";
import UserReviews from "../screens/Review/User/UserReviews";
import WriteUserReview from "../screens/Review/User/WriteUserReview";
import Confirm from "../screens/Payment/Confirm";
import Payment from "../screens/Payment/Payment";
import Kakaopay from "../screens/Payment/Kakaopay";
import WriteRestaurantReview from "../screens/Review/Restaurant/WriteRestaurantReview";
import MyCall from "../screens/Order/MyCall";
import { useQuery } from "@apollo/client";
import { GET_MY_CALL } from "../queries/CallQueries";
import { myCallVar } from "../reactiveVars";
import Loader from "../components/Loader";

const LinksContainer = styled.View`
    flex-direction : row;
`

const SearchLink = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={{ marginRight: 8 }}>
    <Ionicons name="search" size={27} color="black" />
  </TouchableOpacity>
)

const CartLink = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={{ marginRight: constants.headerRightMargin }}>
    <Ionicons name="cart" size={28} color="black" />
  </TouchableOpacity>
)

const ShowModalsLink = ({ onPress }) => (
  <HeaderRightContainer onPress={onPress}>
    <Ionicons name="ellipsis-vertical" size={24} color="rgba(0, 0, 0, 0.5)" />
  </HeaderRightContainer>
)

const LoggedInNavigation = createStackNavigator();

export default ({ navigation, route }) => {
  const { data, loading, error } = useQuery(GET_MY_CALL);
  if (!loading && data && data.getMYCall) {
    myCallVar(data.getMYCall);
  }
  const cart = useCart();
  const clearCart = useClearCart();
  const clearCartAlert = () => {
    Alert.alert(
      "장바구니에 담긴 모든 메뉴를 삭제하시겠습니까?",
      "",
      [
        {
          text: "취소",
          onPress: () => 1,
          style: "cancel"
        },
        {
          text: "확인",
          onPress: () => clearCart()
        }
      ]
    )
  }
  if (loading || !data || !data.getMyCall) {
    return <Loader />
  }
  return (
    <LoggedInNavigation.Navigator
      initialRouteName="TabNavigation"
    >
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
          headerTitleAlign: "center"
        }}
      />
      <LoggedInNavigation.Screen
        name="Call"
        component={Call}
        options={{
          title: "콜 확인하기",
          headerTitleAlign: "center"
        }}
      />
      <LoggedInNavigation.Screen
        name="Chat"
        component={Chat}
        options={({ navigation, route }) => ({
          headerRight: () => <ShowModalsLink onPress={() => {
            navigation.setParams({
              ...route.params,
              showModal: true
            })
          }} />
        })}
      />
      <LoggedInNavigation.Screen
        name="Cart"
        component={Cart}
        options={{
          title: "장바구니",
          headerTitleAlign: "center",
          headerRight: () => cart.menus.length > 0 ? (
            <ClearBtn onPress={clearCartAlert} marginRight={constants.headerRightMargin + 5} />
          ) : (
            <ClearBtn onPress={() => 1} marginRight={constants.headerRightMargin + 5} isDisabled={true} />
          )
        }}
      />
      <LoggedInNavigation.Screen
        name="Categories"
        component={Categories}
        options={({ navigation }) => ({
          title: "음식 카테고리 선택",
          headerTitleAlign: "center",
          headerRight: () => <LinksContainer>
            <SearchLink onPress={() => navigation.navigate("Search")} />
            <CartLink onPress={() => navigation.navigate("Cart")} />
          </LinksContainer>
        })}
      />
      <LoggedInNavigation.Screen
        name="Order"
        component={Order}
        options={({ navigation, route }) => ({
          title: "주문내역",
          headerTitleAlign: "center",
          headerRight: () => <TouchableOpacity
            style={{ marginRight: constants.headerRightMargin + 5 }}
            onPress={() => navigation.setParams({
              ...route.params,
              refetchOrder: true
            })}
          >
            <FontAwesome name="repeat" size={20} color="rgba(0, 0, 0, 0.8)" />
          </TouchableOpacity>
        })}
      />
      <LoggedInNavigation.Screen
        name="Restaurants"
        component={Restaurants}
        options={({ navigation }) => ({
          headerTitleAlign: "center",
          headerRight: () => <LinksContainer>
            <SearchLink onPress={() => navigation.navigate("Search")} />
            <CartLink onPress={() => navigation.navigate("Cart")} />
          </LinksContainer>
        })}
      />
      <LoggedInNavigation.Screen
        name="Restaurant"
        component={Restaurant}
        options={({ navigation }) => ({
          title: "음식 카테고리 선택",
          headerTitleAlign: "center",
          headerRight: () => <LinksContainer>
            <SearchLink onPress={() => navigation.navigate("Search")} />
            <CartLink onPress={() => navigation.navigate("Cart")} />
          </LinksContainer>
        })}
      />
      <LoggedInNavigation.Screen
        name="Menu"
        component={Menu}
        options={({ navigation }) => ({
          headerTitleAlign: "center",
          headerRight: () => <LinksContainer>
            <SearchLink onPress={() => navigation.navigate("Search")} />
            <CartLink onPress={() => navigation.navigate("Cart")} />
          </LinksContainer>
        })}
      />
      <LoggedInNavigation.Screen
        name="CallMakeForm"
        component={CallMakeForm}
        options={{
          title: "콜 요청하기",
          headerTitleAlign: "center"
        }}
      />
      <LoggedInNavigation.Screen
        name="SelectLocation"
        component={SelectLocation}
        options={{
          title: "수령장소 선택",
          headerTitleAlign: "center"
        }}
      />
      <LoggedInNavigation.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false
        }}
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
        name="WriteRestaurantReview"
        component={WriteRestaurantReview}
        options={{
          title: "식당리뷰작성",
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
  )
}