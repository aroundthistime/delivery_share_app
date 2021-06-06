import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { ScrollView, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as Location from "expo-location";
import "./styled";
import styles from "../../styles";
import { currentCallVar, locationVar } from "../../reactiveVars";
import UserSpecification from "../../components/UserSpecification";
import NavigationButton from "../../components/NavigationButton";
import {
  ButtonContainer,
  Divider,
  InputContainer,
  MarkerIcon,
  MarkerTitle,
  MenuContainer,
  TextContainer,
  TextInputBox,
  TextTitle,
} from "./styled";
import { splitNumberPerThousand } from "../../utils";
import {
  MenuListWithName,
  MenuListWithPrice,
} from "../../components/MenuListDetails";
import ContainerWrapper from "../../components/ContainerWrapper";
import { useReactiveVar } from "@apollo/client";
import constants from "../../constants";

/**
 * TODO *
 * 1. component 단위 modularization (✔)
 * 2. 필요한 부가 정보 있는지 체크 (✔)
 * 3. 메뉴 정보 map 으로 리턴 필요 (✔)
 * 4. Emulator Geolocation 연동 문제로 초기 MapView 로딩 위치역시
 *    callLocation에 있는 (콜 만남 장소) 위도, 경도로 설정
 */

export default ({ navigation, route }) => {
  const {
    params: {
      seq,
      distance,
      callLocation,
      restaurant,
      price,
      user,
      request_call,
      status,
      time_limit,
      cart,
    },
  } = route;

  const location = useReactiveVar(locationVar);

  const setCurrentCall = () => {
    currentCallVar({
      id: seq,
      user: {
        id: user.seq,
        name: user.name,
        nickname: user.ID,
      },
      // restaurant
      restaurantId: restaurant.seq,
      cart: {
        menus: cart[0].selected_menu,
      },
      requestForStore: cart[0].request,
    });
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: styles.bgColor }}
    >
      <ContainerWrapper>
        <UserSpecification user={user} />

        <ButtonContainer>
          <NavigationButton
            navigation={navigation}
            flaticon={{
              type: "MaterialCommunityIcons",
              name: "account-details-outline",
            }}
            params={["UserReviews", { user }]}
            text="상세정보"
          />

          <NavigationButton
            navigation={navigation}
            params={["Chat"]}
            flaticon={{
              type: "Ionicons",
              name: "chatbubble-ellipses-outline",
            }}
            text="채팅하기"
          />
        </ButtonContainer>
      </ContainerWrapper>

      <ContainerWrapper>
        <View style={{ marginBottom: 20 }}>
          <TextTitle>• 매장 정보</TextTitle>
          <Text>- 이름 : {restaurant.name}</Text>
          <Text>- 소개 : {restaurant.introduction}</Text>
          <Text>- 종류 : {restaurant.category}</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ textAlignVertical: "center", marginRight: 10 }}>
              - 평점 :
            </Text>
            <FontAwesome name="star" size={13.5} color={styles.yellowColor} />
            <Text style={{ marginLeft: 5 }}>{restaurant.rate.toFixed(1)}</Text>
          </View>
          <Text>
            - 배달팁 : {splitNumberPerThousand(restaurant.delivery_tip)}원
          </Text>
        </View>

        <NavigationButton
          navigation={navigation}
          params={["Restaurant", { id: +restaurant.seq }]}
          flaticon={{
            type: "Ionicons",
            name: "restaurant-outline",
          }}
          text="상세정보"
          additionalMethod={() => setCurrentCall()}
        />
      </ContainerWrapper>

      <ContainerWrapper>
        <MenuContainer>
          <View>
            <TextTitle>• 선택한 메뉴 목록</TextTitle>
            <MenuListWithName menus={cart[0].selected_menu} />
          </View>

          <View>
            <TextTitle>총액 : 원</TextTitle>
            <MenuListWithPrice menus={cart[0].selected_menu} />
          </View>
        </MenuContainer>

        <Divider />

        <InputContainer>
          <TextTitle>• 가게측 요청사항</TextTitle>
          <TextContainer>{cart[0].request || "없음"}</TextContainer>
        </InputContainer>

        <InputContainer>
          <TextTitle>• 매칭용 요청사항</TextTitle>
          <TextContainer>{request_call || "없음"}</TextContainer>
        </InputContainer>

        <TextTitle>• 수령장소</TextTitle>
        <Text>- {callLocation.place}</Text>
        <MapView
          style={{
            width: constants.width - 40,
            height: constants.width - 40,
            marginVertical: 15,
          }}
          region={{
            longitude: callLocation.longitude,
            latitude: callLocation.latitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{
              latitude: callLocation.latitude,
              longitude: callLocation.longitude,
            }}
            style={{ alignItems: "center" }}
          >
            <MarkerTitle>현위치</MarkerTitle>
            <MarkerIcon isCurrent={true} />
          </Marker>
          <Marker
            coordinate={{
              latitude: callLocation.latitude,
              longitude: callLocation.longitude,
            }}
            style={{ alignItems: "center" }}
          >
            <MarkerTitle>수령장소</MarkerTitle>
            <MarkerIcon isCurrent={false} />
          </Marker>
        </MapView>
      </ContainerWrapper>

      <NavigationButton
        background={styles.themeColor}
        navigation={navigation}
        params={["Restaurant", { id: 1 }]}
        text="메뉴 추가"
        additionalMethod={() => setCurrentCall()}
      />

      <NavigationButton
        background={styles.themeColor}
        navigation={navigation}
        params={["Request", { request: cart[0].request, user, cart }]}
        text="바로 주문"
      />
    </ScrollView>
  );
};
