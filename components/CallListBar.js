import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles";

/**
 * TODO *
 * 1. 거리 정보 사전 계산 및 연동 필요
 * 2. Category 구분 필터 적용 여부 논의 필요
 */

const CallListBar = ({ image, brandName, userId, menus, dist }) => {
  return (
    <MenuContainer>
      <BrandImage source={{ uri: image }} />
      <View style={{ marginLeft: 15 }}>
        <Menudetails>
          <FontAwesome5 name="store" size={14} color={styles.themeColor} />
          <MenuDescription>브랜드 : {brandName}</MenuDescription>
        </Menudetails>

        <Menudetails>
          <FontAwesome5 name="user-alt" size={17} color={styles.themeColor} />
          <MenuDescription>대기자 : {userId}</MenuDescription>
        </Menudetails>

        <Menudetails>
          <Ionicons name="fast-food" size={17} color={styles.themeColor} />
          <MenuDescription>
            메뉴 : &nbsp;
            {menus[0].name +
              (menus.length - 1 ? " 외 " + (menus.length - 1) + "개" : null)}
          </MenuDescription>
        </Menudetails>

        <Menudetails>
          <Ionicons name="location" size={17} color={styles.themeColor} />
          <MenuDescription>거리: {dist}M</MenuDescription>
        </Menudetails>
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

const BrandImage = styled.Image`
  width: 80;
  height: 80;
  border-radius: 80;
`;

const Menudetails = styled.View`
  flex-direction: row;
  margin-bottom: 2.5px;
`;

const MenuDescription = styled.Text`
  margin-left: 10px;
`;
