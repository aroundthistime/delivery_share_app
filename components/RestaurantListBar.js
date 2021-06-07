import React from "react";
import { Text, View } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import styled from "styled-components";
import constants from "../constants";
import styles from "../styles";
import { formatReviewCounts } from "../utils";

const ListBar = styled.TouchableOpacity`
    flex-direction : row;
    align-items : center;
    width : ${constants.width};
    height : 90;
    padding-left : 20;
    padding-right : 20;
    background-color : white;
    margin-bottom : ${styles.grayBorderWidth};
`

const RestaurantImg = styled.Image`
    width : ${constants.restaurantImageSize};
    height : ${constants.restaurantImageSize};
    border-radius : ${constants.restaurantImageSize / 2};
    margin-right : 15;
`

const RestaurantClosed = styled.Text`
    width : ${constants.restaurantImageSize};
    height : ${constants.restaurantImageSize};
    border-radius : ${constants.restaurantImageSize / 2};
    text-align : center;
    text-align-vertical : center;
    color : #fcfcfc;
    background-color : rgba(0, 0, 0, 0.5);
    position : absolute;
    top : ${(90 - constants.restaurantImageSize) / 2};
    left : 20;
`

const RestaurantInfos = styled.View`
    width : ${constants.width - 55 - constants.restaurantImageSize};
`

const RestaurantName = styled.Text`
    font-size : 15;
    font-weight : bold;
    width : ${constants.width - 55 - constants.restaurantImageSize};
`

const BlurText = styled.Text`
    opacity : 0.6;
    font-size : 12.5;
`

const RestaurantRate = ({ rate, reviewCounts }) => (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
        <FontAwesome name="star" size={11.5} color={styles.yellowColor} />
        <Text style={{ marginLeft: 5, fontSize: 12 }}><Text style={{ fontWeight: "bold" }}>{rate.toFixed(1)}</Text> ({reviewCounts})</Text>
    </View>
)


const RestaurantBar = ({ thumbnail, name, rate, rate1count, rate2count, rate3count, rate4count, rate5count, bestmenus, min_order, onPress, isopen }) => {
    return (
        <ListBar onPress={onPress}>
            <RestaurantImg source={{ uri: thumbnail }} />
            {!isopen && <RestaurantClosed>준비중</RestaurantClosed>}
            <RestaurantInfos style={{ opacity: isopen ? 1 : 0.45 }}>
                <RestaurantName numberOfLines={1}>{name}</RestaurantName>
                <RestaurantRate rate={rate} reviewCounts={formatReviewCounts(rate1count + rate2count + rate3count + rate4count + rate5count)} />
                <BlurText>최소주문금액 {min_order}원</BlurText>
                <BlurText numberOfLines={1}>{bestmenus.map(bestmenu => bestmenu.name).join(", ")}</BlurText>
            </RestaurantInfos>
        </ListBar>
    )
}

export default RestaurantBar;