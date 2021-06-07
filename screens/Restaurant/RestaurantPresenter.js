import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components";
import { FontAwesome } from '@expo/vector-icons';
import ViewContainer from "../../components/ViewContainer";
import constants from "../../constants";
import styles from "../../styles";
import Heart from "../../components/Heart";
import RestaurantNavigation from "../../navigators/RestaurantNavigation";
import { ScrollView } from "react-native-gesture-handler";
import { RestaurantProvider } from "../../Contexts/RestaurantContext";
import FooterBtn from "../../components/FooterBtn";
import { useMutation } from "@apollo/client";
import { TOGGLE_LIKE_RESTAURANT } from "../../queries/RestaurantQueries";

const RESTAURANT_ICON_INFO_SIZE = 17.5;

const RestaurantThumbnail = styled.Image`
    width : ${constants.width / 2.3};
    height : ${constants.width / 2.3};
    border-radius : ${constants.width / 10};
    position : absolute;
    top : -${constants.width / 5};
`

const RestaurantBrief = styled.View`
    width : ${constants.width - 10};
    justify-content : center;
    align-items : center;
    border-width : 0.7;
    border-color : ${styles.lightGrayColor};
    border-radius : 10;
    margin-top : ${constants.width / 4.6 + 25};
    margin-bottom : 20;
    padding-top : ${constants.width / 5 + 20};
    background-color : white;
`

const RestaruantName = styled.Text`
    font-size : 23;
    font-weight : bold;
`

const RestaurantRate = ({ rate }) => (
    <Text style={{
        flexDirection: "row",
        alignItems: "center",
        marginRight: 20
    }}>
        <FontAwesome name="star" size={RESTAURANT_ICON_INFO_SIZE} color={styles.yellowColor} />
        <Text style={{ fontSize: RESTAURANT_ICON_INFO_SIZE }}> {rate.toFixed(1)}</Text>
    </Text>
)

const RestaurantLikes = ({ likeCount, isLiked, onPress }) => (
    <TouchableOpacity onPress={onPress} style={{
        flexDirection: "row",
        alignItems: "center",
    }}>
        <Heart isLiked={isLiked} onPress={onPress} size={RESTAURANT_ICON_INFO_SIZE + 3} />
        <Text style={{ fontSize: RESTAURANT_ICON_INFO_SIZE }}> {likeCount}</Text>
    </TouchableOpacity>
)

const RestaurantInfoColumn = styled.View`
    flex-direction : row;
    margin-bottom : 2;
    font-weight : bold;
`

const RestaurantInfoColumnTitle = styled.Text`
    width : 100;
`

export default ({ restaurant, navigation, route }) => {
    const [isLikedState, setIsLikedState] = useState(restaurant.isLiked);
    const [likeCountState, setLikeCountState] = useState(restaurant.likescount);
    const [toggleLikeRestaurant] = useMutation(TOGGLE_LIKE_RESTAURANT);
    const toggleLike = () => {
        if (isLikedState) {
            toggleLikeRestaurant({
                variables: {
                    resseq: restaurant.seq,
                    isLiked: false
                }
            })
            setIsLikedState(false);
            setLikeCountState(likeCountState - 1);
        } else {
            toggleLikeRestaurant({
                variables: {
                    resseq: restaurant.seq,
                    isLiked: true
                }
            })
            setIsLikedState(true);
            setLikeCountState(likeCountState + 1);
        }
    }
    navigation.setOptions({ title: restaurant.name });
    return (
        <RestaurantProvider restaurant={restaurant}>
            <ViewContainer>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
                >
                    <RestaurantBrief>
                        <RestaurantThumbnail source={{ uri: restaurant.thumbnail }} />
                        <RestaruantName>{restaurant.name}</RestaruantName>
                        <View style={{ flexDirection: "row", marginVertical: 5 }}>
                            <RestaurantRate rate={restaurant.rate} />
                            <RestaurantLikes isLiked={isLikedState} likeCount={likeCountState} onPress={toggleLike} />
                        </View>
                        <View style={{
                            width: constants.width - 100,
                            marginVertical: 10,
                        }}>
                            <RestaurantInfoColumn>
                                <RestaurantInfoColumnTitle>최소주문금액</RestaurantInfoColumnTitle>
                                <Text>{restaurant.min_order}</Text>
                            </RestaurantInfoColumn>
                            <RestaurantInfoColumn>
                                <RestaurantInfoColumnTitle>배달팁</RestaurantInfoColumnTitle>
                                <Text>{restaurant.delivery_tip}</Text>
                            </RestaurantInfoColumn>
                            <RestaurantInfoColumn>
                                <RestaurantInfoColumnTitle>분리포장가능</RestaurantInfoColumnTitle>
                                <Text>{restaurant.seperatable ? "O" : "X"}</Text>
                            </RestaurantInfoColumn>
                        </View>
                    </RestaurantBrief>
                    <View style={{
                        width: constants.width - 10,
                        marginBottom: 15
                    }}>
                        <RestaurantNavigation />
                    </View>
                </ScrollView>
                {!restaurant.isopen && (
                    <FooterBtn
                        text={"영업 준비중입니다"}
                        needStyle={true}
                        isAvailable={false}
                    />
                )}
            </ViewContainer>
        </RestaurantProvider>
    )
}