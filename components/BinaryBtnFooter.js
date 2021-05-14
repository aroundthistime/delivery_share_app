import React from "react";
import { Text } from "react-native";
import styled from "styled-components";
import constants from "../constants";
import styles from "../styles";

const CartBtnContainer = styled.TouchableOpacity`
    justify-content : center;
    align-items : center;
    width : ${constants.width / 2 - 10};
    border-radius : 5;
    height : 60;
`

const CartBtns = styled.View`
    width : ${constants.width};
    height : 80;
    position : absolute;
    left : 0;
    bottom : 0;
    flex-direction : row;
    justify-content : space-around;
    align-items : center;
    background-color : ${styles.bgColor};
    border-color : ${styles.lightGrayColor};
    border-top-width : ${styles.grayBorderWidth};
`


export default ({ leftOnPress, rightOnPress, leftText, rightText }) => (
    <CartBtns>
        <CartBtnContainer
            onPress={leftOnPress}
            style={{
                backgroundColor: "white",
                borderColor: styles.lightThemeColor,
                borderWidth: 0.5
            }}
            activeOpacity={0.4}
        >
            <Text style={{ fontSize: 16, color: styles.themeColor, fontWeight: "600" }}>{leftText}</Text>
        </CartBtnContainer>
        <CartBtnContainer
            onPress={rightOnPress}
            style={{ backgroundColor: styles.themeColor }}
            activeOpacity={0.4}
        >
            <Text style={{ fontSize: 16, color: "white", fontWeight: "600" }}>{rightText}</Text>
        </CartBtnContainer>
    </CartBtns>
)