import React, { useState } from "react";
import { FlatList, RefreshControl, Text, Touchable, TouchableOpacity, View } from "react-native";
import styled from "styled-components";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import ScreenHeader from "../../components/ScreenHeader";
import constants from "../../constants";
import styles from "../../styles";
import { getOpponent, getTimeStamp } from "../../utils";
import { useQuery } from "@apollo/client";
import { GET_ORDERS } from "../../queries/OrderQueries";
import Loader from "../../components/Loader";

const OrderListBar = styled.View`
  background-color: white;
  margin-top: 7.5;
  margin-bottom: 12;
`;

const OrderHeader = styled.View`
  padding-top: 12;
  padding-bottom: 12;
  padding-left: 20;
  padding-right: 20;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const OrderDate = styled.Text`
  opacity: 0.4;
`;

const OrderStatus = styled.Text`
  font-weight: bold;
  opacity: 0.7;
`;

const OrderBody = styled.View`
  padding-top: 10;
  padding-bottom: 10;
  padding-left: 20;
  padding-right: 20;
  flex-direction: row;
`;

const RestaurantImg = styled.Image`
  width: ${constants.restaurantImageSize};
  height: ${constants.restaurantImageSize};
  border-radius: ${constants.restaurantImageSize / 2};
  margin-right: 15;
`;

const OrderInfos = styled.View``;

const RestaurantName = styled.Text`
  font-size: 16;
  padding-right: 20;
  font-weight: bold;
  width: ${constants.width - 55 - constants.restaurantImageSize};
  overflow: hidden;
  margin-bottom: 5;
`;

const OpponentContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const OpponentName = styled.Text`
  opacity: 0.6;
  margin-left: 5;
  font-size: 14.5;
  margin-bottom: 3;
`;

const OrderContent = styled.Text`
  opacity: 0.6;
  font-size: 13.5;
`;

const OrderFooter = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10;
  margin-bottom: 15;
  padding-top: 1;
  padding-bottom: 1;
  padding-left: 20;
  padding-right: 20;
`;

const FooterBtnContainer = styled.Text`
  text-align: center;
  text-align-vertical: center;
  color: rgba(0, 0, 0, 0.75);
  width: ${(constants.width - 40) / 3 - 5};
  height: 40;
  border-radius: 5;
  border-color: ${styles.lightGrayColor};
  border-width: 1.3;
`;

const FooterBtn = ({ isAvailable, text, onPress }) =>
  isAvailable ? (
    <TouchableOpacity onPress={onPress}>
      <FooterBtnContainer>{text}</FooterBtnContainer>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity activeOpacity={1}>
      <FooterBtnContainer
        style={{ color: "rgba(0, 0, 0, 0.2)", borderColor: "#f2eded" }}
      >
        {text}
      </FooterBtnContainer>
    </TouchableOpacity>
  );

const NoOrderContainer = styled.View`
  background-color: white;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const NoOrderImage = () => (
  <View
    style={{
      padding: 30,
      paddingBottom: 20,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Ionicons name="document-text-outline" size={120} color="#afafaf" />
    <Ionicons
      name="chatbox-ellipses-outline"
      size={60}
      color="#afafaf"
      style={{ position: "absolute", top: -10, right: 10 }}
    />
  </View>
);

const NoOrderMessage = styled.Text`
  font-size: 17;
  color: #545151;
`;


export default ({ navigation }) => {
  const { loading, data, error, refetch } = useQuery(GET_ORDERS);
  const [isFetching, setIsFetching] = useState(false);
  const onRefresh = async () => {
    setIsFetching(true);
    await refetch();
    setIsFetching(false);
  }
  const ordersSortFunc = (order1, order2) => {
    const order1Date = new Date(order1.created_at);
    const order2Date = new Date(order2.created_at);
    return order2Date - order1Date;
  }
  const renderOrderItem = ({ item: order }) => {
    if (!order.call) {
      return <></>
    }
    const participants = order.call.cart.map(cartObj => cartObj.user);
    const opponent = getOpponent(participants[0], participants[1], "1");
    const restaurant = order.call.restaurant;
    // const selectedMenus = order.call.cart.length > 1 ? order.call.cart[0].selected_menu.concat(order.call.cart[1].selected_menu) : order.call.cart[0].selected_menu;
    const selectedMenus = order.call.cart[0].selected_menu.concat(order.call.cart[1].selected_menu);
    let orderStatus;
    if (order.status === "pending") {
      orderStatus = "준비중"
    } else if (order.status === "completed") {
      orderStatus = "배달완료"
    } else {
      orderStatus = "주문취소"
    }
    return <>
      <OrderListBar>
        <OrderHeader>
          <OrderDate>{getTimeStamp(order.created_at)}</OrderDate>
          <OrderStatus>{orderStatus}</OrderStatus>
        </OrderHeader>
        <OrderBody>
          <TouchableOpacity onPress={() => navigation.navigate("Restaurant", { id: restaurant.seq })}>
            <RestaurantImg source={{ uri: restaurant.thumbnail }} />
          </TouchableOpacity>
          <OrderInfos>
            <TouchableOpacity onPress={() => navigation.navigate("Restaurant", { id: restaurant.seq })}>
              <RestaurantName numberOfLines={1}>{restaurant.name}</RestaurantName>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("UserReviews", { userId: opponent.seq })}>
              <OpponentContainer>
                <FontAwesome name="user" size={15} color="rgba(0, 0, 0, 0.6)" />
                <OpponentName>{opponent.name}</OpponentName>
              </OpponentContainer>
            </TouchableOpacity>
            <OrderContent>
              {selectedMenus.length > 1 ? (
                `${selectedMenus[0].menu.name} 외 ${selectedMenus.length - 1}개`
              ) : (
                selectedMenus[0].menu.name
              )}
            </OrderContent>
          </OrderInfos>
        </OrderBody>
        <OrderFooter>
          <FooterBtn isAvailable={true} text={"주문상세"} onPress={() => navigation.navigate("Order", { orderId: order.seq })} />
          <FooterBtn isAvailable={order.canWriteRestaurantReview} text={"식당리뷰쓰기"} onPress={() => navigation.navigate("WriteRestaurantReview", { orderId: order.seq, restaurant, menus: selectedMenus })} />
          <FooterBtn isAvailable={order.canWriteUserReview} text={"유저리뷰쓰기"} onPress={() => navigation.navigate("WriteUserReview", { orderId: order.seq, opponentId: opponent.seq })} />
        </OrderFooter>
      </OrderListBar>
    </>
  }
  return <>
    <ScreenHeader title={'주문내역'} />
    {!loading && !isFetching && data && data.allOrders ? (
      <>
        {data.allOrders.length > 0 ? (
          <FlatList
            data={[...data.allOrders].sort(ordersSortFunc)}
            renderItem={renderOrderItem}
            refreshControl={<RefreshControl
              colors={[styles.lightThemeColor, styles.themeColor]}
              refreshing={isFetching}
              onRefresh={onRefresh}
            />}

          />
        ) :
          (
            <NoOrderContainer>
              <NoOrderImage />
              <NoOrderMessage>주문내역이 없습니다.</NoOrderMessage>
            </NoOrderContainer>
          )
        }
      </>
    ) : (
      <Loader />
    )}
  </>
};
