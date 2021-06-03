import React from "react";
import { FlatList } from "react-native";
import styled from "styled-components";
import constants from "../../constants";
import styles from "../../styles";

const NUM_COLUMNS = 4;

const View = styled.View`
    flex : 1;
    background-color : ${styles.bgColor};
    align-items : center;
`

const Banner = styled.Image`
    width : ${constants.width};
    height : ${constants.width / 2};
`

const CategoriesList = styled.View`
    width : ${constants.width - 30};
    padding-top : 20;
    padding-bottom : 20;
`

const CategoryTitle = styled.Text`
    font-size : 15;
`

const CategoryIcon = styled.Image`
    width : ${(constants.width - 30) / NUM_COLUMNS - 35};
    height : ${(constants.width - 30) / NUM_COLUMNS - 35};
    margin-bottom : 5;
`

const CategoryContainer = styled.TouchableOpacity`
    width : ${(constants.width - 30) / NUM_COLUMNS};
    justify-content : center;
    align-items : center;
    margin-bottom : 15;
`
const CategoryBtn = ({ name, uri, onPress }) => (
    <CategoryContainer onPress={onPress}>
        <CategoryIcon source={uri} />
        <CategoryTitle>{name}</CategoryTitle>
    </CategoryContainer>
)


export default ({ navigation }) => {
    const renderItem = ({ item: category }) => (
        <CategoryBtn
            name={category.name}
            uri={category.uri}
            onPress={() => navigation.navigate("Restaurants", { category: category.name })}
        />
    );
    return <View>
        <Banner source={require("../../assets/banner.png")} />
        <CategoriesList>
            <FlatList
                data={constants.categories}
                numColumns={NUM_COLUMNS}
                renderItem={renderItem}
            />
        </CategoriesList>
    </View>
}