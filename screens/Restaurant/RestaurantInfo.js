import React from "react";
import { Text, View } from "react-native";
import { useRestaurant } from "../../Contexts/RestaurantContext";
import styled from "styled-components";
import constants from "../../constants";
import { formatAmPm } from "../../utils";

const Section = styled.View`
    padding-left : 15;
    padding-right : 15;
    padding-top : 20;
    padding-bottom : 20;
    margin-bottom : 10;
    background-color : white;
`

const SectionTitle = styled.Text`
    font-weight : bold;
    font-size : 17;
    margin-bottom : 10;
`

const InfoRow = styled.View`
    margin-bottom : 10;
    flex-direction : row;
`

const InfoTitle = styled.Text`
    width : 75;
    margin-right : 10;
    font-size : 14.5;
`

const InfoContent = styled.Text`
    width : ${constants.width - 115};
    font-size : 14.5;
`

export default () => {
    const restaurant = useRestaurant();
    const convertDaysList = (days) => {
        const WEEKDAYS = ["월", "화", "수", "목", "금"];
        const WEEKENDS = ["토", "일"];
        const EVERYDAY = WEEKENDS.concat(WEEKDAYS);
        if (EVERYDAY.every(day => days.indexOf(day) > -1)) {
            return ["매일"]
        } else if (WEEKDAYS.every(day => days.indexOf(day) > -1)) {
            return [
                "주중",
                ...days.filter(day => WEEKDAYS.indexOf(day) < 0)
            ]
        } else if (WEEKENDS.every(day => days.indexOf(day) > -1)) {
            return [
                ...days.filter(day => WEEKENDS.indexOf(day) < 0),
                "주말"
            ]
        } else {
            return days
        }
    }
    const getFormattedRunTimeList = () => {
        const runTime = restaurant.runtime;
        let result = [];
        for (let i = 0; i < runTime.length; i++) {
            let inserted = false;
            for (let j = 0; j < result.length; j++) {
                if (runTime[i].open === result[j].open && runTime[i].close === result[j].close) {
                    inserted = true;
                    result[j] = {
                        days: [...result[j].days, runTime[i].day],
                        open: result[j].open,
                        close: result[j].close
                    }
                    break
                }
            }
            if (!inserted) {
                result.push({
                    days: [runTime[i].day],
                    open: runTime[i].open,
                    close: runTime[i].close
                })
            }
        }
        return result.map(runTimeObj => (
            {
                days: convertDaysList(runTimeObj.days),
                open: runTimeObj.open,
                close: runTimeObj.close
            }
        ))
    }
    const runTimeList = getFormattedRunTimeList();
    const dayOffList = JSON.parse(restaurant.dayoff);
    return <View style={{ paddingBottom: restaurant.isopen ? 0 : 45 }}>
        <Section>
            <SectionTitle>가게 소개글</SectionTitle>
            <Text>{restaurant.introduction}</Text>
        </Section>
        <Section>
            <SectionTitle>식당 정보</SectionTitle>
            <InfoRow>
                <InfoTitle>운영시간</InfoTitle>
                <View style={{ width: constants.width - 115, fontSize: 14.5 }}>
                    {runTimeList.map(runTimeObj => (
                        <Text>{runTimeObj.days.join(", ")}  -  {formatAmPm(runTimeObj.open)} ~ {formatAmPm(runTimeObj.close)}</Text>
                    ))}
                </View>
            </InfoRow>
            <InfoRow>
                <InfoTitle>휴무일</InfoTitle>
                <InfoContent>{dayOffList.length === 0 ? "연중무휴" : convertDaysList(dayOffList).map(day => {
                    if (day === "주중" || day === "주말" || day === "매일") {
                        return day
                    } else {
                        return `${day}요일`
                    }
                }).join(", ")}</InfoContent>
            </InfoRow>
            <InfoRow>
                <InfoTitle>배달팁</InfoTitle>
                <InfoContent>{restaurant.delivery_tip}원</InfoContent>
            </InfoRow>
            <InfoRow>
                <InfoTitle>배달지역</InfoTitle>
                <InfoContent>{restaurant.deliveryloc.map(loc => loc.dong).join(", ")}</InfoContent>
            </InfoRow>
        </Section>
    </View>
}