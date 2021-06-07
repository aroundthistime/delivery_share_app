import React from "react";
import styled from "styled-components";
import { Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import styles from "../styles";

/**
 * TODO *
 * 1. User Profile Image 연동 필요
 * 2. User Star Rank 연동 필요
 */

const UserSpecification = ({ user }) => {
  const thumbnail =
    user.thumbnail ||
    "https://user-images.githubusercontent.com/48883344/116450778-a9aa4080-a896-11eb-8515-ad4a8af7d342.png";
  return (
    <UserSpecs>
      <ProfileImage
        source={{
          uri: thumbnail,
        }}
      />
      <View>
        <Text style={{ marginBottom: 10, fontWeight: "bold", fontSize: 18 }}>
          {user.name ? user.name : user.ID}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ textAlignVertical: "center", marginRight: 10 }}>
            유저평점 :
          </Text>
          <FontAwesome name="star" size={13.5} color={styles.yellowColor} />
          <Text style={{ marginLeft: 5 }}>{user.rate.toFixed(1)}</Text>
        </View>
      </View>
    </UserSpecs>
  );
};

export default UserSpecification;

export const UserSpecs = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ProfileImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 60px;
  margin-right: 20px;
`;