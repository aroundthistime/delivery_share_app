import React from "react";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons"
import styles from "../../styles";
import { Text } from "react-native";
import { isCallReceiverVar } from "../../reactiveVars";

const View = styled.View`
    flex : 1;
    justify-content : center;
    align-items : center;
`

const OptionsContainer = styled.View`
    flex-direction : row;
    height : 330;
    padding-left : 20;
    padding-right : 20;
`

const Option = styled.TouchableOpacity`
    justify-content : center;
    align-items : center;
    flex : 1;
`


const Border = styled.View`
    width : 1.5;
    height : 100%;
    background-color : ${styles.lightGrayColor};
`

const OptionTitle = styled.Text`
    font-size : 20;
    margin-top : 20;
`

export default ({ navigation }) => {
    return <View>
        <Text style={{ fontSize: 23, marginBottom: 25, color: styles.blackColor }}>주문방식 선택</Text>
        <OptionsContainer>
            <Option onPress={() => {
                isCallReceiverVar(false);
                navigation.navigate("Categories");
            }}>
                <Ionicons name="call" size={80} color={styles.blackColor} />
                <OptionTitle>콜 요청하기</OptionTitle>
            </Option>
            <Border />
            <Option onPress={() => {
                isCallReceiverVar(true);
                navigation.navigate("Calls");
            }}>
                <Ionicons name="location-sharp" size={80} color={styles.blackColor} />
                <OptionTitle>주변 콜 찾기</OptionTitle>
            </Option>
        </OptionsContainer>
    </View>
}