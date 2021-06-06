import { useQuery, useReactiveVar } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import * as Location from 'expo-location';
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import ContainerWrapper from "../../components/ContainerWrapper";
import Loader from "../../components/Loader";
import NavigationButton from "../../components/NavigationButton";
import UserSpecification from "../../components/UserSpecification";
import { GET_ORDER } from "../../queries/OrderQueries";
import styles from "../../styles";
import { getOpponent, splitNumberPerThousand } from "../../utils";
import { ButtonContainer, Divider, MarkerIcon, MarkerTitle, MenuContainer, TextTitle } from "../Call/styled";
import constants from "../../constants";
import MapView, { Marker } from "react-native-maps";
import { locationVar } from "../../reactiveVars";

const OrderInfo = styled.View`

`

const ButtonBackground = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  padding: 15px 0;
  margin-left : 10;
  margin-right : 10;
  border-radius : 5;
  margin-bottom: 20px;
  background-color: ${({ background }) => (background ? background : "#fff")};
`;

const NavigationBtn = styled.TouchableOpacity`
  flex-direction: row;
  border: 1px solid ${styles.lightGrayColor};
  border-radius: 10px;
  padding: 10px 15px;
  width: ${constants.width / 2 - 35};
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;

const OrderInfoBrief = styled.Text`
  fontSize : 14.5;
  color : rgba(0, 0, 0, 0.6);
  margin-bottom : 2;
`

const CartsContainer = styled.View`
  background-color : #EDEDED;
  border-radius : 10;
  width : ${constants.width - 40};
  padding-top : 15;
  padding-bottom : 15;
  padding-left : 15;
  padding-right : 15;
`

const CartContainer = styled.View`
`

const CartHeader = styled.Text`
  padding-left : 5;
  padding-bottom : 5;
  margin-bottom : 10;
  border-bottom-width : 1;
  border-color : rgba(0, 0, 0, 0.5);
  font-size : 15.5;
  color : rgba(0, 0, 0, 0.8);
`

const MenuRow = styled.View`
  margin-bottom : 10;
`

const MenuHeader = styled.View`
  flex-direction : row;
  justify-content : space-between;
`

const MenuHeaderText = styled.Text`
  font-size : 14.5;
`

const MenuOptionText = styled.Text`
  opacity : 0.4;
  margin-top : 3;
  margin-left : 10;
`

const CartFooter = styled.View`
  flex-direction : row;
  justify-content : space-between;
  padding-top : 5;
  border-top-width : 1;
  border-color : rgba(0, 0, 0, 0.5);
`

const CartFooterText = styled.Text`
  font-size : 14.5;
  color : rgba(0, 0, 0, 0.8);
  font-weight : bold;
`

const RequestContainer = styled.View`
  margin-bottom : 20;
`

const RequestHeader = styled.Text`
  margin-bottom : 5;
`;

const RequestContent = styled.Text`
  border-color: #ededed;
  border-bottom-width: 1px;
  padding-left : 7.5;
  padding-right : 7.5;
  padding-bottom : 7.5;
  color : rgba(0, 0, 0, 0.5);
`

export default ({ navigation, route }) => {
  const {
    params: { orderId }
  } = route;
  const location = useReactiveVar(locationVar);
  const [oppponent, setOpponent] = useState({
    seq: 1,
    thumbnail: null,
    name: "",
    rate: 4
  });
  const { loading, data, error, refetch } = useQuery(GET_ORDER, {
    variables: {
      seq: orderId
    }
  });
  const userObj = {
    id: 10
  }
  useEffect(() => {
    if (data && data.Order) {
      setOpponent(getOpponent(data.Order.call.cart[0].user, data.Order.call.cart[1].user, userObj.id))
    }
  }, [data])
  useEffect(() => {
    if (route.params && route.params.refetchOrder) {
      refetch();
      navigation.setParams({
        ...route.params,
        refetchOrder: false
      })
    }
  }, [route])
  const getOrderStatusString = (status) => {
    if (status === "pending") {
      return "주문이 진행중입니다"
    } else if (status === "completed") {
      return "배달이 완료되었습니다"
    } else {
      return "주문이 취소되었습니다"
    }
  }
  const formatDateToString = (dateString) => {
    const date = new Date(dateString);
    let hour;
    let minute;
    if (date.getHours() > 12) {
      if (date.getHours() > 21) {
        hour = `오후 ${date.getHours() - 12}`
      } else {
        hour = `오후 0${date.getHours() - 12}`
      }
    } else if (date.getHours() === 12) {
      hour = "오후 12"
    } else if (date.getHours() < 10) {
      hour = `오전 0${date.getHours()}`
    } else {
      hour = `오전 ${date.getHours()}`
    }
    if (date.getMinutes() >= 10) {
      minute = date.getMinutes()
    } else {
      minute = `0${date.getMinutes()}`
    }
    return `${date.getFullYear()}년 ${date.getMonth()}월 ${date.getDate()}일 ${hour}:${minute}`
  }
  const getExpectedDeliveryTime = (orderStart, minutes) => {
    const expecetedTime = new Date(new Date(orderStart).getTime() + minutes * 60000);
    const current = new Date();
    return `${parseInt((expecetedTime.getTime() - current.getTime()) / 60000)}분 후`
  }
  return (
    <>
      {!loading && data && data.Order ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, backgroundColor: styles.bgColor }}
        >
          <ContainerWrapper>
            <View style={{ marginBottom: 20 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold", color: "rgba(0, 0, 0, 0.5)", marginBottom: 10 }}>{getOrderStatusString(data.Order.status)}</Text>
              <OrderInfoBrief>- 주문일시 : {formatDateToString(data.Order.created_at)}</OrderInfoBrief>
              <OrderInfoBrief>- 주문자명 : {data.Order.call.cart[0].user.name}, {data.Order.call.cart[1].user.name}</OrderInfoBrief>
              {data.Order.status === "pending" && (
                <OrderInfoBrief>- 배달예상시간 : {getExpectedDeliveryTime(data.Order.created_at, data.Order.delivery_time)}</OrderInfoBrief>
              )}
            </View>
          </ContainerWrapper>
          <ContainerWrapper>
            <TextTitle>• 유저 정보</TextTitle>
            <UserSpecification user={oppponent} />
            <ButtonContainer>
              <NavigationButton
                navigation={navigation}
                flaticon={{
                  type: "MaterialCommunityIcons",
                  name: "account-details-outline",
                }}
                params={["UserReviews", { user: oppponent }]}
                text="상세정보"
              />
              <NavigationBtn>
                <Ionicons name={"chatbubble-ellipses-outline"} size={24} color={"#111"} style={{ marginRight: 10 }} />
                <Text style={{ color: "#111" }}>채팅하기</Text>
              </NavigationBtn>
            </ButtonContainer>
          </ContainerWrapper>
          <ContainerWrapper>
            <View style={{ marginBottom: 20 }}>
              <TextTitle>• 매장 정보</TextTitle>
              <Text>- 이름 : {data.Order.call.restaurant.name}</Text>
            </View>
            <NavigationButton
              navigation={navigation}
              params={["Restaurant", { id: data.Order.call.restaurant.seq }]}
              flaticon={{
                type: "Ionicons",
                name: "restaurant-outline",
              }}
              text="상세정보"
            />
          </ContainerWrapper>

          <ContainerWrapper>
            <MenuContainer>
              <View>
                <TextTitle>• 주문 내용</TextTitle>
                <CartsContainer>
                  {data.Order.call.cart.map((cartObj, index) => (
                    <CartContainer style={{ marginBottom: index === 0 ? 40 : 0 }}>
                      <CartHeader><Text style={{ fontWeight: "bold", color: "black" }}>{cartObj.user.name}</Text> 님의 장바구니</CartHeader>
                      {cartObj.selected_menu.map(menuObj => (
                        <MenuRow>
                          <MenuHeader>
                            <MenuHeaderText>- {menuObj.menu.name} X {menuObj.count}</MenuHeaderText>
                            <MenuHeaderText>{splitNumberPerThousand(menuObj.price)}원</MenuHeaderText>
                          </MenuHeader>
                          {menuObj.isSeperated && (
                            <MenuOptionText>- 나눠먹어요</MenuOptionText>
                          )}
                          {menuObj.selected_option.map(selectedOption => (
                            <MenuOptionText>- {selectedOption.option_item.content}</MenuOptionText>
                          ))}
                        </MenuRow>
                      ))}
                      <MenuRow>
                        <MenuHeader>
                          <MenuHeaderText>- 배달비</MenuHeaderText>
                          <MenuHeaderText>{splitNumberPerThousand(data.Order.call.restaurant.delivery_tip)}원</MenuHeaderText>
                        </MenuHeader>
                      </MenuRow>
                      <CartFooter>
                        <CartFooterText>총 주문금액</CartFooterText>
                        <CartFooterText>{splitNumberPerThousand(cartObj.total_cost)}원</CartFooterText>
                      </CartFooter>
                    </CartContainer>
                  ))}
                </CartsContainer>
              </View>
            </MenuContainer>

            <Divider />

            <TextTitle>• 요청사항</TextTitle>
            {data.Order.call.cart.map(cartObj => (
              <RequestContainer>
                <RequestHeader><Text style={{ fontWeight: "bold" }}>{cartObj.user.name}</Text> 님의 요청사항</RequestHeader>
                <RequestContent>{cartObj.request}</RequestContent>
              </RequestContainer>
            ))}
            <RequestContainer>
              <RequestHeader style={{ fontWeight: "bold" }}>매칭 메시지</RequestHeader>
              <RequestContent>{data.Order.call.request_call}</RequestContent>
            </RequestContainer>

            <Divider />

            <TextTitle>• 수령장소</TextTitle>
            <Text style={{ color: "rgba(0, 0, 0, 0.5)" }}>{data.Order.call.callLocation.place}</Text>
            <MapView
              style={{ width: constants.width - 40, height: constants.width - 40, marginVertical: 15 }}
              region={{
                longitude: location.longitude,
                latitude: location.latitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
              }}
            >
              <Marker
                coordinate={{ latitude: location.latitude, longitude: location.longitude }}
                style={{ alignItems: "center" }}
              >
                <MarkerTitle>현위치</MarkerTitle>
                <MarkerIcon isCurrent={true} />
              </Marker>
              <Marker
                coordinate={{ latitude: data.Order.call.callLocation.latitude, longitude: data.Order.call.callLocation.longitude }}
                style={{ alignItems: "center" }}
              >
                <MarkerTitle>수령장소</MarkerTitle>
                <MarkerIcon isCurrent={false} />
              </Marker>
            </MapView>
          </ContainerWrapper>
        </ScrollView>
      ) : (
        <Loader />
      )}
    </>
  );
};
