import React from "react";
import { Platform, Text } from "react-native";
import styled from "styled-components";
import constants from "../constants";
import styles from "../styles";

const ListBar = styled.TouchableOpacity`
    flex-direction : row;
    align-items : center;
    width : ${constants.width};
    height : 110;
    padding-left : 15;
    padding-right : 10;
    background-color : white;
    margin-bottom : ${styles.grayBorderWidth + 0.8};
`

const MenuImage = styled.Image`
    width : 80;
    height : 80;
    border-radius : 10;
`

const MenuInfos = styled.View`
    width : ${constants.width - 210};
    margin-left : 15;
    margin-right : 15;
`

const MenuName = styled.Text`
    font-size : 15;
    font-weight : 600;
    margin-bottom : 2;
`

const MenuDescription = styled.Text`
    opacity : 0.5;
    font-size : 12.5;
    margin-bottom : 5;
`

const MenuPrice = styled.Text`
    font-size : 14;
`

const MenuBadgeContainer = styled.Text`
    width : 26;
    height : 26;
    text-align : center;
    text-align-vertical : center;
    border-radius : 13;
    background-color : ${styles.themeColor};
    color : #fcfcfc;
    font-size : 12;
`

const MenuBadge = ({isBestMenu}) => (
    isBestMenu ?
    (
        <MenuBadgeContainer
            style={{
                backgroundColor : styles.themeColor,
                ...Platform.select({
                ios: {
                    shadowColor: "rgb(50, 50, 50)",
                    shadowOpacity: 0.5,
                    shadowRadius: 5,
                    shadowOffset: {
                    height: -1,
                    width: 0,
                    },
                },
                android: {
                    elevation: 3,
                },
            })}}
        >인기</MenuBadgeContainer>
    ) : (
        <MenuBadgeContainer
            style={{
                backgroundColor : "gray",
                ...Platform.select({
                ios: {
                    shadowColor: "rgb(50, 50, 50)",
                    shadowOpacity: 0.5,
                    shadowRadius: 5,
                    shadowOffset: {
                    height: -1,
                    width: 0,
                    },
                },
                android: {
                    elevation: 3,
                },
            })}}
        >품절</MenuBadgeContainer>
    )
)

export default ({name, description, thumbnail, isAvailable, price, isBestMenu, onPress}) => (
    <ListBar onPress={isAvailable ? onPress : ()=>1} activeOpacity={0.3}>
        {isAvailable ? (
            <MenuImage source={{uri : thumbnail}}/>
        ) : (
            <MenuImage source={{uri : thumbnail}} style={{opacity : 0.3}} />
        )}
        <MenuInfos>
            <MenuName numberOfLines={1}>{name}</MenuName>
            <MenuDescription numberOfLines={2}>{description}</MenuDescription>
            <MenuPrice>{price}원</MenuPrice>
        </MenuInfos>
        {!isAvailable && <MenuBadge isBestMenu={false}>품절</MenuBadge>}
        {isAvailable && isBestMenu && <MenuBadge isBestMenu={true}>인기</MenuBadge>}
    </ListBar>
)