import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import "./styled";
import styles from "../../styles";
import UserSpecification from "../../components/UserSpecification";
import {
  ButtonBackground,
  ButtonContainer,
  ButtonOutline,
  Divider,
  InputContainer,
  MenuContainer,
  OrderContainer,
  ProfileImage,
  RestaurantView,
  TextInputBox,
  UserProfile,
} from "./styled";

/**
 * TODO *
 * 1. component 단위 modularization
 * 2. 필요한 부가 정보 있는지 체크
 * 3. 메뉴 정보 map 으로 리턴 필요 (list 형태)
 */

export default ({ navigation, route }) => {
  const {
    params: { image, brandName, userId, menu, dist },
  } = route;

  const [requestForStore, setRequestForStore] = useState("");
  const [requestForDelivery, setRequestForDelivery] = useState("");

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: styles.bgColor }}
    >
      <UserProfile>
        <UserSpecification userId={userId} />

        <ButtonContainer>
          <ButtonOutline
            onPress={() => navigation.navigate("UserReviews", { userId })}
          >
            <MaterialCommunityIcons
              style={{ marginRight: 10 }}
              name="account-details-outline"
              size={24}
              color="black"
            />
            <Text>상세정보</Text>
          </ButtonOutline>
          <ButtonOutline onPress={() => navigation.navigate("Chat")}>
            <Ionicons
              style={{ marginRight: 10 }}
              name="chatbubble-ellipses-outline"
              size={24}
              color="black"
            />
            <Text>채팅하기</Text>
          </ButtonOutline>
        </ButtonContainer>
      </UserProfile>

      <RestaurantView>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontWeight: "bold", marginBottom: 15 }}>
            • 매장 정보
          </Text>
          <Text>- 이름 : {brandName}</Text>
        </View>
        <ButtonOutline
          onPress={() =>
            /* navigation navigate to proper Category */
            navigation.navigate("Restaurant", { category: "떡볶이" })
          }
        >
          <Ionicons
            style={{ marginRight: 10 }}
            name="restaurant-outline"
            size={24}
            color="black"
          />
          <Text>상세정보</Text>
        </ButtonOutline>
      </RestaurantView>

      <OrderContainer>
        <MenuContainer>
          <View>
            <Text style={{ fontWeight: "bold", marginBottom: 15 }}>
              • 선택한 메뉴 목록
            </Text>
            <Text>- {menu}</Text>
          </View>

          <View>
            <Text style={{ fontWeight: "bold", marginBottom: 15 }}>
              총액 : 25,000원
            </Text>
            <Text style={{ textAlign: "right" }}>25,000원</Text>
          </View>
        </MenuContainer>

        <Divider />

        <InputContainer>
          <Text style={{ fontWeight: "bold", marginBottom: 15 }}>
            • 가게측 요청사항
          </Text>
          <TextInputBox
            value={requestForStore}
            onChangeText={(text) => setRequestForStore(text)}
            placeholder="가게측 요청사항이 있다면 적어주세요."
          ></TextInputBox>
        </InputContainer>

        <InputContainer>
          <Text style={{ fontWeight: "bold", marginBottom: 15 }}>
            • 배달측 요청사항
          </Text>
          <TextInputBox
            value={requestForDelivery}
            onChangeText={(text) => setRequestForDelivery(text)}
            placeholder="배달측 요청사항이 있다면 적어주세요."
          ></TextInputBox>
        </InputContainer>
      </OrderContainer>

      <ButtonBackground
        bgColor={styles.themeColor}
        /* navigation navigate to Order Process */
        onPress={() =>
          navigation.navigate("Confirm", {
            requestForStore,
            requestForDelivery,
            menu,
            userId,
          })
        }
      >
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 22 }}>
          주 문 진 행
        </Text>
      </ButtonBackground>
    </ScrollView>
  );
};
