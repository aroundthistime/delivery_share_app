import React from "react";
import { Image, Text, View } from "react-native";
import styled from "styled-components";

/**
 * TODO *
 * 0. 전체적인 디자인 구현
 * 1. 로딩창 구현
 * 2. 상대방 유저 결제 유도
 * 3. 현재 결제 진행 상황 표시
 * 4. 결제 완료 시 리다이렉트 구현
 * 5. 결제는 Kakaopay Open API 고려 -> 웹뷰 사용해야 함
 */

const Payment = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <LoadingBar source={require("../../assets/loading.gif")} />
      <Text>진행중...</Text>
    </View>
  );
};

export default Payment;

const LoadingBar = styled.Image`
  width: 200px;
  height: 200px;
`;
