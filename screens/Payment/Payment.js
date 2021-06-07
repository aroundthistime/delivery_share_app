import React, { useState, useEffect, useRef } from "react";
import { Text, Image } from "react-native";
import styled from "styled-components";
import styles from "../../styles";
import { Feather } from "@expo/vector-icons";
import NavigationButton from "../../components/NavigationButton";
import { useQuery } from "@apollo/client";
import { GET_CALLING } from "../../queries/CallingsQueries";
import { useIsFocused } from "@react-navigation/native";

/**
 * TODO *
 * 0. 전체적인 디자인 구현 (✔)
 * 1. 로딩창 구현
 * 2. 상대방 유저 결제 유도
 * 3. 현재 결제 진행 상황 표시
 * 4. 결제는 Kakaopay Open API 고려 -> 웹뷰 사용해야 함 -> 디자인만 적용 (✔)
 * 5. 실시간으로 상대방 결제 여부 체크해야함 (from DB)
 */

const Payment = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const {
    params: { userId, seq },
  } = route;

  const { loading, data } = useQuery(GET_CALLING, {
    variables: {
      seq,
    },
    pollInterval: 3000,
  });

  const [isAllPaid, setIsAllPaid] = useState("");

  useEffect(() => {
    if (!loading) {
      const { Calling } = data;
      setIsAllPaid(Calling.status);

      if (Calling.status === "isCompleted") {
        // createOrder
      }
    }
  }, [isFocused, loading]);

  return (
    <PaymentView>
      <PayBill>
        <PayCheck
          style={{
            backgroundColor:
              isAllPaid === "isCompleted" ? "#10c06e" : styles.lightGrayColor,
          }}
        >
          <Feather name="check" size={35} color="#fff" />
        </PayCheck>
        <Image
          style={{ marginTop: 30 }}
          source={require("../../assets/deliver.png")}
        />

        <PendingList
          bgColor={isAllPaid === "isCompleted" ? "#10c06e" : styles.lightColor}
        >
          <UserNickname>{userId}</UserNickname>
          {isAllPaid === "isCompleted" ? (
            <Feather name="check-circle" size={20} color="#006B38FF" />
          ) : (
            <LoadingBar source={require("../../assets/loading.gif")} />
          )}
        </PendingList>

        <PendingList bgColor="#10c06e">
          <UserNickname>나</UserNickname>
          <Feather name="check-circle" size={20} color="#006B38FF" />
        </PendingList>

        {isAllPaid === "isCompleted" ? (
          <Text>"결제가 모두 완료되었습니다."</Text>
        ) : (
          <PendingMessage>상대방의 결제를 기다리고 있습니다...</PendingMessage>
        )}
      </PayBill>

      <ButtonArea>
        <NavigationButton
          navigation={navigation}
          flaticon={{
            type: "Ionicons",
            name: "home-outline",
          }}
          params={["TabNavigation"]}
          text="메인화면"
        />
        <NavigationButton
          disabled={isAllPaid === "isCompleted" ? false : true}
          bgColor={
            isAllPaid === "isCompleted"
              ? styles.themeColor
              : styles.lightGrayColor
          }
          navigation={navigation}
          flaticon={{
            type: "Ionicons",
            name: "md-menu",
          }}
          params={["Orders"]}
          text="주문조회"
        />
      </ButtonArea>
    </PaymentView>
  );
};

export default Payment;

const PaymentView = styled.View`
  flex: 1;
`;

const PayBill = styled.View`
  background-color: #fff;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 20px;
  margin-top: 50px;
  border-radius: 15px;
`;

const PayCheck = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  position: absolute;
  top: -25px;
  justify-content: center;
  align-items: center;
`;

const LoadingBar = styled.Image`
  width: 20px;
  height: 20px;
`;

const PendingList = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 15px;
  width: 90%;
  border-radius: 15px;
  background-color: ${({ bgColor }) =>
    bgColor ? bgColor : styles.lightGrayColor};
  margin-bottom: 20px;
`;

const PendingMessage = styled.Text`
  margin-top: 25px;
  margin-bottom: 15px;
`;

const ButtonArea = styled.View`
  align-items: center;
  justify-content: space-evenly;
  flex-direction: row;
  margin-top: 20px;
`;

const UserNickname = styled.Text`
  font-weight: bold;
  font-size: 15px;
`;
