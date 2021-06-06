import { useMutation, useReactiveVar } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Alert, Image, TouchableOpacity, View } from "react-native";
import styled from "styled-components";
import constants from "../../constants";
import { CANCEL_CALL } from "../../queries/CallQueries";
import { myCallVar } from "../../reactiveVars";

const Header = styled.View`
    align-items : center;
`

const CallActiveText = styled.Text`
    font-size : 27;
    font-weight : bold;
    margin-bottom : 15;
`

const RestaurantName = styled.Text`
    font-size : 14;
    opacity : 0.5;
`

const CallRemainingTime = styled.Text`
    font-size : 40;
    color : red;
    margin-top : 5;
`

const CancelBtnContainer = styled.View`
    background-color : rgba(0, 0, 0, 0.25);
    padding-left : 15;
    padding-right : 15;
    padding-top : 7;
    padding-bottom : 7;
    border-radius : 15;
`

const CancelBtnText = styled.Text`
    color : white;
    font-size : 15;
`

export default ({ navigation, route }) => {
    const myCall = useReactiveVar(myCallVar);
    const [remainingTimeString, setRemainingTimeString] = useState("00:00:00");
    const [cancelMutation] = useMutation(CANCEL_CALL);
    useEffect(() => {
        const countdown = setInterval(() => {
            getRemainingTime();
        })
        return () => clearInterval(countdown);
    }, [])
    const getRemainingTime = () => {
        const current = new Date();
        const callStart = new Date(myCall.created_at);
        const remainingTime = callStart.getTime() + 60000 * myCall.time_limit - current.getTime();
        let remainingHour = parseInt(remainingTime / (1000 * 60 * 60));
        if (remainingHour < 10) {
            remainingHour = `0${remainingHour}`
        }
        let remainingMinute = parseInt(remainingTime / (1000 * 60));
        if (remainingMinute >= 60) {
            remainingMinute = remainingMinute % 60
        }
        if (remainingMinute < 10) {
            remainingMinute = `0${remainingMinute}`
        }
        let remainingSecond = parseInt(remainingTime / 1000);
        if (remainingSecond >= 60) {
            remainingSecond = remainingSecond % 60;
        }
        if (remainingSecond < 10) {
            remainingSecond = `0${remainingSecond}`
        }
        if (remainingTime === 0) {
            cancelMutation({
                variables: {
                    seq: myCall.seq
                }
            });
            myCallVar(undefined);
            Alert.alert("콜이 취소되었습니다")
            navigation.navigate("Home")
        }
        setRemainingTimeString(`${remainingHour}:${remainingMinute}:${remainingSecond}`)
    }
    return (
        <View style={{ flex: 1, justifyContent: "space-between", alignItems: "center", backgroundColor: "white", paddingVertical: constants.height * 0.11 }}>
            <Header>
                <CallActiveText>콜이 신청되었습니다</CallActiveText>
                <RestaurantName>{myCall.restaurant.name}</RestaurantName>
                <CallRemainingTime>{remainingTimeString}</CallRemainingTime>
            </Header>
            <Image source={require("../../assets/deliver.png")} style={{ width: 250, height: 250 * 250 / 341 }} />
            <TouchableOpacity onPress={() => {
                cancelMutation({
                    variables: {
                        seq: myCall.seq
                    }
                });
                myCallVar(undefined);
                Alert.alert("콜이 취소되었습니다")
                navigation.navigate("Home")
            }}>
                <CancelBtnContainer>
                    <CancelBtnText>콜 취소하기</CancelBtnText>
                </CancelBtnContainer>
            </TouchableOpacity>
        </View>

    )
}