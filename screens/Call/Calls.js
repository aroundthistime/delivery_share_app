import { useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  Image,
} from "react-native";
import CallListBar from "../../components/CallListBar";
import { GET_NEAR_CALLINGS } from "../../queries/CallingsQueries";
import { ButtonText, RefreshBtn } from "./styled";
import { v4 as uuid } from "uuid";

/**
 * TODO *
 * 1. 데이터베이스 연결하여 실제 데이터 연동 작업 필요 (✔)
 * 2. 거리 순으로 오름차순 정렬하여 가장 가까운 거리부터 출력하도록 구현 (✔)
 * 3. Emulation Geolocation 기능 인식 문제로 고정 lat, lng 값 사용중 (현재 내 위치 기반으로 수정 필요)
 */

// Emulator에서 Geolocation 기능이 안 먹는 관계로 고정 lat, lng 값 사용
const locObj = {
  latitude: 37.59685279191918,
  longitude: 127.06075479761786,
};

export default ({ navigation }) => {
  const { loading, data, refetch } = useQuery(GET_NEAR_CALLINGS, {
    variables: locObj,
  });

  const handleRefresh = () => {
    refetch();
  };

  const renderCall = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate("Call", { ...item })}
    >
      <CallListBar {...item} />
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
              source={require("../../assets/loading.gif")}
            />
          </View>
        ) : (
          <FlatList
            data={data.getNearCalls
              .filter((call) => call.status === "isActivated")
              .sort((a, b) => a.distance - b.distance)}
            renderItem={renderCall}
            keyExtractor={() => uuid()}
            nestedScrollEnabled
          ></FlatList>
        )}
      </ScrollView>
      <RefreshBtn onPress={handleRefresh}>
        <ButtonText>새로고침</ButtonText>
      </RefreshBtn>
    </View>
  );
};
