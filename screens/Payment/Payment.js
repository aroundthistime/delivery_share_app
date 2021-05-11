import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import styled from "styled-components";
import styles from "../../styles";
import { Feather } from "@expo/vector-icons";

/**
 * TODO *
 * 0. 전체적인 디자인 구현
 * 1. 로딩창 구현
 * 2. 상대방 유저 결제 유도
 * 3. 현재 결제 진행 상황 표시
 * 4. 결제 완료 시 리다이렉트 구현
 * 5. 결제는 Kakaopay Open API 고려 -> 웹뷰 사용해야 함
 */

const Payment = ({ route }) => {
  const {
    params: { userId },
  } = route;

  const [tempPayResult, setTempPayResult] = useState(false);
  const [totalPayStatus, setTotalPayStatus] = useState(false);

  useEffect(() => {
    const tempTimer = setTimeout(() => {
      setTempPayResult(true);
    }, 5000);

    const tempTimer2 = setTimeout(() => {
      setTotalPayStatus(true);
    }, 8000);

    tempTimer;
    tempTimer2;

    return () => {
      clearTimeout(tempTimer);
      clearTimeout(tempTimer2);
    };
  }, []);

  // console.log(tempPayResult);
  // console.log(totalPayStatus);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <PendingList bgColor={tempPayResult ? "#2BAE66FF" : styles.lightColor}>
        <UserNickname>{userId}</UserNickname>
        {tempPayResult ? (
          <Feather name="check-circle" size={20} color="#006B38FF" />
        ) : (
          <LoadingBar source={require("../../assets/loading.gif")} />
        )}
      </PendingList>

      <PendingList bgColor="#2BAE66FF">
        <UserNickname>나</UserNickname>
        <Feather name="check-circle" size={20} color="#006B38FF" />
      </PendingList>
      <Text>
        {totalPayStatus
          ? "결제가 모두 완료되었습니다."
          : "아직 결제가 완료되지 않았습니다."}
      </Text>
    </View>
  );
};

export default Payment;

const LoadingBar = styled.Image`
  width: 20px;
  height: 20px;
`;

const PendingList = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 15px;
  width: 80%;
  border-radius: 15px;
  background-color: ${({ bgColor }) =>
    bgColor ? bgColor : styles.lightGrayColor};
  margin-bottom: 30px;
`;

const UserNickname = styled.Text`
  font-weight: bold;
  font-size: 15px;
`;
