import React from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
import styled from "styled-components";
import UserSpecification from "../../../components/UserSpecification";
import { ButtonBackground, UserProfile } from "../../Call/styled";
import ReviewsBar from "../../../components/ReviewsBar";
import styles from "../../../styles";

/**
 * TODO *
 * 0. component 단위로 modularization
 * 1. 유저 정보 연동 필요 (가입일자 / 주문건수 등등)
 * 2. 실제 유저 리뷰 데이터 연동 필요
 * 3. Infinite scrolling + 스크롤 다운 시 작성 버튼 출력 vs Pagination
 * 4. star 디자인 변경 및 0.5 단위 출력 필요
 * 5. 유저 리뷰 내용 길이 제한 필요한지 검토
 * 6. 유저 프로필 이미지 연동 필요
 * 7. 자기가 작성한 리뷰 수정/제거 기능 도입 검토
 */

export default ({ navigation, route }) => {
  const {
    params: { userId },
  } = route;

  const renderReviews = ({ item }) => <ReviewsBar {...item} />;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <UserProfile>
        <UserSpecification userId={userId} />
      </UserProfile>

      <UserDetails>
        <Text style={{ fontWeight: "bold", marginBottom: 15 }}>• 상세정보</Text>
        <Text>가입일자 : 2021.03.13</Text>
        <Text>주문건수 : 154건</Text>
      </UserDetails>

      <UserReviews>
        <Text style={{ fontWeight: "bold", marginBottom: 15 }}>• 유저평가</Text>
        <FlatList
          data={dummyReviews}
          renderItem={renderReviews}
          nestedScrollEnabled
        />
      </UserReviews>

      <ButtonBackground
        bgColor={styles.themeColor}
        /* navigation navigate to Order Process */
        onPress={() => navigation.navigate("WriteUserReview")}
      >
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 22 }}>
          리뷰작성
        </Text>
      </ButtonBackground>
    </ScrollView>
  );
};

const UserDetails = styled.View`
  background-color: #fff;
  padding: 20px;
  border-bottom-color: #ededed;
  border-bottom-width: 1px;
  margin-bottom: 20px;
`;

const UserReviews = styled.View`
  background-color: #fff;
  padding: 20px;
  border-bottom-color: #ededed;
  border-bottom-width: 1px;
  margin-bottom: 20px;
`;

const dummyReviews = [
  {
    userId: "푸른닐리리아",
    userImg:
      "https://user-images.githubusercontent.com/48883344/116450778-a9aa4080-a896-11eb-8515-ad4a8af7d342.png",
    stars: 4.5,
    content: "친절합니다.",
  },
  {
    userId: "지나가는행인",
    userImg:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/1.jpg",
    stars: 2.5,
    content: "먹튀 최악.",
  },
  {
    userId: "가나다라마바사",
    userImg:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/2.jpg",
    stars: 4.0,
    content: "무난무난.",
  },
  {
    userId: "배고프다",
    userImg:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/3.jpg",
    stars: 4.0,
    content: "친절하네용.",
  },
  {
    userId: "배달빨리와라",
    userImg:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/4.jpg",
    stars: 4.0,
    content: "잘 만나고 헤어졌습니다.",
  },
  {
    userId: "자장면먹고싶다",
    userImg:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/5.jpg",
    stars: 3.5,
    content: "조금 늦게 나오시네용 ^_^.",
  },
  {
    userId: "자진모리장단",
    userImg:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/1.jpg",
    stars: 4.5,
    content: "완전 짱이에요!.",
  },
  {
    userId: "굿거리장단",
    userImg:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/2.jpg",
    stars: 4.0,
    content: "무난합니다 정말",
  },
  {
    userId: "나빼고라면",
    userImg:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/3.jpg",
    stars: 4.0,
    content: "잘 먹고 갑니다.",
  },
  {
    userId: "먹고있네",
    userImg:
      "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/4.jpg",
    stars: 2.5,
    content: "왤케 연락이 안되나요 -_-.",
  },
];
