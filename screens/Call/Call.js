import React, { useState } from "react";
import MapView, { Marker } from 'react-native-maps';
import { ScrollView, Text, View } from "react-native";
import * as Location from 'expo-location';
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
 * 2. 필요한 부가 정보 있는지 체크
 * 3. 메뉴 정보 map 으로 리턴 필요 (✔)
 * 4. 매장 상세 정보 이동 시 로딩 구현
 */

export default ({ navigation, route }) => {
  const {
    params: { image, brandName, userId, menus, dist, requestToRestaurant, requestToUser },
  } = route;
  const location = useReactiveVar(locationVar);
  // const [requestForStore, setRequestForStore] = useState("");
  // const [requestForDelivery, setRequestForDelivery] = useState("");
  const call = {
    request_R: "",
    request_call: "안녕하세요",
    user: [
      {
        id: 222,
        name: "김팝콘"
      }
    ],
    callLocation: {
      place: "서울시 어디동 저기구 227-30",
      latitude: 37.59720501279483,
      longitude: 127.05882764767271
    },
    cart: {
      menus: [
        {
          menu: {
            id: 2,
            name: "로제떡볶이"
          },
          count: 1,
          options: [
            {
              category: "맵기선택",
              items: [
                "0단계"
              ]
            }
          ],
          price: 12000,
          isSeperated: true
        }
      ]
    },
    restaurant: {
      seq: 2
    },
    seq: 3
  }
  const getAmountOfMenus = () => {
    return splitNumberPerThousand(
      menus.reduce((acc, cur) => acc + cur.price, 0)
    );
  };

  const setCurrentCall = (call) => {
    currentCallVar({
      id: call.seq,
      user: {
        id: call.user[0].seq,
        name: call.user[0].name
      },
      // restaurant
      restaurantId: call.restaurant.seq,
      cart: {
        menus: call.cart.menus
      },
      requestForStore: call.request_R,
    })
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: styles.bgColor }}
    >
      <ContainerWrapper>
        <UserSpecification userId={userId} />

        <ButtonContainer>
          <NavigationButton
            navigation={navigation}
            flaticon={{
              type: "MaterialCommunityIcons",
              name: "account-details-outline",
            }}
            params={["UserReviews", { userId }]}
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
          <Text>- 이름 : {brandName}</Text>
        </View>

        <NavigationButton
          navigation={navigation}
          params={["Restaurant", { id: 1 }]}
          flaticon={{
            type: "Ionicons",
            name: "restaurant-outline",
          }}
          text="상세정보"
          additionalMethod={() => setCurrentCall(call)}
        />
      </ContainerWrapper>

      <ContainerWrapper>
        <MenuContainer>
          <View>
            <TextTitle>• 선택한 메뉴 목록</TextTitle>
            <MenuListWithName menus={menus} />
          </View>

          <View>
            <TextTitle>총액 : {getAmountOfMenus()}원</TextTitle>
            <MenuListWithPrice menus={menus} />
          </View>
        </MenuContainer>

        <Divider />

        <InputContainer>
          <TextTitle>• 가게측 요청사항</TextTitle>
          {/* <TextInputBox
            value={requestForStore}
            onChangeText={(text) => setRequestForStore(text)}
            placeholder="가게측 요청사항이 있다면 적어주세요."
          ></TextInputBox> */}
          <TextContainer>{requestToRestaurant ? requestToRestaurant : "없음"}</TextContainer>
        </InputContainer>

        <InputContainer>
          <TextTitle>• 매칭용 요청사항</TextTitle>
          <TextContainer>{requestToUser ? requestToUser : "없음"}</TextContainer>
          {/* <TextInputBox
            value={requestForDelivery}
            onChangeText={(text) => setRequestForDelivery(text)}
            placeholder="배달측 요청사항이 있다면 적어주세요."
          ></TextInputBox> */}
        </InputContainer>

        <TextTitle>• 수령장소</TextTitle>
        <Text>- {call.callLocation.place}</Text>
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
            coordinate={{ latitude: call.callLocation.latitude, longitude: call.callLocation.longitude }}
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
        additionalMethod={() => setCurrentCall(call)}
      />
    </ScrollView>
  );
};
