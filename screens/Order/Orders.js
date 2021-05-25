import React from "react";
import { Text, Touchable, TouchableOpacity, View } from "react-native";
import styled from "styled-components";
import { FontAwesome } from '@expo/vector-icons';
import ScreenHeader from "../../components/ScreenHeader";
import constants from "../../constants";
import styles from "../../styles";
import { getTimeStamp } from "../../utils";

const OrderListBar = styled.View`
    background-color : white;
    margin-top : 7.5;
    margin-bottom : 12;
`

const OrderHeader = styled.View`
    padding-top : 12;
    padding-bottom : 12;
    padding-left : 20;
    padding-right : 20;
    flex-direction : row;
    justify-content : space-between;;
    align-items : center;
`

const OrderDate = styled.Text`
    opacity : 0.4;
`

const OrderStatus = styled.Text`
    font-weight : 600;
`

const OrderBody = styled.View`
    padding-top : 10;
    padding-bottom : 10;
    padding-left : 20;
    padding-right : 20;
    flex-direction : row;
`

const RestaurantImg = styled.Image`
    width : ${constants.restaurantImageSize};
    height : ${constants.restaurantImageSize};
    border-radius : ${constants.restaurantImageSize / 2};
    margin-right : 15;
`

const OrderInfos = styled.View`
`

const RestaurantName = styled.Text`
    font-size : 16;
    padding-right : 20;
    font-weight : 600;
    width : ${constants.width - 55 - constants.restaurantImageSize};
    overflow : hidden;
    margin-bottom : 5;
`

const OpponentContainer = styled.View`
    flex-direction : row;
    align-items : center;
`

const OpponentName = styled.Text`
    opacity : 0.6;
    margin-left : 5;
    font-size : 14.5;
    margin-bottom : 3;
`

const OrderContent = styled.Text`
    opacity : 0.6;
    font-size : 13.5;
`

const BlurText = styled.Text`
    opacity : 0.6;
    font-size : 12.5;
`

const OrderFooter = styled.View`
    flex-direction : row;
    justify-content : space-between;
    align-items : center;
    margin-top : 10;
    margin-bottom : 15;
    padding-top : 1;
    padding-bottom : 1;
    padding-left : 20;
    padding-right : 20;
`

const FooterBtnContainer = styled.Text`
    text-align : center;
    text-align-vertical : center;
    color : rgba(0, 0, 0, 0.75);
    width : ${(constants.width - 40) / 3 - 5};
    height : 40;
    border-radius : 5;
    border-color : ${styles.lightGrayColor};
    border-width : 1.3;
`

const FooterBtn = ({ isAvailable, text, onPress }) => (
    isAvailable ? (
        <TouchableOpacity onPress={onPress}>
            <FooterBtnContainer>{text}</FooterBtnContainer>
        </TouchableOpacity>
    ) : (
        <TouchableOpacity activeOpacity={1}>
            <FooterBtnContainer style={{ color: "rgba(0, 0, 0, 0.2)", borderColor: "#f2eded" }}>{text}</FooterBtnContainer>
        </TouchableOpacity>
    )
)

const orders = [
    {
        id: 1,
        restaurant: {
            id: 2,
            name: "엽기떡볶이 장위점"
        },
        createdAt: new Date(),
        deliveryTime: 60,
        status: "배달완료",
        user: [
            {
                id: 3,
                name: "콘요맘떼"
            },
            {
                id: 4,
                name: "Celebrity"
            }
        ],
        userReview: {

        },
        restaurantReview: {
            id: 1
        },
        menus: [
            {
                menu: {
                    name: "로제떡볶이"
                }
            },
            {
                menu: {
                    name: "김치볶음밥"
                }
            }
        ]
    }
]

export default ({ navigation }) => {
    return <>
        <ScreenHeader title={'주문내역'} />
        {orders && orders.length > 0 ? (
            <>
                <OrderListBar>
                    <OrderHeader>
                        <OrderDate>{getTimeStamp(new Date())}</OrderDate>
                        <OrderStatus>배달완료</OrderStatus>
                    </OrderHeader>
                    <OrderBody>
                        <TouchableOpacity onPress={() => navigation.navigate("Restaurant", { id: 1 })}>
                            <RestaurantImg source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxFnfMMuOyds6KPs2b51clDv-S3agSe84D4w&usqp=CAU" }} />
                        </TouchableOpacity>
                        <OrderInfos>
                            <TouchableOpacity>
                                <RestaurantName numberOfLines={1}>BH11g111111111111111111111111C</RestaurantName>
                            </TouchableOpacity>
                            {/* <TouchableOpacity onPress={() => navigation.navigate("UserReviews", {userId : dfd})}> */}
                            <TouchableOpacity>
                                <OpponentContainer>
                                    <FontAwesome name="user" size={15} color="rgba(0, 0, 0, 0.6)" />
                                    <OpponentName>콘요맘떼</OpponentName>
                                </OpponentContainer>
                            </TouchableOpacity>
                            <OrderContent>
                                {/* {} */}
                            김치볶음밥 외 1개
                        </OrderContent>
                        </OrderInfos>
                    </OrderBody>
                    <OrderFooter>
                        <TouchableOpacity>
                            <FooterBtnContainer>주문상세</FooterBtnContainer>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <FooterBtnContainer>식당리뷰쓰기</FooterBtnContainer>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <FooterBtnContainer>유저리뷰쓰기</FooterBtnContainer>
                        </TouchableOpacity>
                    </OrderFooter>
                </OrderListBar>
                <OrderListBar>
                    <OrderHeader>
                        <OrderDate>{getTimeStamp(new Date())}</OrderDate>
                        <OrderStatus>배달완료</OrderStatus>
                    </OrderHeader>
                    <OrderBody>
                        <TouchableOpacity onPress={() => navigation.navigate("Restaurant", { id: 1 })}>
                            <RestaurantImg source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxFnfMMuOyds6KPs2b51clDv-S3agSe84D4w&usqp=CAU" }} />
                        </TouchableOpacity>
                        <OrderInfos>
                            <TouchableOpacity>
                                <RestaurantName numberOfLines={1}>BH11g111111111111111111111111C</RestaurantName>
                            </TouchableOpacity>
                            {/* <TouchableOpacity onPress={() => navigation.navigate("UserReviews", {userId : dfd})}> */}
                            <TouchableOpacity>
                                <OpponentContainer>
                                    <FontAwesome name="user" size={15} color="rgba(0, 0, 0, 0.6)" />
                                    <OpponentName>콘요맘떼</OpponentName>
                                </OpponentContainer>
                            </TouchableOpacity>
                            <OrderContent>
                                {/* {} */}
                        김치볶음밥 외 1개
                    </OrderContent>
                        </OrderInfos>
                    </OrderBody>
                    <OrderFooter>
                        {/* <TouchableOpacity>
                            <FooterBtnContainer>주문상세</FooterBtnContainer>
                        </TouchableOpacity> */}
                        <FooterBtn isAvailable={false} text={"주문상세"} onPress={() => navigation.navigate("Order", { orderId: 1 })} />
                        <TouchableOpacity>
                            <FooterBtnContainer>식당리뷰쓰기</FooterBtnContainer>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <FooterBtnContainer>유저리뷰쓰기</FooterBtnContainer>
                        </TouchableOpacity>
                    </OrderFooter>
                </OrderListBar>
            </>
        ) :
            (
                <></>
            )
        }
    </>
}