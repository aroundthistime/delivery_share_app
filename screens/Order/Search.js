import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, ScrollView, Text, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import styled from "styled-components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../../styles";
import RestaurantListBar from "../../components/RestaurantListBar";
import constants from "../../constants";
import { SEARCH_RESTAURANT } from "../../queries/RestaurantQueries";
import { useLazyQuery, useReactiveVar } from "@apollo/client";
import { locationVar } from "../../reactiveVars";

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
    font-weight : bold;
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
    padding-top : 25;
    padding-bottom : 25;
`


const SearchResultBrief = styled.Text`
    padding-left : 20;
    padding-right : 20;
    padding-top : 17;
    padding-bottom : 17;
    background-color : white;
    font-size : 16.5;
`

const LoadingOverlay = styled.View`
    justify-content : center;
    align-items : center;
    background-color : rgba(0, 0, 0, 0.4);
    position : absolute;
    top : 60;
    width : ${constants.width};
    height : ${constants.height - 60};
`

const NoResult = styled.View`
    background-color : white;
    justify-content : center;
    align-items : center;
    height : ${constants.height - 135};
`

const NoResultImage = styled.Image`
    width : 150;
    height : ${150 * 327 / 377};
    margin-bottom : 25;
`

const NoResultText = styled.Text`
    font-size : 17;
    color : #333131;
    padding-left : 30;
    padding-right : 30;
    text-align : center;
`

export default ({ navigation }) => {
    const [value, setValue] = useState("");
    const [history, setHistory] = useState([]);
    const [currentKeyword, setCurrentKeyword] = useState("");
    const [searchResult, setSearchResult] = useState(false);
    const location = useReactiveVar(locationVar);
    const [searchRestaurantQuery, { called, loading, data }] = useLazyQuery(SEARCH_RESTAURANT, {
        variables: {
            si: location.si,
            dong: location.dong,
            keyword: currentKeyword
        }
    });
    useEffect(() => {
        const getHistory = async () => {
            setHistory(await AsyncStorage.getItem(HISTORY).then(req => {
                try {
                    return JSON.parse(req)
                } catch {
                    return []
                }
            }))
        }
        getHistory()
    }, []);
    useEffect(() => {
        if (data && data.searchRestaurant) {
            setSearchResult(data.searchRestaurant);
        }
    }, [data, currentKeyword])
    useEffect(
        () => navigation.addListener("beforeRemove", (event) => {
            if (currentKeyword === "") {
                return
            } else {
                event.preventDefault();
                setValue("");
                setCurrentKeyword("");
                setSearchResult(false);
            }

        }), [navigation, currentKeyword]
    )
    const confirmClearHistory = () => (
        Alert.alert(
            "최근 검색어를 모두 삭제하시겠습니까?",
            "",
            [
                {
                    text: "확인",
                    onPress: clearHistory
                },
                {
                    text: "취소",
                    onPress: () => 1
                },
            ],
        )
    )
    const addHistory = async (word) => {
        const filteredHistory = history.filter(keyword => keyword !== word);
        if (filteredHistory.length >= 10) {
            filteredHistory.pop();
        }
        filteredHistory.unshift(word);
        setHistory(filteredHistory);
        await AsyncStorage.setItem(HISTORY, JSON.stringify(filteredHistory));
    }
    const removeHistory = async (word) => {
        const filteredHistory = history.filter(keyword => keyword !== word);
        setHistory(filteredHistory);
        await AsyncStorage.setItem(HISTORY, JSON.stringify(filteredHistory))
    }
    const clearHistory = async () => {
        setHistory([])
        await AsyncStorage.setItem(HISTORY, JSON.stringify([]));
        Alert.alert("최근 검색어가 모두 삭제되었습니다.")
    }
    const search = (word) => {
        if (word === "") {
            Alert.alert("검색어를 입력해주세요")
        } else {
            setValue(word);
            setCurrentKeyword(word);
            addHistory(word);
            searchRestaurantQuery();
        }
    }
    const renderRestaurantBar = ({ item }) => (
        <RestaurantListBar {...item}
            onPress={() => navigation.navigate("Restaurant", { id: item.seq })}
        />
    );
    return <View>
        <View style={{ marginBottom: 8 }}>
            <SearchInput
                value={value}
                onChangeText={text => setValue(text)}
                placeholder={"가게명이나 메뉴명으로 식당을 검색해보세요."}
                onSubmitEditing={({ nativeEvent: { text } }) => search(text)}
            />
            {value !== "" && <SearchInputClearBtn onPress={() => { setValue(""); setSearchResult(false); setCurrentKeyword("") }}>
                <Ionicons name="close" size={28} color="#424040" />
            </SearchInputClearBtn>}
        </View>
        {called && loading && (
            <LoadingOverlay>
                <ActivityIndicator size={40} color={"#ECECEC"} />
            </LoadingOverlay>
        )}
        {currentKeyword ? (
            <>
                {searchResult && searchResult.length > 0 ? (
                    <ScrollView>
                        <SearchResultBrief>
                            {currentKeyword} <Text style={{ color: "rgba(0,0,0,0.33)" }}>검색결과</Text>  -  {searchResult.length}개</SearchResultBrief>
                        <FlatList
                            data={searchResult}
                            renderItem={renderRestaurantBar}
                            style={{
                                backgroundColor: styles.lightGrayColor,
                                paddingTop: styles.grayBorderWidth
                            }}
                        />
                    </ScrollView>
                ) : (
                    <NoResult>
                        <NoResultImage source={require("../../assets/NoRestaurant.png")} />
                        <NoResultText><Text style={{ color: "rgba(0, 0, 0, 0.3)" }}>"{currentKeyword}"</Text> 의 검색결과가 없습니다.</NoResultText>
                        <Text style={{ color: "rgba(49, 49, 49, 0.8)", textAlign: "center", paddingHorizontal: 30, marginTop: 10 }}>
                            검색결과는 현재 본인 위치 기준으로 배달가능한 식당들로만 제공됩니다.
                        </Text>
                    </NoResult>
                )}
            </>
        ) : (
            <SearchHistorySection>
                <SectionHeader>
                    <SectionTitle>최근 검색어</SectionTitle>
                    {history.length > 0 && (
                        <HistoryClearBtn activeOpacity={0.25} onPress={confirmClearHistory}>
                            <Text>전체삭제</Text>
                        </HistoryClearBtn>
                    )}
                </SectionHeader>
                {history.length === 0 ? (
                    <NoHistory>최근 검색어가 없습니다.</NoHistory>
                ) : (
                    <ScrollView>
                        {history.map(word => (
                            <HistoryRow>
                                <HistoryWord onPress={() => search(word)}>
                                    <Text style={{ fontSize: 15, width: constants.width - 90 }}>{word}</Text>
                                </HistoryWord>
                                <HistoryRemove onPress={() => removeHistory(word)}>
                                    <Ionicons name="close" size={25} color="#d3cdcd" />
                                </HistoryRemove>
                            </HistoryRow>
                        ))}
                    </ScrollView>
                )}
            </SearchHistorySection>
        )}
    </View>
}