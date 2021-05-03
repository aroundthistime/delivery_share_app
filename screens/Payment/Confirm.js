import React from "react";
import { ScrollView, Text, View } from "react-native";
import styled from "styled-components";
import {
  MenuListWithName,
  MenuListWithPrice,
} from "../../components/MenuListDetails";
import NavigationButton from "../../components/NavigationButton";
import RequestDetails from "../../components/RequestDetails";
import styles from "../../styles";
import { splitNumberPerThousand } from "../../utils";
import { ButtonBackground, Divider } from "../Call/styled";

/**
 * TODO *
 * 1. component 단위로 modularization
 * 2. 주문 내역 map 을 통해 list 형태 리턴
 * 3. 배달장소 정보 연동 필요
 * 4. 요청사항 메시지 형태 디자인 변경 ?
 * 5. 추가로 필요한 부가 정보 있는지 검토
 */

const Confirm = ({ navigation, route }) => {
  const {
    params: { requestForStore, requestForDelivery, menus, userId },
  } = route;

  const getAmountOfMenus = () => {
    return splitNumberPerThousand(
      menus.reduce((acc, cur) => acc + cur.price, 0)
    );
  };

  return (
    <ScrollView
      style={{ flex: 1, padding: 20 }}
      showsVerticalScrollIndicator={false}
    >
      <BillCheck>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <TextTitle>주문내역 확인</TextTitle>
            <MenuListWithName menus={menus} />
          </View>

          <View>
            <TextTitle>총액: {getAmountOfMenus()}원</TextTitle>
            <MenuListWithPrice menus={menus} />
          </View>
        </View>

        <Divider />

        <View>
          <TextTitle style={{ marginBottom: 10 }}>배달장소</TextTitle>
          <Text>서울시 동대문구 이문동1동 천장산로10 </Text>
        </View>

        <Divider />

        <TextTitle style={{ marginBottom: 10 }}>
          {userId}
          <Text style={{ fontSize: 14, fontWeight: "100" }}>님의 요청</Text>
        </TextTitle>
        <View>
          <RequestDetails
            requestForStore="뻘라 만들어주세요!"
            requestForDelivery="조심히 후딱 오셔요!"
          />
        </View>

        <Divider />

        <TextTitle
          style={{
            marginBottom: 10,
            textAlign: "right",
          }}
        >
          나<Text style={{ fontSize: 14, fontWeight: "100" }}>의 요청</Text>
        </TextTitle>
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <RequestDetails
            requestForStore={requestForStore}
            requestForDelivery={requestForDelivery}
            background="#FFB800"
          />
        </View>

        <Divider />

        <NavigationButton
          background={styles.themeColor}
          navigation={navigation}
          params={[
            "Payment",
            {
              requestForStore,
              requestForDelivery,
              menus,
              userId,
            },
          ]}
          text="결 제 진 행"
        />
      </BillCheck>
    </ScrollView>
  );
};

export default Confirm;

const BillCheck = styled.View`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px 15px 5px 15px;
  margin-bottom: 30px;
`;

const TextTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
`;
