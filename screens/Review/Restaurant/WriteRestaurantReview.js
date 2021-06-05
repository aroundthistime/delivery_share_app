import React, { useState } from "react";
import { ScrollView, Text, TextInput, View, Image } from "react-native";
import styled from "styled-components";
import ContainerWrapper from "../../../components/ContainerWrapper";
import { Ionicons } from "@expo/vector-icons";
import styles from "../../../styles";
import { AntDesign } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import RateStars from "../../../components/RateStars";
import constants from "../../../constants";
import { TouchableOpacity } from "react-native-gesture-handler";

const STARS_ROW_WIDTH = 220;

export default ({ navigation, route }) => {
  const [starValue, setStarValue] = useState(3);
  const [comment, setComment] = useState("");
  const [error, setError] = useState(false);
  const [imageUpload, setImageUpload] = useState(false);

  const clickSubmitButton = () => {
    if (!checkComment()) {
      setError(true);
      return;
    }
    setError(false);
    handleSubmit();
    navigation.navigate("Orders");
  };

  const checkComment = () => {
    return comment ? true : false;
  };

  const handleSubmit = () => {
    console.log(starValue, comment);
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
        <TextTitle style={{ paddingBottom: 50 }}>⭐ 식당 별점</TextTitle>
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
        <TextTitle>이미지 업로드</TextTitle>
        <View style={{ flexDirection: "row" }}>
          {imageUpload && (
            <Image
              style={{
                width: 106,
                height: 106,
                marginRight: 15,
              }}
              source={{
                uri: "https://i.esdrop.com/d/eae6tqatp81y/9pWmngSQ6q.jpeg",
              }}
            />
          )}
          <TouchableOpacity onPress={() => setImageUpload(true)}>
            <View
              style={{
                padding: 40,
                backgroundColor: "#ededed",
                borderWidth: 1,
                borderRadius: 1,
                borderStyle: "dashed",
              }}
            >
              <AntDesign name="plussquareo" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>
      </ContainerWrapper>

      <ContainerWrapper>
        <TextTitle>식당 리뷰 작성</TextTitle>
        <TextInput
          style={{
            padding: 10,
            borderColor: "#ededed",
            borderWidth: 1,
            borderRadius: 10,
          }}
          placeholder="리뷰를 작성해주세요..."
          multiline
          maxLength={100}
          value={comment}
          onChangeText={(text) => setComment(text)}
        />
        {error && <ErrorMessage>리뷰를 작성해주세요!</ErrorMessage>}
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
