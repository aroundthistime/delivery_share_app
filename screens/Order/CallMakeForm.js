import { useReactiveVar } from "@apollo/client";
import React from "react";
import { Alert, Text, View } from "react-native";
import styled from "styled-components";
import FooterBtn from "../../components/FooterBtn";
import NumInput from "../../components/NumInput";
import RequestInput from "../../components/RequestInput";
import constants from "../../constants";
import useInput from "../../Hooks/useInput";
import useNumInput from "../../Hooks/useNumInput";
import { isCallReceiverVar } from "../../reactiveVars";

const CALL_MIN_LIMIT = 5;

const CALL_MAX_LIMIT = 120;

const SectionContainer = styled.View`
    margin-top : 15;
    margin-bottom : 5;
`;

const SectionHeader = styled.Text`
    font-size : 18;
    font-weight : bold;
    margin-bottom : 15;
`

const RequestInputTitle = styled.Text`
    font-size : 14.5;
    margin-bottom : 10;
    opacity : 0.8;
`

export default ({ navigation, route }) => {
    const restaurantRequestInput = useInput("", 10);
    const opponentRequestInput = useInput("", 10);
    const timeLimitInput = useNumInput("", CALL_MAX_LIMIT);
    const isCallReceiver = useReactiveVar(isCallReceiverVar);
    const onSubmit = () => {
        if (isCallReceiver) {
            navigation.navigate("Confirm", {
                requestForStore: restaurantRequestInput.value,
            })
        } else {
            if (timeLimitInput.value === "" || parseInt(timeLimitInput.value) < CALL_MIN_LIMIT) {
                Alert.alert(`콜 시간제한을 제대로 설정해주세요. (최소5분 ~ 최대${CALL_MAX_LIMIT}분)`)
            } else {
                navigation.navigate("SelectLocation", {
                    timeLimit: parseInt(timeLimitInput.value),
                    requestToRestaurant: restaurantRequestInput.value,
                    requestToUser: opponentRequestInput.value
                })
            }
        }
    }
    return (
        <View style={{
            flex: 1,
            backgroundColor: "white",
            paddingHorizontal: 15
        }}>
            <SectionContainer>
                <SectionHeader>요청사항</SectionHeader>
                <View style={{ marginBottom: 10 }}>
                    <RequestInputTitle>가게 사장님께</RequestInputTitle>
                    <RequestInput
                        {...restaurantRequestInput}
                        placeholder={`예) 덜 맵게 해주세요. (최대 ${constants.requestMaxLength}자)`}
                        autoCorrect={false}
                        multiline
                    />
                </View>
                {!isCallReceiver && (
                    <View style={{ marginBottom: 10 }}>
                        <RequestInputTitle>매칭 상대에게</RequestInputTitle>
                        <RequestInput
                            {...opponentRequestInput}
                            placeholder={`예) 저는 반찬 필요 없어요. (최대 ${constants.requestMaxLength}자)`}
                            autoCorrect={false}
                            multiline
                        />
                    </View>
                )}
            </SectionContainer>
            {!isCallReceiver && (
                <SectionContainer style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <SectionHeader>{`콜 시간제한 (최대 ${CALL_MAX_LIMIT}분)`}</SectionHeader>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                        <NumInput
                            {...timeLimitInput}
                            size={"small"}
                            textAlign={"right"}
                            placeholder={"예)20"}
                        />
                        <Text style={{ marginLeft: 5, fontSize: 15 }}>분</Text>
                    </View>
                </SectionContainer>
            )}
            {isCallReceiver ? (
                <FooterBtn text="주문진행" onPress={onSubmit} needStyle />
            ) : (
                <FooterBtn text="수령장소 선택하기" onPress={onSubmit} needStyle />
            )}
        </View>
    )
}