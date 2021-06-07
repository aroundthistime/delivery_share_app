import { StackActions } from "@react-navigation/routers";
import React, { useRef } from "react";
import styled from "styled-components";
import { FlatList, ScrollView, Text, View } from "react-native";
import constants from "../../constants";
import styles from "../../styles";
import RestaurantListBar from "../../components/RestaurantListBar";
import { useQuery, useReactiveVar } from "@apollo/client";
import { GET_RESTAURANTS } from "../../queries/RestaurantQueries";
import { locationVar } from "../../reactiveVars";
import Loader from "../../components/Loader";
import ViewContainer from "../../components/ViewContainer";

const Container = styled.View`
    flex : 1;
    background-color : ${styles.bgColor};
`

const CategoryTabs = styled.View`
    flex-direction : row;
    padding-left : 10;
    padding-right : 10;
    padding-top : 10;
    padding-bottom : 10;
`

const CategoryTabContainer = styled.TouchableOpacity`
    justify-content : center;
    align-items : center;
    background-color : #bfbbbb;
    padding-left : 15;
    padding-right : 15;
    height : 35;
    margin-right : 10;
    border-radius : 15;
`

const CategoryTab = ({ category, onPress, isSelected }) => {
    if (isSelected) {
        return <CategoryTabContainer style={{ backgroundColor: styles.themeColor }} onPress={onPress}>
            <Text style={{ color: styles.bgColor }}>{category}</Text>
        </CategoryTabContainer>
    } else {
        return <CategoryTabContainer onPress={onPress}>
            <Text style={{ color: styles.bgColor }}>{category}</Text>
        </CategoryTabContainer>
    }
}

const NoRestaurantImage = styled.Image`
    width : 150;
    height : ${150 * 327 / 377};
    margin-bottom : 25;
`

const NoRestaurantMessage = styled.Text`
    font-size : 17;
    color : #333131;
`


export default ({ navigation, route }) => {
    const {
        params: { category: currentCategory }
    } = route;
    const categoryScrollRef = useRef();
    const CATEGORY_COORDS = {
        "도시락": 742.6666870117188,
        "분식": 819.6666870117188,
        "야식": 582.6666870117188,
        "양식": 268.6666564941406,
        "일식": 441,
        "족발/보쌈": 647.3333129882812,
        "중식": 204,
        "찜/탕": 884.3333129882812,
        "치킨": 74.66666412353516,
        "카페/디저트": 333.3333435058594,
        "피자": 139.3333282470703,
        "한식": 10,
        "햄버거": 505.6666564941406,
    }
    const scrollToCurrentCategory = () => {
        categoryScrollRef.current?.scrollTo({
            x: CATEGORY_COORDS[currentCategory] - 10,
        })
    }
    navigation.setOptions({ title: currentCategory });
    const locObj = useReactiveVar(locationVar);
    const renderRestaurantBar = ({ item }) => (
        <RestaurantListBar {...item} id={item.seq}
            onPress={() => navigation.navigate("Restaurant", { id: item.seq })}
        />
    );
    const { loading, data, error } = useQuery(GET_RESTAURANTS, {
        variables: {
            // category: currentCategory,
            // si: locObj.si,
            // dong: locObj.dong
            category: currentCategory,
            si: "고양시",
            dong: "주엽동"
        }
    });
    return <Container>
        {!loading && data && data.getRestaurants ? (
            <>
                <View style={{ height: 55 }}>
                    <ScrollView
                        horizontal={true}
                        ref={categoryScrollRef}
                        showsHorizontalScrollIndicator={false}
                        onContentSizeChange={scrollToCurrentCategory}
                    >
                        <CategoryTabs>
                            {constants.categories.map(categoryObj => {
                                const category = categoryObj.name
                                return <CategoryTab
                                    category={category}
                                    onPress={() =>
                                        navigation.dispatch(StackActions.replace("Restaurants", {
                                            category
                                        }))}
                                    isSelected={category === currentCategory}
                                    key={category}
                                />
                            }
                            )}
                        </CategoryTabs>
                    </ScrollView>
                </View>
                {data.getRestaurants.length > 0 ? (
                    <FlatList
                        data={data.getRestaurants}
                        renderItem={renderRestaurantBar}
                        style={{
                            backgroundColor: styles.lightGrayColor,
                            paddingTop: styles.grayBorderWidth,
                        }}
                    />
                ) : (
                    <ViewContainer>
                        <NoRestaurantImage source={require("../../assets/NoRestaurant.png")} />
                        <NoRestaurantMessage>주변에 음식점이 없습니다.</NoRestaurantMessage>
                    </ViewContainer>
                )}
            </>
        ) : (
            <Loader />
        )}
    </Container>
}