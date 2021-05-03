import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components";

/**
 * TODO *
 * 1. 거리 정보 사전 계산 및 연동 필요
 * 2. Category 구분 필터 적용 여부 논의 필요
 */

const CallListBar = ({ image, brandName, userId, menus, dist }) => {
  return (
    <MenuContainer>
      <MenuImage source={{ uri: image }} />
      <View style={{ marginLeft: 15 }}>
        <Text>브랜드 : {brandName}</Text>
        <Text>대기자 : {userId}</Text>
        <Text>
          메뉴 : {menus[0].name}{" "}
          {menus.length - 1 ? "외 " + (menus.length - 1) + "개" : null}
        </Text>
      </View>
      <View style={{ position: "absolute", right: 15 }}>
        <Text>거리: {dist}M</Text>
      </View>
    </MenuContainer>
  );
};

export default CallListBar;

const MenuContainer = styled.View`
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 10px;
  background-color: #fff;
  border-bottom-color: #ededed;
  border-bottom-width: 1px;
  margin-bottom: 5px;
`;

const MenuImage = styled.Image`
  width: 80;
  height: 80;
  border-radius: 80;
`;
