import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components";

export default ({ navigation, route }) => {
  const {
    params: { orderId }
  } = route;
  return (
    <View>
      <Text>Order</Text>
    </View>
  );
};
