import React, { useEffect } from "react";
import { FlatList, ScrollView, Text, View, Image } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import UserSpecification from "../../../components/UserSpecification";
import ReviewsBar from "../../../components/ReviewsBar";
import styles from "../../../styles";
import ContainerWrapper from "../../../components/ContainerWrapper";
import NavigationButton from "../../../components/NavigationButton";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../../queries/CallingsQueries";
import { v4 as uuid } from "uuid";

/**
 * TODO *
 * 0. component 단위로 modularization (✔)
 * 1. 유저 정보 연동 필요 (가입일자 / 주문건수 등등) (✔)
 * 2. 실제 유저 리뷰 데이터 연동 필요 (✔)
 * 3. Infinite scrolling + 리뷰작성 버튼 sticky positon (✔)
 * 4. star 디자인 변경 및 0.5 단위 출력 필요 (✔)
 * 5. 유저 프로필 이미지 연동 필요 (✔)
 */

export default ({ navigation, route }) => {
  const {
    params: { user },
  } = route;

  const renderReviews = ({ item }) => <ReviewsBar user={item} />;

  const isFocused = useIsFocused();
  const { loading, data, refetch } = useQuery(GET_USER, {
    variables: { seq: user.seq },
  });

  useEffect(() => {
    refetch();
  }, [isFocused]);

  return (
    <ScrollView stickyHeaderIndices={[2]} showsVerticalScrollIndicator={false}>
      <ContainerWrapper>
        <UserSpecification user={user} />
      </ContainerWrapper>

      <ContainerWrapper>
        <TextTitle>• 상세정보</TextTitle>
        <Text>가입일자 : {user.created_at || `2021.03.13`}</Text>
        <Text>주문건수 : {user.orderCounts}건</Text>
      </ContainerWrapper>

      <NavigationButton
        background={styles.themeColor}
        navigation={navigation}
        params={["WriteUserReview", { toseq: user.seq }]}
        text="리뷰작성"
      />

      <ContainerWrapper>
        <TextTitle>• 유저평가</TextTitle>
        {loading ? (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: 300,
            }}
          >
            <Image
              style={{ width: 40, height: 40 }}
              source={require("../../../assets/loading.gif")}
            />
          </View>
        ) : (
          <View>
            <FlatList
              data={data.getUser.reviews}
              renderItem={renderReviews}
              keyExtractor={() => uuid()}
              nestedScrollEnabled
            />
            {!data.getUser.reviews.length && (
              <Text>아직 작성된 리뷰가 없습니다.</Text>
            )}
          </View>
        )}
      </ContainerWrapper>
    </ScrollView>
  );
};

const TextTitle = styled.Text`
  font-weight: bold;
  margin-bottom: 15px;
`;
