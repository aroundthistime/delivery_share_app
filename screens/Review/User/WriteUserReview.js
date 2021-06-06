import React, { useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { CommonActions } from "@react-navigation/native";
import styled from "styled-components";
import ContainerWrapper from "../../../components/ContainerWrapper";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../../styles";
import Slider from "@react-native-community/slider";
import RateStars from "../../../components/RateStars";
import constants from "../../../constants";
import { useMutation } from "@apollo/client";
import { CREATE_USER_REVIEW } from "../../../queries/ReviewsMutations";

/**
 * TODO *
 * 1. 리뷰 작성 Form 제작 (✔)
 * 2. 별도 스크린으로 뺄건지 vs 하나의 스크린에 통합할 건 지 검토 필요 (✔)
 * 3. 작성된 내용 바로 화면에 반영 (✔)
 * 4. API 구현 시 작성 내용 데이터베이스에 반영하도록 연동 - handleSubmit 구현 (✔)
 * 5. fromseq (= 현재 로그인 된 유저를 어떻게 구분해서 가져올 수 있는지 고려)
 */

const STARS_ROW_WIDTH = 220;

export default ({ navigation, route }) => {
  const {
    params: { toseq },
  } = route;
  const [starValue, setStarValue] = useState(3);
  const [comment, setComment] = useState("");
  const [error, setError] = useState(false);

  const [createUserReview] = useMutation(CREATE_USER_REVIEW);

  const clickSubmitButton = () => {
    if (!checkComment()) {
      setError(true);
      return;
    }
    setError(false);
    handleSubmit();
    navigation.dispatch(CommonActions.goBack("UserReviews"));
  };

  const checkComment = () => {
    return comment ? true : false;
  };

  const handleSubmit = () => {
    createUserReview({
      variables: {
        content: comment,
        rate: starValue,
        toseq,
        fromseq: 10,
      },
    });
  };

  return (
    <ScrollView>
      <ContainerWrapper>
        <View style={{ flexDirection: "row" }}>
          <Ionicons
            style={{ marginRight: 10 }}
            name="notifications"
            size={20}
            color={styles.themeColor}
          />
          <TextTitle>리뷰작성 안내사항</TextTitle>
        </View>

        <Text>1. 근거없는 비방이나 욕설은 자제해주세요.</Text>
        <Text>2. 허위사실 유포는 법에 따라 처벌받을 수 있습니다.</Text>
        <Text>3. 정확한 사실 위주로 작성해주세요.</Text>
        <Text>4. 코멘트는 최대 100자까지 작성이 가능합니다.</Text>
      </ContainerWrapper>

      <ContainerWrapper>
        <TextTitle style={{ paddingBottom: 50 }}>⭐ 유저 별점</TextTitle>
        <View
          style={{
            flexDirection: "row",
            position: "absolute",
            top: 60,
            left: (constants.width - STARS_ROW_WIDTH) / 2,
          }}
        >
          <RateStars rate={starValue} size={45} width={STARS_ROW_WIDTH} />
        </View>
        <View
          style={{
            flexDirection: "row",
            position: "absolute",
            top: 60,
            left: (constants.width - STARS_ROW_WIDTH) / 2,
          }}
        >
          <Slider
            style={{ width: STARS_ROW_WIDTH, height: 50, opacity: 0 }}
            value={starValue}
            onValueChange={(value) => setStarValue(value)}
            minimumValue={1}
            maximumValue={5}
            step={0.5}
          />
        </View>
      </ContainerWrapper>

      <ContainerWrapper>
        <TextTitle>🖊 한 줄 코멘트</TextTitle>
        <TextInput
          style={{
            padding: 10,
            borderColor: "#ededed",
            borderWidth: 1,
            borderRadius: 10,
          }}
          placeholder="코멘트를 작성해주세요..."
          multiline
          maxLength={100}
          value={comment}
          onChangeText={(text) => setComment(text)}
        />
        {error && <ErrorMessage>코멘트를 작성해주세요!</ErrorMessage>}
      </ContainerWrapper>

      <SubmitButton onPress={clickSubmitButton}>
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 17 }}>
          완료
        </Text>
      </SubmitButton>
    </ScrollView>
  );
};

const TextTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
`;

const ErrorMessage = styled.Text`
  color: red;
  font-size: 12px;
  text-align: right;
  margin-top: 5px;
`;

const SubmitButton = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 0;
  margin-left: 15;
  margin-right: 15;
  border-radius: 5;
  margin-bottom: 20px;
  background-color: ${styles.themeColor};
`;
