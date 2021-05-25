import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import styled from "styled-components";
import styles from "../styles";
import RateStars from "./RateStars";

/**
 * TODO *
 * 1. Pagination 구축 ?
 * 2. 또는 infinite scrolling + scrolling down 시 작성버튼 노출
 */

const CallListBar = ({ userId, userImg, stars, content }) => {
  return (
    <MenuContainer>
      <MenuImage source={{ uri: userImg }} />
      <View style={{ flex: 1, marginLeft: 15 }}>
        <UserNickname>
          <Text style={{ color: "#3f3f3f", fontWeight: "bold" }}>{userId}</Text>
          <RateStars rate={stars} />
        </UserNickname>
        <Text>{content}</Text>
      </View>
    </MenuContainer>
  );
};

export default CallListBar;

const MenuContainer = styled.View`
  display: flex;
  align-items: center;
  flex-direction: row;
  background-color: #fff;
  border-bottom-color: #ededed;
  border-bottom-width: 1px;
  margin-bottom: 5px;
  padding: 5px 0;
  width: 100%;
`;

const MenuImage = styled.Image`
  width: 50;
  height: 50;
  border-radius: 50;
`;

const UserNickname = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
`;
