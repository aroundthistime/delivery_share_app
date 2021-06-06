import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components";
import RequestInput from "../../components/RequestInput";
import useInput from "../../Hooks/useInput";
import constants from "../../constants";
import FooterBtn from "../../components/FooterBtn";

const RequestForm = ({ navigation, route }) => {
  const { params } = route;

  const restaurantRequestInput = useInput("", 10);

  const handleSubmit = () => {
    navigation.navigate("Confirm", {
      ...params,
      restaurantRequest: restaurantRequestInput.value,
    });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 15,
      }}
    >
      <SectionContainer>
        <SectionHeader>요청사항</SectionHeader>
        <View style={{ marginBottom: 10 }}>
          <RequestInputTitle>가게 사장님께</RequestInputTitle>
          <RequestInput
            {...restaurantRequestInput}
            placeholder={`예) 덜 맵게 해주세요. (최대 ${constants.requestMaxLength}자)`}
            autoCorrect={false}
            multiline
          />
        </View>
      </SectionContainer>
      <FooterBtn text="주문진행" onPress={handleSubmit} needStyle />
    </View>
  );
};

export default RequestForm;

const SectionContainer = styled.View`
  margin-top: 15;
  margin-bottom: 5;
`;

const SectionHeader = styled.Text`
  font-size: 18;
  font-weight: bold;
  margin-bottom: 15;
`;

const RequestInputTitle = styled.Text`
  font-size: 14.5;
  margin-bottom: 10;
  opacity: 0.8;
`;
