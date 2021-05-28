import React from "react";
import styled from "styled-components";
import constants from "../constants";
import styles from "../styles";

const BtnContainer = styled.View`
    width : ${constants.width}
    padding-top : 10;
    padding-bottom : 10;
    justify-content : center;
    align-items : center;
    background-color : white;
    border-color : ${styles.lightGrayColor};
    border-width : ${styles.grayBorderWidth};
`

const Btn = styled.TouchableOpacity`
    width : ${constants.width - 30};
    height : 50;
    justify-content : center;
    align-items : center;
    border-radius : 5;
`

const BtnText = styled.Text`
    color : #fcfcfc;
    font-size : 16;
    font-weight : bold;
`

export default ({ text, onPress, header, needStyle = false, isAvailable = true }) =>
    needStyle ? (
        <BtnContainer style={{ position: "absolute", bottom: 0, left: 0 }}>
            {header && header}
            <Btn
                onPress={isAvailable ? onPress : () => 1}
                activeOpacity={isAvailable ? 0.5 : 1}
                style={{ backgroundColor: isAvailable ? styles.themeColor : "#BDBDBD" }}
            >
                <BtnText>{text}</BtnText>
            </Btn>
        </BtnContainer>
    ) : (
        <BtnContainer>
            {header && header}
            <Btn
                onPress={isAvailable ? onPress : () => 1}
                activeOpacity={isAvailable ? 0.5 : 1}
                style={{ backgroundColor: isAvailable ? styles.themeColor : "#BDBDBD" }}
            >
                <BtnText>{text}</BtnText>
            </Btn>
        </BtnContainer>
    )