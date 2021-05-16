import React from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import styled from "styled-components";
import { useState } from "react/cjs/react.development";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HISTORY = "history";

const SearchInput = styled.TextInput`
    padding-top : 13;
    padding-bottom : 13;
    padding-left : 10;
    padding-right : 50;
    background-color : white;
    font-size : 16;
`

const SearchInputClearBtn = styled.TouchableOpacity`
    position : absolute;
    top : 12;
    right : 10;
`

const SearchHistorySection = styled.View`
    padding-top : 25;
    padding-bottom : 15;
    padding-left : 20;
    padding-right : 20;
    background-color : white;
`

const SectionHeader = styled.View`
    flex-direction : row;
    justify-content: space-between;
    align-items : center;
    margin-bottom : 15;
`
const SectionTitle = styled.Text`
    font-size : 17.5;
    font-weight : 600;
`

const HistoryClearBtn = styled.TouchableOpacity`
    padding-top : 5;
    padding-bottom : 5;
    padding-left : 10;
    padding-right : 10;
    border-radius : 10;
    background-color : #e2e2e2;
`

const HistoryRow = styled.View`
    flex-direction : row;
    justify-content : space-between;
    align-items : center;
    padding-top : 5;
    padding-bottom : 5;
    padding-right : 5;
`

const HistoryWord = styled.TouchableOpacity`
`

const HistoryRemove = styled.TouchableOpacity`
`

const NoHistory = styled.Text`
    text-align : center;
    padding-top : 20;
    padding-bottom : 20;
`

export default () => {
    const [value, setValue] = useState("");
    const checkNoHistory = async () => {
        const history = await AsyncStorage.getItem(HISTORY);
        return history === undefined || history === "[]"
    }
    const getHistory = () => AsyncStorage.getItem(HISTORY).then(req => JSON.parse(req))
    const addHistory = async (word) => {
        const history = await getHistory()
        if (history.length >= 10) {
            history.shift();
        }
        history.push(word);
        await AsyncStorage.setItem(HISTORY, JSON.stringify(history));
    }
    const removeHistory = async (word) => {
        const history = await getHistory()
        await AsyncStorage.setItem(HISTORY, JSON.stringify(history.filter(key => key !== word)))
    }
    const clearHistory = async () => {
        await AsyncStorage.setItem(HISTORY, JSON.stringify([]));
        Alert.alert("최근 검색어가 모두 삭제되었습니다.")
    }
    return <View>
        <View style={{ marginBottom: 8 }}>
            <SearchInput
                value={value}
                onChangeText={text => setValue(text)}
                placeholder={"가게명이나 메뉴명으로 식당을 검색해보세요."}
            />
            {value !== "" && <SearchInputClearBtn onPress={() => setValue("")}>
                <Ionicons name="close" size={28} color="#424040" />
            </SearchInputClearBtn>}
        </View>
        <SearchHistorySection>
            <SectionHeader>
                <SectionTitle>최근 검색어</SectionTitle>
                <HistoryClearBtn activeOpacity={0.25} onPress={async () => {
                    if (await !checkNoHistory()) {
                        clearHistory();
                    }
                }}>
                    <Text>전체삭제</Text>
                </HistoryClearBtn>
            </SectionHeader>
            {checkNoHistory() ? (
                <NoHistory>최근 검색어가 없습니다.</NoHistory>
            ) : (
                <ScrollView>
                    {getHistory().slice(0).reverse().map(word => (
                        <HistoryRow>
                            <HistoryWord>
                                <Text style={{ fontSize: 15 }}>{word}</Text>
                            </HistoryWord>
                            <HistoryRemove onPress={() => removeHistory(word)}>
                                <Ionicons name="close" size={25} color="#d3cdcd" />
                            </HistoryRemove>
                        </HistoryRow>
                    ))}
                </ScrollView>
            )}
            {/* <ScrollView>
                <HistoryRow>
                    <HistoryWord>
                        <Text style={{ fontSize: 15 }}>김치볶음밥</Text>
                    </HistoryWord>
                    <HistoryRemove>
                        <Ionicons name="close" size={25} color="#d3cdcd" />
                    </HistoryRemove>
                </HistoryRow>
                <HistoryRow>
                    <HistoryWord>
                        <Text style={{ fontSize: 15 }}>김치찌개</Text>
                    </HistoryWord>
                    <HistoryRemove>
                        <Ionicons name="close" size={25} color="#d3cdcd" />
                    </HistoryRemove>
                </HistoryRow>
            </ScrollView> */}
        </SearchHistorySection>
    </View>
}