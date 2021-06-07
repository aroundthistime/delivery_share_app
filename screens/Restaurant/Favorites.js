import React from "react";
import { FlatList } from "react-native";
import styled from "styled-components";
import ScreenHeader from "../../components/ScreenHeader";
import RestaurantListBar from "../../components/RestaurantListBar";
import styles from "../../styles";
import { useQuery } from "@apollo/client";
import { GET_LIKED_RESTAURANTS } from "../../queries/RestaurantQueries";
import Loader from "../../components/Loader";


const FavoritesCount = styled.Text`
    padding-left : 15;
    padding-top : 10;
    padding-bottom : 10;
    font-weight : bold;
    background-color : white;
`

const NoFavoritesImage = styled.Image`
    width : 150;
    height : 118;
    margin-bottom : 25;
`

const NoFavoritesMessage = styled.Text`
    font-size : 17;
    color : #333131;
`

const NoFavorites = styled.View`
    flex : 1;
    justify-content : center;
    align-items : center;
`

export default ({ navigation }) => {
    const { loading, data, error } = useQuery(GET_LIKED_RESTAURANTS, {
        fetchPolicy: "network-only",
        notifyOnNetworkStatusChange: true
    });
    const renderRestaurantBar = ({ item }) => (
        <RestaurantListBar {...item}
            onPress={() => navigation.navigate("Restaurant", { id: item.seq })}
        />
    );
    return <>
        <ScreenHeader title={'찜한 가게'} />
        {!loading && data && data.getLikedRestaurants ? (
            <>
                {data.getLikedRestaurants.length > 0 ? (
                    <>
                        <FavoritesCount>총 {data.getLikedRestaurants.length}개</FavoritesCount>
                        <FlatList
                            data={data.getLikedRestaurants}
                            renderItem={renderRestaurantBar}
                            style={{
                                backgroundColor: styles.lightGrayColor,
                                paddingTop: styles.grayBorderWidth,
                            }}
                        />
                    </>
                ) : (
                    <NoFavorites>
                        <NoFavoritesImage source={require("../../assets/NoFavorites.png")} />
                        <NoFavoritesMessage>찜한 가게가 없습니다.</NoFavoritesMessage>
                    </NoFavorites>
                )}
            </>
        ) : (
            <Loader />
        )}
    </>
}