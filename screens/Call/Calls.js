import React from "react";
import { FlatList, ScrollView, TouchableOpacity } from "react-native";
import CallListBar from "../../components/CallListBar";

const dummyCallsData = [
  {
    image:
      "https://user-images.githubusercontent.com/48883344/116443339-8380a280-a88e-11eb-8565-275fd79c0003.PNG",
    userId: "분홍벚꽃",
    brandName: "스타벅스",
    menu: "아이스 아메리카노",
    dist: 10,
  },
  {
    image:
      "https://user-images.githubusercontent.com/48883344/116443343-84b1cf80-a88e-11eb-9e64-438c0ab26dca.PNG",
    userId: "노랑백합",
    brandName: "커피빈",
    menu: "핫 아메리카노",
    dist: 20,
  },
  {
    image:
      "https://user-images.githubusercontent.com/48883344/116443345-854a6600-a88e-11eb-9684-4ef24d1ed275.PNG",
    userId: "검은튤립",
    brandName: "앤젤인어스",
    menu: "바닐라 아메리카노",
    dist: 30,
  },
  {
    image:
      "https://user-images.githubusercontent.com/48883344/116443349-854a6600-a88e-11eb-87e0-36f0404304e6.PNG",
    userId: "빨강수선화",
    brandName: "탐앤탐스",
    menu: "수박 아메리카노",
    dist: 40,
  },
  {
    image:
      "https://user-images.githubusercontent.com/48883344/116443352-85e2fc80-a88e-11eb-9c02-b7d03d1b8767.PNG",
    userId: "주황철쭉",
    brandName: "코파인",
    menu: "참외 아메리카노",
    dist: 50,
  },
  {
    image:
      "https://user-images.githubusercontent.com/48883344/116443354-85e2fc80-a88e-11eb-9e44-f0b4d009989a.PNG",
    userId: "초록할미꽃",
    brandName: "할리스커피",
    menu: "딸기 아메리카노",
    dist: 60,
  },
  {
    image:
      "https://user-images.githubusercontent.com/48883344/116443358-867b9300-a88e-11eb-9a83-19b842b9db0a.PNG",
    userId: "보라개나리",
    brandName: "이디야",
    menu: "버섯 아메리카노",
    dist: 70,
  },
  {
    image:
      "https://user-images.githubusercontent.com/48883344/116443360-867b9300-a88e-11eb-96c4-03d76c146aed.PNG",
    userId: "하양목련",
    brandName: "카페베네",
    menu: "무궁화 아메리카노",
    dist: 80,
  },
  {
    image:
      "https://user-images.githubusercontent.com/48883344/116443364-87142980-a88e-11eb-8ca3-1cfc88cb44e8.PNG",
    userId: "파랑아카시아",
    brandName: "투썸플레이스",
    menu: "아프리카 아메리카노",
    dist: 90,
  },
];

/**
 * TODO *
 * 1. 데이터베이스 연결하여 실제 데이터 연동 작업 필요
 * 2. 거리 순으로 오름차순 정렬하여 가장 가까운 거리부터 출력하도록 구현
 * 3. 2번 작업을 서버에서 할 지, 클라이언트에서 할 지 논의 필요 (지금은 클라이언트에서 적용 중)
 */

export default ({ navigation }) => {
  const renderCall = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate("Call", { ...item })}
    >
      <CallListBar {...item} />
    </TouchableOpacity>
  );
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <FlatList
        data={dummyCallsData.sort((a, b) => a.dist - b.dist)}
        renderItem={renderCall}
        nestedScrollEnabled
      ></FlatList>
    </ScrollView>
  );
};
