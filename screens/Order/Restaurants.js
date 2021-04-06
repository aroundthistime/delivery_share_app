import { StackActions } from "@react-navigation/routers";
import React from "react";
import styled from "styled-components";
import { FlatList, ScrollView, Text } from "react-native";
import constants from "../../constants";
import styles from "../../styles";
import RestaurantListBar from "../../components/RestaurantListBar";

const View = styled.View`
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

const CategoryTab = ({category, onPress, isSelected}) => {
    if (isSelected){
        return <CategoryTabContainer style={{backgroundColor : styles.themeColor}} onPress={onPress}>
            <Text style={{color : styles.bgColor}}>{category}</Text>
        </CategoryTabContainer>
    } else{
        return <CategoryTabContainer onPress={onPress}>
            <Text style={{color : styles.bgColor}}>{category}</Text>
        </CategoryTabContainer>
    }
}

export default ({navigation, route}) => {
    const {
        params : {category : currentCategory}
    } = route;
    navigation.setOptions({title : currentCategory});
    return <View>
        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        >
            <CategoryTabs>
                {constants.categories.map(categoryObj => {
                    const category = categoryObj.name
                    return <CategoryTab
                    category={category}
                    onPress={()=>
                        navigation.dispatch(StackActions.replace("Restaurants", {
                            category
                    }))}
                    isSelected={category === currentCategory}
                    />
                }
                )}
            </CategoryTabs>
        </ScrollView>
        <RestaurantListBar />
        <FlatList>
            <RestaurantListBar />
        </FlatList>
    </View>
}