import React from "react";
import { Text } from "react-native";
import styled from "styled-components";
import constants from "../constants";

const ListBar = styled.View`
    flex-direction : row;
    align-items : center;
    width : ${constants.width};
    height : 50;
    background-color : lightcoral;
    justify-content : center;
`

const RestaurantBar = ({avatar, name, rate, popular, leastPay, onPress}) => (
    <ListBar>
        <Text style={{backgroudColor : "coral"}}>11111</Text>
        <Text style={{backgroudColor : "coral"}}>22222</Text>
    </ListBar>
)

export default RestaurantBar;