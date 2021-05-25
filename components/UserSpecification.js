import React from "react";
import styled from "styled-components";
import { Text, View } from "react-native";

/**
 * TODO *
 * 1. User Profile Image 연동 필요
 * 2. User Star Rank 연동 필요
 */

const UserSpecification = ({ userId }) => {
  return (
    <UserSpecs>
      <ProfileImage
        source={{
          uri:
            "https://user-images.githubusercontent.com/48883344/116450778-a9aa4080-a896-11eb-8515-ad4a8af7d342.png",
        }}
      />
      <View>
        <Text style={{ marginBottom: 10, fontWeight: "bold", fontSize: 18 }}>
          {userId}
        </Text>
        <Text>유저평점: ⭐⭐⭐⭐</Text>
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
  width: 80px;
  height: 80px;
  border-radius: 80px;
  margin-right: 20px;
`;
