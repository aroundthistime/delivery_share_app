import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components";
import FooterBtn from "../../components/FooterBtn";
import RequestInput from "../../components/RequestInput";
import constants from "../../constants";
import useInput from "../../Hooks/useInput";
import styles from "../../styles";

const RequestInputsHeader = styled.Text`
    font-size : 18;
    font-weight : 600;
    margin-top : 15;
    margin-bottom : 15;
`

const RequestInputTitle = styled.Text`
    font-size : 14.5;
    margin-bottom : 10;
    opacity : 0.8;
`

export default ({navigation, route}) => {
    const restaurantRequestInput = useInput("", 10);
    const opponentRequestInput = useInput("", 10);
    return (
        <View style={{
            flex : 1,
            backgroundColor : "white",
            paddingHorizontal : 15
        }}>
            <RequestInputsHeader>요청사항</RequestInputsHeader>
            <View style={{marginBottom : 10}}>
                <RequestInputTitle>가게 사장님께</RequestInputTitle>
                <RequestInput
                    {...restaurantRequestInput}
                    placeholder={`예) 덜 맵게 해주세요. (최대 ${constants.requestMaxLength}자)`}
                    autoCorrect={false}
                    multiline
                />
            </View>
            <View style={{marginBottom : 10}}>
                <RequestInputTitle>매칭 상대에게</RequestInputTitle>
                <RequestInput
                    {...opponentRequestInput}
                    placeholder={`예) 저는 반찬 필요 없어요. (최대 ${constants.requestMaxLength}자)`}
                    autoCorrect={false}
                    multiline
                />
            </View>
            <FooterBtn text="수령장소 선택하기" onPress={()=>navigation.navigate("SelectLocation")} needStyle/>
        </View>
    )
}