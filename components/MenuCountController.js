import React from "react";
import { Text } from "react-native";
import styled from "styled-components";
import styles from "../styles";

const MenuCountController = styled.View`
    width : 110;
    height : 40;
    border-color : ${styles.lightGrayColor};
    border-width : 1;
    border-radius : 20;
    flex-direction : row;
`

const CountControlBtnContainer = styled.TouchableOpacity`
    justify-content : center;
    align-items : center;
    width : 40;
    height : 40;
`

const CountControlBtn = ({isMinus, onPress, count}) => (
    isMinus ? (
        <CountControlBtnContainer onPress={onPress} activeOpacity={0.9}>
            <Text style={{fontSize : 16, opacity : count > 1 ? 1 : 0.2}}>-</Text>
        </CountControlBtnContainer>
    ) : (
        <CountControlBtnContainer onPress={onPress} activeOpacity={0.9}>
            <Text style={{fontSize : 16}}>+</Text>
        </CountControlBtnContainer>
    )
)

const CurrentCount = styled.Text`
    width : 30;
    height : 40;
    text-align : center;
    text-align-vertical : center;
    font-size : 15;
`

export default ({count, onDecrease, onIncrease}) => (
    <MenuCountController>
        <CountControlBtn isMinus={true} onPress={onDecrease} count={count}/>
        <CurrentCount>{count}</CurrentCount>
        <CountControlBtn isMinus={false} onPress={onIncrease} />
    </MenuCountController>
)