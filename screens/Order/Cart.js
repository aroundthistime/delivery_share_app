import { useReactiveVar } from "@apollo/client";
import React from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import styled from "styled-components";
import BinaryBtnFooter from "../../components/BinaryBtnFooter";
import DeleteBtn from "../../components/DeleteBtn";
import MenuCountController from "../../components/MenuCountController";
import ViewContainer from "../../components/ViewContainer";
import constants from "../../constants";
import { useAlreadyInCart, useCart, useDecreaseMenuInCart, useDeleteMenuFromCart, useIncreaseMenuInCart } from "../../Contexts/CartContext";
import { currentCallVar, isCallReceiverVar } from "../../reactiveVars";
import styles from "../../styles";

const OPTION_ITEM_OPACITY = 0.55;

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
    font-weight : bold;
`

const CartMenu = styled.View`
    width : ${constants.width};
    padding-left : 20;
    padding-right : 20;
    padding-top : 15;
    padding-bottom : 15;
    background-color : white;
    border-bottom-width : ${styles.grayBorderWidth};
    border-color : ${styles.lightGrayColor};
`

const MenuHeader = styled.View`
    flex-direction : row;
    justify-content : space-between;
    margin-bottom : 8;
`

const MenuOptions = styled.View`
    margin-bottom : 15;
`

const MenuOption = styled.View`
    flex-direction : row;
    margin-bottom : 2;
`

const OptionCategory = styled.Text`
    font-size : 14;
    opacity : ${OPTION_ITEM_OPACITY};
`

const OptionItem = styled.Text`
    font-size : 14;
    opacity : ${OPTION_ITEM_OPACITY};
`

const MenuFooter = styled.View`
    flex-direction : row;
    justify-content : space-between;
    align-items : center;
    padding-left : 5;
`

const EmptyImage = styled.Image`
    width : 150;
    height : ${150 * 363 / 410};
    margin-bottom : 25;
`

const EmptyMessage = styled.Text`
    font-size : 17;
    color : #333131;
`

export default ({ navigation }) => {
    const cart = useCart();
    const deleteMenu = useDeleteMenuFromCart();
    const decreaseMenu = useDecreaseMenuInCart();
    const increaseMenu = useIncreaseMenuInCart();
    const isCallReceiver = useReactiveVar(isCallReceiverVar);
    const currentCall = useReactiveVar(currentCallVar);
    const checkCanMakeOrder = async () => {
        (currentCall.cart.menus, cart.menus)
        for (let i = 0; i < currentCall.cart.menus.length; i++) {
            const menuObj = currentCall.cart.menus[i];
            if (menuObj.isSeperated
                && (!await cart.menus.some(myMenuObj =>
                    menuObj.menu.id === myMenuObj.menu.id
                    && myMenuObj.isSeperated
                    && menuObj.options.length === myMenuObj.options.length
                    && (menuObj.count + myMenuObj.count) % 2 === 0
                    && JSON.stringify(menuObj.options) === JSON.stringify(myMenuObj.options)
                ))) {
                return false
            }
        }
        for (let i = 0; i < cart.menus.length; i++) {
            const myMenuObj = cart.menus[i];
            if (myMenuObj.isSeperated
                && (!await currentCall.cart.menus.some(menuObj =>
                    menuObj.menu.id === myMenuObj.menu.id
                    && menuObj.isSeperated
                    && menuObj.options.length === myMenuObj.options.length
                    && (menuObj.count + myMenuObj.count) % 2 === 0
                    && JSON.stringify(menuObj.options) === JSON.stringify(myMenuObj.options)
                ))) {
                return false
            }
        }
        return true
    }
    const getTotalPrice = () => (
        cart.menus.reduce(function (accumulator, currentValue) {
            return accumulator + currentValue.price
        }, cart.restaurant.deliveryTip / 2)
    )
    const onFinishCart = async () => {
        if (isCallReceiver) {
            const canMakeOrder = await checkCanMakeOrder();
            const totalPrice = getTotalPrice();
            if (canMakeOrder === true && cart.restaurant.minOrder <= totalPrice + currentCall.cart.totalCost) {
                navigation.navigate("CallMakeForm")
            } else {
                Alert.alert(
                    "나눠먹어요 옵션 선택시 해당 메뉴가 짝수만큼 주문되어야 합니다."
                )
            }
        } else {
            navigation.navigate("CallMakeForm")
        }
    }
    return <>
        {cart.menus.length > 0 ? (
            <View style={{ flex: 1, backgroundColor: styles.bgColor }}>
                <RestaurantRow onPress={() => navigation.navigate("Restaurant", { id: cart.restaurant.id })}>
                    <RestaurantName>{cart.restaurant.name}</RestaurantName>
                </RestaurantRow>
                <View style={{ paddingBottom: 140 }}>
                    <ScrollView>
                        {cart.menus.map(menu => (
                            <CartMenu>
                                <MenuHeader>
                                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>{menu.menu.name}</Text>
                                    <DeleteBtn onPress={() => deleteMenu(menu)} />
                                </MenuHeader>
                                <MenuOptions>
                                    {menu.isSeperated && (
                                        <MenuOption>
                                            <Text style={{ opacity: OPTION_ITEM_OPACITY, marginRight: 5 }}>-</Text>
                                            <OptionCategory>나눠먹어요</OptionCategory>
                                        </MenuOption>
                                    )}
                                    {menu.options.map(option => (
                                        <MenuOption>
                                            <Text style={{ opacity: OPTION_ITEM_OPACITY, marginRight: 5 }}>-</Text>
                                            <OptionCategory>{option.category} : </OptionCategory>
                                            <OptionItem>{option.items.join(", ")}</OptionItem>
                                        </MenuOption>
                                    ))}
                                </MenuOptions>
                                <MenuFooter>
                                    <Text style={{ fontWeight: "bold", fontSize: 15.5 }}>{menu.price}원</Text>
                                    <MenuCountController
                                        onDecrease={() => {
                                            if (menu.count > 1) {
                                                decreaseMenu(menu)
                                            }
                                        }}
                                        onIncrease={() => increaseMenu(menu)}
                                        count={menu.count}
                                    />
                                </MenuFooter>
                            </CartMenu>
                        ))}
                        <CartMenu>
                            <MenuHeader>
                                <Text style={{ fontSize: 16, fontWeight: "bold" }}>배달팁</Text>
                            </MenuHeader>
                            <MenuFooter>
                                <Text style={{ fontWeight: "bold", fontSize: 15.5 }}>{cart.restaurant.deliveryTip / 2}원</Text>
                            </MenuFooter>
                        </CartMenu>
                    </ScrollView>
                </View>
                <BinaryBtnFooter
                    leftText={"메뉴 추가"}
                    leftOnPress={() => navigation.navigate("Restaurant", { id: cart.restaurant.id })}
                    rightText={isCallReceiver ? `${getTotalPrice()}원 주문하기` : `${getTotalPrice()}원 콜 요청하기`}
                    rightOnPress={onFinishCart}
                />
            </View>
        ) : (
            <ViewContainer>
                <EmptyImage source={require("../../assets/EmptyCart.png")} />
                <EmptyMessage>장바구니가 텅 비어있습니다.</EmptyMessage>
            </ViewContainer>
        )
        }
    </>
}