import { StackActions } from "@react-navigation/routers";
import React from "react";
import styled from "styled-components";
import { Alert, FlatList, ScrollView, Text, View } from "react-native";
import constants from "../../constants";
import styles from "../../styles";
import RestaurantListBar from "../../components/RestaurantListBar";
import { useQuery, useReactiveVar } from "@apollo/client";
import { GET_RESTAURANTS } from "../../queries/RestaurantQueries";
import { locationVar } from "../../reactiveVars";

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

const FAKE_RESTAURANT = {
    name: "동대문 엽기떡볶이 장안점",
    thumbnail: "data:image/jpeg;base64,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",
    rate: 3.4,
    id: 13,
    reviewCounts: 130,
    popular: ["김치찌개", "볶음밥"],
    minOrder: 13000,
    isOpen: false
}

export default ({ navigation, route }) => {
    const {
        params: { category: currentCategory }
    } = route;
    navigation.setOptions({ title: currentCategory });
    const locObj = useReactiveVar(locationVar);
    const renderRestaurantBar = ({ item }) => (
        <RestaurantListBar {...item}
            onPress={() => navigation.navigate("Restaurant", { id: item.id })}
        />
    );
    // const { loading, data, error } = useQuery(GET_RESTAURANTS, {
    //     variables: {
    //         category: currentCategory,
    //         si: locObj.si,
    //         dong: locObj.dong
    //     }
    // });
    // if (data) {
    //     console.log(data);
    // }
    return <Container>
        <View style={{ height: 55 }}>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
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
                        />
                    }
                    )}
                </CategoryTabs>
            </ScrollView>
        </View>
        <FlatList
            data={[FAKE_RESTAURANT]}
            renderItem={renderRestaurantBar}
            style={{
                backgroundColor: styles.lightGrayColor,
                paddingTop: styles.grayBorderWidth,
            }}
        />
    </Container>
}