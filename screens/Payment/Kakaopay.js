import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components";

/**
 * TODO *
 * 1. 결제완료 시 유저 결제여부 값 DB에 true로 반영
 * 2. 반영된 값을 넘겨주어 결제 대기창에서 로딩 적용 및 해제 판단해야함
 */

const Kakaopay = ({ navigation, route }) => {
  const {
    params: { requestForStore, requestForDelivery, menus, userId },
  } = route;

  return (
    <View style={{ height: "100%", backgroundColor: "#fff" }}>
      <KakaoTitle>
        <KakaopayImage source={require("../../assets/kakaopay.png")} />
      </KakaoTitle>

      <KakaopayContent>
        <KakaopayText>카카오페이 결제 후,</KakaopayText>
        <KakaopayText>
          <Text style={{ fontWeight: "bold" }}>결제 완료</Text> 버튼을
          눌러주세요.
        </KakaopayText>
        <Text style={{ color: "#ff9100", fontSize: 12 }}>
          최신 버전의 카카오톡이 필요합니다.
        </Text>
      </KakaopayContent>

      <KakaopayButtons>
        <KakaoButton
          background="#fdd835"
          onPress={() =>
            navigation.navigate("Payment", {
              requestForStore,
              requestForDelivery,
              menus,
              userId,
            })
          }
        >
          <KakaoComplete>결제완료</KakaoComplete>
        </KakaoButton>
        <KakaoButton>
          <KakaoCancel>취소하기</KakaoCancel>
        </KakaoButton>
      </KakaopayButtons>

      <KakaopayNotice>
        <Text style={{ fontSize: 13 }}>
          카카오페이가 실행되지 않거나 창을 닫으셨나요?
        </Text>
      </KakaopayNotice>
    </View>
  );
};

export default Kakaopay;

const KakaoTitle = styled.View`
  width: 100%;
  padding: 20px;
`;

const KakaopayImage = styled.Image`
  width: 69px;
  height: 25px;
`;

const KakaopayContent = styled.View`
  flex: 6;
  justify-content: center;
  align-items: center;
`;

const KakaopayText = styled.Text`
  font-size: 18px;
`;

const KakaopayButtons = styled.View`
  flex: 1.5;
  padding: 20px;
`;

const KakaoButton = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 3px;
  background-color: ${({ background }) => (background ? background : "#fff")};
`;

const KakaoComplete = styled.Text`
  font-size: 18px;
`;

const KakaoCancel = styled.Text`
  text-decoration: underline;
`;

const KakaopayNotice = styled.View`
  flex: 0.5;
  padding: 15px;
  justify-content: center;
  align-items: center;
  background-color: #f7f7f7;
  border-top-width: 1px;
  border-top-color: #d0d0d0;
`;
