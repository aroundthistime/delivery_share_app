import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components";
import ViewContainer from "../../components/ViewContainer";
import constants from "../../constants";
import { useCart } from "../../Contexts/CartContext";
import styles from "../../styles";

const RestaurantRow = styled.TouchableOpacity`
    justify-content : center;
    width : ${constants.width};
    height : 60;
    padding-left : 20;
    border-bottom-width : 0.5;
    border-color : ${styles.lightGrayColor};
    background-color : white;
`

const RestaurantName = styled.Text`
    font-size : 20;
    font-weight : 600;
`

const EmptyMessage = styled.Text`
    font-size : 16;
    color : #333131;
`

export default ({navigation}) => {
    const cart = useCart();
    console.log(cart);
    return <>
        {cart.menus.length > 0 ? (
            <View style={{flex : 1, backgroundColor : styles.bgColor}}>
                <RestaurantRow onPress={()=>navigation.navigate("Restaurant", {id : cart.restaurant.id})}>
                    <RestaurantName>{cart.restaurant.name}</RestaurantName>
                </RestaurantRow>
            </View>
        ) : (
            <ViewContainer>
                <EmptyMessage>장바구니가 텅 비어있습니다.</EmptyMessage>
            </ViewContainer>
        )}
    </>
}