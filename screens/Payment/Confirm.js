import React from "react";
import { ScrollView, Text, View } from "react-native";
import styled from "styled-components";
import styles from "../../styles";
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
    params: { requestForStore, requestForDelivery, menu, userId },
  } = route;
  return (
    <ScrollView
      style={{ flex: 1, padding: 20 }}
      showsVerticalScrollIndicator={false}
    >
      <BillCheck>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <TextTitle>주문내역 확인</TextTitle>
          <TextTitle>총액: 25,000원</TextTitle>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text>{menu}</Text>
          <Text>25,000원</Text>
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
          <RequestDetails>
            <RequestTitle style={{ fontWeight: "bold" }}>
              To. Store
            </RequestTitle>
            <Text>빨리 만들어주세요!</Text>
            <Text></Text>
            <RequestTitle style={{ fontWeight: "bold" }}>
              To. Delivery
            </RequestTitle>
            <Text>빨리 조심히 오세요!</Text>
          </RequestDetails>
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
          <RequestDetails bgColor="#FFB800">
            <RequestTitle style={{ fontWeight: "bold" }}>
              To. Store
            </RequestTitle>
            <Text>{requestForStore ? requestForStore : "-"}</Text>
            <Text></Text>
            <RequestTitle style={{ fontWeight: "bold" }}>
              To. Delivery
            </RequestTitle>
            <Text>{requestForDelivery ? requestForDelivery : "-"}</Text>
          </RequestDetails>
        </View>

        <Divider />

        <ButtonBackground
          style={{ borderRadius: 10 }}
          bgColor={styles.themeColor}
          onPress={() =>
            navigation.navigate("Payment", {
              requestForStore,
              requestForDelivery,
              menu,
              userId,
            })
          }
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 22 }}>
            결 제 진 행
          </Text>
        </ButtonBackground>
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

const RequestDetails = styled.View`
  padding: 15px;
  background-color: ${({ bgColor }) => (bgColor ? bgColor : "#ededed")};
  border-radius: 15px;
  width: 80%;
`;

const RequestTitle = styled.Text`
  font-weight: bold;
  margin-bottom: 8px;
`;

const TextTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;
