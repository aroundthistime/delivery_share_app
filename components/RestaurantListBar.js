import React from "react";
import { Text, View } from "react-native";
// import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import styled from "styled-components";
import constants from "../constants";
import styles from "../styles";
import { formatReviewCounts } from "../utils";

const RESTAURANT_IMAGE_SIZE = 66;

const ListBar = styled.TouchableOpacity`
    flex-direction : row;
    align-items : center;
    width : ${constants.width};
    height : 90;
    padding-left : 20;
    padding-right : 20;
    background-color : ${styles.bgColor};
    margin-bottom : ${styles.grayBorderWidth};
`

const RestaurantImg = styled.Image`
    width : ${RESTAURANT_IMAGE_SIZE};
    height : ${RESTAURANT_IMAGE_SIZE};
    border-radius : ${RESTAURANT_IMAGE_SIZE / 2};
    margin-right : 15;
`

const RestaurantInfos = styled.View`
    width : ${constants.width - 55 - RESTAURANT_IMAGE_SIZE};
`

const RestaurantName = styled.Text`
    font-size : 15;
    font-weight : 600;
    width : ${constants.width - 55 - RESTAURANT_IMAGE_SIZE};
`

const BlurText = styled.Text`
    opacity : 0.6;
    font-size : 12.5;
`

const RestaurantRate = ({rate, reviewCounts}) => (
    <View style={{flexDirection : "row", alignItems : "center"}}>
        <FontAwesome name="star" size={11.5} color={styles.yellowColor}  />
        {/* <Ionicons name="md-star" size={16} color={styles.yellowColor} /> */}
        <Text style={{marginLeft : 5, fontSize : 12}}><Text style={{fontWeight : "600"}}>{rate}</Text> ({reviewCounts})</Text>
    </View>
)


const RestaurantBar = ({avatar, name, rate, reviewCounts, popular, leastPay, onPress}) => {
    console.log(reviewCounts, name, rate);
    return (
        <ListBar onPress={onPress}>
            <RestaurantImg source={{uri : avatar}} />
            <RestaurantInfos>
                <RestaurantName numberOfLines={1}>{name}</RestaurantName>
                <RestaurantRate rate={rate} reviewCounts={formatReviewCounts(reviewCounts)}/>
                <BlurText>최소주문금액 {leastPay}원</BlurText>
                <BlurText numberOfLines={1}>{popular.join(", ")}</BlurText>
            </RestaurantInfos>
        </ListBar>
    )
}

export default RestaurantBar;