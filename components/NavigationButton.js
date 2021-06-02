import React from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import styled from "styled-components";
import { Text } from "react-native";
import constants from "../constants";
import styles from "../styles";

/**
 * TODO *
 * 1. function modularzation 필요 (개당 1 기능 담당하도록)
 */

const NavigationButton = ({
  disabled,
  bgColor,
  navigation,
  flaticon,
  params,
  text,
  background,
  additionalMethod = () => 1
}) => {
  const setVectorIcons = (flaticon) => {
    const config = {
      size: 24,
      color: bgColor ? "#fff" : "#111",
      style: { marginRight: 10 },
    };
    if (flaticon.type === "Ionicons")
      return <Ionicons name={flaticon.name} {...config} />;
    else if (flaticon.type === "MaterialCommunityIcons")
      return <MaterialCommunityIcons name={flaticon.name} {...config} />;
  };

  const setButtonContent = (background) => {
    const styles = background
      ? {
        style: { color: "#fff", fontWeight: "bold", fontSize: 16 },
      }
      : { style: { color: bgColor ? "#fff" : "#111" } };
    return (
      <>
        {flaticon ? setVectorIcons(flaticon) : null}
        <Text {...styles}>{text}</Text>
      </>
    );
  };

  return background ? (
    <ButtonBackground
      disabled={disabled}
      background={background}
      onPress={() => {
        additionalMethod()
        navigation.navigate(...params);
      }}
    >
      {setButtonContent(background)}
    </ButtonBackground>
  ) : (
    <NavigationBtn
      bgColor={bgColor}
      disabled={disabled}
      onPress={() => {
        additionalMethod()
        navigation.navigate(...params);
      }}
    >
      {setButtonContent(background)}
    </NavigationBtn>
  );
};

export default NavigationButton;

const NavigationBtn = styled.TouchableOpacity`
  flex-direction: row;
  border: ${({ bgColor }) => (bgColor ? "none" : `1px solid ${styles.lightGrayColor}`)};
  border-radius: 10px;
  padding: 10px 15px;
  width: ${constants.width / 2 - 35};
  justify-content: center;
  align-items: center;
  background-color: ${({ bgColor }) => (bgColor ? bgColor : "transparent")};
`;

const ButtonBackground = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  padding: 15px 0;
  margin-left : 10;
  margin-right : 10;
  border-radius : 5;
  margin-bottom: 20px;
  background-color: ${({ background }) => (background ? background : "#fff")};
`;
