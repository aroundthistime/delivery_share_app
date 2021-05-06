import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import "./styled";
import styles from "../../styles";
import UserSpecification from "../../components/UserSpecification";
import NavigationButton from "../../components/NavigationButton";
import {
  ButtonContainer,
  Divider,
  InputContainer,
  MenuContainer,
  TextInputBox,
  TextTitle,
} from "./styled";
import { splitNumberPerThousand } from "../../utils";
import {
  MenuListWithName,
  MenuListWithPrice,
} from "../../components/MenuListDetails";
import ContainerWrapper from "../../components/ContainerWrapper";

/**
 * TODO *
 * 1. component 단위 modularization (✔)
 * 2. 필요한 부가 정보 있는지 체크
 * 3. 메뉴 정보 map 으로 리턴 필요 (✔)
 * 4. 매장 상세 정보 이동 시 로딩 구현
 */

export default ({ navigation, route }) => {
  const {
    params: { image, brandName, userId, menus, dist },
  } = route;

  const [requestForStore, setRequestForStore] = useState("");
  const [requestForDelivery, setRequestForDelivery] = useState("");

  const getAmountOfMenus = () => {
    return splitNumberPerThousand(
      menus.reduce((acc, cur) => acc + cur.price, 0)
    );
  };

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
          params={["Restaurant", { category: "떡볶이" }]}
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
          <TextInputBox
            value={requestForStore}
            onChangeText={(text) => setRequestForStore(text)}
            placeholder="가게측 요청사항이 있다면 적어주세요."
          ></TextInputBox>
        </InputContainer>

        <InputContainer>
          <TextTitle>• 배달측 요청사항</TextTitle>
          <TextInputBox
            value={requestForDelivery}
            onChangeText={(text) => setRequestForDelivery(text)}
            placeholder="배달측 요청사항이 있다면 적어주세요."
          ></TextInputBox>
        </InputContainer>
      </ContainerWrapper>

      <NavigationButton
        background={styles.themeColor}
        navigation={navigation}
        params={[
          "Confirm",
          {
            requestForStore,
            requestForDelivery,
            menus,
            userId,
          },
        ]}
        text="주 문 진 행"
      />
    </ScrollView>
  );
};
