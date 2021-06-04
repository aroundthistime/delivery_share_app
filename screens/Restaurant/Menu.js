import React, { useState } from "react";
import { Alert, ScrollView } from "react-native";
import styled from "styled-components";
import { FontAwesome5 } from '@expo/vector-icons';
import FooterBtn from "../../components/FooterBtn";
import ViewContainer from "../../components/ViewContainer";
import constants from "../../constants";
import styles from "../../styles";
import { useEffect } from "react";
import Loader from "../../components/Loader";
import { useAddMenuToCart, useClearCart } from "../../Contexts/CartContext";
import { showToast } from "../../utils";
import MenuCountController from "../../components/MenuCountController";
import { useQuery, useReactiveVar } from "@apollo/client";
import { isCallReceiverVar } from "../../reactiveVars";
import { GET_MENU } from "../../queries/RestaurantQueries";

const OPTION_BTN_SIZE = 25;

const OPTION_ITEM_GAP = 10;

const MenuImage = styled.Image`
    width : ${constants.width / 2};
    height : ${constants.width / 2};
    border-radius : ${constants.width / 10};
    position : absolute;
    top : -${constants.width / 3};
`

const MenuBrief = styled.View`
    width : ${constants.width - 20};
    justify-content : center;
    align-items : center;
    border-width : 0.7;
    border-color : ${styles.lightGrayColor};
    border-radius : 10;
    margin-top : ${constants.width / 3 + 25};
    margin-bottom : 20;
    padding-top : ${constants.width / 6 + 10};
    padding-bottom : 20;
    background-color : white;
`

const MenuName = styled.Text`
    font-size : 23;
    font-weight : bold;
    margin-bottom : 5;
`

const MenuDescription = styled.Text`
    font-size : 15;
    opacity : 0.8;
`

const OptionsList = styled.View`
    width : ${constants.width - 20};
    background-color : white;
    border-width : 0.7;
    border-color : ${styles.lightGrayColor};
    border-radius : 10;
    padding-top : 10;
    padding-bottom : 10;
    padding-left : 20;
    padding-right : 20;
    margin-bottom : 20;
`

const Option = styled.View`
    padding-top : 15;
    padding-bottom : 12;
    border-color : ${styles.lightGrayColor};
`

const OptionTitle = styled.Text`
    font-size : 18;
    font-weight : bold;
    margin-bottom : 5;
`

const OptionItems = styled.View`
`

const OptionItemContainer = styled.TouchableOpacity`
    padding-left : 5;
    flex-direction : row;
    justify-content : space-between;
    align-items : center;
    padding-top : ${OPTION_ITEM_GAP};
    padding-bottom : ${OPTION_ITEM_GAP};
`

const OptionItemContent = styled.Text`
    flex : 1;
    text-align-vertical : center;
    margin-left : 8;
`

const OptionItemPrice = styled.Text`
    width : 70;
    text-align-vertical : center;
    margin-left : 20;
    font-size : 15;
    text-align : right;
`

const OptionBtnMultipleContainer = styled.View`
    width : ${OPTION_BTN_SIZE};
    height : ${OPTION_BTN_SIZE};
    border-radius : 5;
    justify-content : center;
    align-items : center;
    margin-right : 5;
`

const OptionBtnMultiple = ({ isSelected }) => (
    isSelected ? (
        <OptionBtnMultipleContainer style={{ backgroundColor: styles.themeColor }}>
            <FontAwesome5 name="check" size={14} color="white" />
        </OptionBtnMultipleContainer>
    ) : (
        <OptionBtnMultipleContainer style={{ backgroundColor: "lightgray" }}>
            <FontAwesome5 name="check" size={14} color="white" />
        </OptionBtnMultipleContainer>
    )
)

const OptionBtnSingleContainer = styled.View`
    width : ${OPTION_BTN_SIZE};
    height : ${OPTION_BTN_SIZE};
    border-radius : ${OPTION_BTN_SIZE / 2};
    border-width : 0.4;
    border-color : ${styles.lightGrayColor};
    justify-content : center;
    align-items : center;
    margin-right : 5;
`

const OptionBtnSingleDot = styled.View`
    width : ${OPTION_BTN_SIZE / 2};
    height : ${OPTION_BTN_SIZE / 2};
    borderRadius : ${OPTION_BTN_SIZE / 4};
`

const OptionBtnSingle = ({ isSelected }) => (
    isSelected ? (
        <OptionBtnSingleContainer>
            <OptionBtnSingleDot style={{
                backgroundColor: styles.themeColor
            }} />
        </OptionBtnSingleContainer>
    ) : (
        <OptionBtnSingleContainer>
            <OptionBtnSingleDot style={{
                backgroundColor: "#c1bdbd"
            }} />
        </OptionBtnSingleContainer>
    )
)

const OptionItem = ({ isMultiple, isSelected, onPress, content, price = 0, isOpen }) => {
    if (isMultiple) {
        if (isSelected) {
            return (
                <OptionItemContainer activeOpacity={1} onPress={onPress}>
                    {isOpen && <OptionBtnMultiple isSelected={true} />}
                    <OptionItemContent style={{ marginLeft: isOpen ? 0 : -3 }}>{content}</OptionItemContent>
                    {typeof price === "number" ? (
                        <OptionItemPrice>+ {price}원</OptionItemPrice>
                    ) : (
                        <OptionItemPrice>{price}</OptionItemPrice>
                    )}
                </OptionItemContainer>
            )
        } else {
            return (
                <OptionItemContainer activeOpacity={1} onPress={onPress}>
                    {isOpen && <OptionBtnMultiple isSelected={false} />}
                    <OptionItemContent style={{ marginLeft: isOpen ? 0 : -3 }}>{content}</OptionItemContent>
                    {typeof price === "number" ? (
                        <OptionItemPrice>+ {price}원</OptionItemPrice>
                    ) : (
                        <OptionItemPrice>{price}</OptionItemPrice>
                    )}
                </OptionItemContainer>
            )
        }
    } else {
        if (isSelected) {
            return (
                <OptionItemContainer activeOpacity={1} onPress={onPress}>
                    {isOpen && <OptionBtnSingle isSelected={true} />}
                    <OptionItemContent style={{ marginLeft: isOpen ? 0 : -3 }}>{content}</OptionItemContent>
                    <OptionItemPrice>+ {price}원</OptionItemPrice>
                </OptionItemContainer>
            )
        } else {
            return (
                <OptionItemContainer activeOpacity={1} onPress={onPress}>
                    {isOpen && <OptionBtnSingle isSelected={false} />}
                    <OptionItemContent style={{ marginLeft: isOpen ? 0 : -3 }}>{content}</OptionItemContent>
                    <OptionItemPrice>+ {price}원</OptionItemPrice>
                </OptionItemContainer>
            )
        }
    }
}

const AddBtnHeader = styled.View`
    width : ${constants.width - 40};
    height : 40;
    margin-bottom : 10;
    flex-direction : row;
    justify-content : space-between;
    align-items : center;
`

const CurrentPrice = styled.Text`
    font-size : 14.5;
    opacity : 0.75;
`

export default ({ navigation, route }) => {
    const {
        params: { menuId, restaurant }
    } = route;
    const [menu, setMenu] = useState({});
    const [loading, setLoading] = useState(true);
    const addMenuToCart = useAddMenuToCart();
    const clearCart = useClearCart();
    const isCallReceiver = useReactiveVar(isCallReceiverVar);
    const { loading: queryLoading, data, error } = useQuery(GET_MENU, {
        variables: {
            seq: menuId
        }
    });
    useEffect(() => {
        if (!loading && data && data.Menu) {
            navigation.setOptions({ title: data.Menu.name });
            setMenu({
                ...menuData,
                count: 1,
                isSeperated: false,
                options: menuData.options.map(option => {
                    return ({
                        ...option,
                        selected: option.isRequired ? [option.items[0]] : [],
                    })
                })
            });
        }
        setLoading(false);
    }, [data])
    const toggleOption = (currentOption, currentItem, isMultiple, isSelected) => {
        if (isMultiple) {
            if (isSelected) {
                setMenu({
                    ...menu,
                    price: menu.price - (menu.isSeperated ? currentItem.price / 2 : currentItem.price) * menu.count,
                    options: menu.options.map(option => {
                        if (option.category === currentOption.category) {
                            return {
                                ...option,
                                selected: option.selected.filter(item => item.content !== currentItem.content)
                            }
                        } else {
                            return option
                        }
                    }),
                })
            } else {
                setMenu({
                    ...menu,
                    price: menu.price + (menu.isSeperated ? currentItem.price / 2 : currentItem.price) * menu.count,
                    options: menu.options.map(option => {
                        if (option.category === currentOption.category) {
                            return {
                                ...option,
                                selected: option.selected.concat([currentItem])
                            }
                        } else {
                            return option
                        }
                    }),
                })
            }
        } else {
            if (isSelected) {
                return
            } else {
                setMenu({
                    ...menu,
                    options: menu.options.map(option => {
                        if (option.category === currentOption.category) {
                            return {
                                ...option,
                                selected: [currentItem]
                            }
                        } else {
                            return option
                        }
                    }),
                    price: menu.price + (menu.isSeperated ? currentItem.price / 2 : currentItem.price) * menu.count - (menu.isSeperated ? currentOption.selected[0].price / 2 : currentOption.selected[0].price) * menu.count,
                })
            }
        }
    }
    const checkIsSelected = (option, item) => option.selected.some(selectedItem => selectedItem.content === item.content);
    const decreaseCount = () => {
        setMenu({
            ...menu,
            count: menu.count > 1 ? menu.count - 1 : menu.count,
            price: menu.count > 1
                ? menu.price * (menu.count - 1) / menu.count
                : menu.price
        })
    }
    const increaseCount = () => {
        setMenu({
            ...menu,
            count: menu.count + 1,
            price: menu.price * (menu.count + 1) / menu.count
        });
    }
    const extractSelectedMenu = () => {
        return {
            menu: {
                id: menu.id,
                name: menu.name
            },
            price: menu.price,
            count: menu.count,
            isSeperated: menu.isSeperated,
            options: menu.options.filter(option => option.selected.length > 0).map(option => ({
                category: option.category,
                items: [...option.selected].map(item => item.content)
            }))
        }
    }
    const addSelectedMenuToCart = async () => {
        const selectedMenu = extractSelectedMenu();
        const result = addMenuToCart(selectedMenu, restaurant);
        if (result === 1) {
            showToast("해당 메뉴가 장바구니에 추가되었습니다", false)
            navigation.pop()
        } else if (result === 0) {
            showToast("장바구니에 있는 동일 메뉴의 수량을 증가했습니다", false)
            navigation.pop()
        } else {
            if (isCallReceiver) {
                Alert.alert("장바구니에 담겨있던 다른 식당의 메뉴가 삭제되었습니다.")
                await clearCart();
                addMenuToCart(selectedMenu, restaurant);
                showToast("해당 메뉴가 장바구니에 추가되었습니다", false)
                navigation.pop()
            } else {
                Alert.alert(
                    "장바구니에는 동일한 가게의 메뉴만을 담을 수 있습니다.",
                    "기존에 담겨있던 메뉴를 삭제하시고 선택하신 메뉴를 추가하시겠습니까?",
                    [
                        {
                            text: "취소",
                            onPress: () => 1,
                            style: "cancel"
                        },
                        {
                            text: "예",
                            onPress: async () => {
                                await clearCart();
                                addMenuToCart(selectedMenu, restaurant);
                                showToast("해당 메뉴가 장바구니에 추가되었습니다", false)
                                navigation.pop()
                            }
                        }
                    ]
                )
            }
        }
    }
    return (
        loading ? (
            <Loader />
        ) : (
            <ViewContainer>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
                >
                    <MenuBrief>
                        <MenuImage source={{ uri: menu.thumbnail }} />
                        <MenuName>{menu.name}</MenuName>
                        <MenuDescription>{menu.description}</MenuDescription>
                    </MenuBrief>
                    <OptionsList>
                        {menu.isSeperatable && (
                            <Option style={{ borderBottomWidth: menu.options.length > 0 ? styles.grayBorderWidth : 0 }}>
                                <OptionTitle>나눠먹기</OptionTitle>
                                <OptionItems>
                                    <OptionItem
                                        isMultiple={true}
                                        isSelected={menu.isSeperated}
                                        onPress={() => setMenu({
                                            ...menu,
                                            price: menu.isSeperated ? menu.price * 2 : menu.price / 2,
                                            isSeperated: !menu.isSeperated,
                                        })}
                                        content={"나눠먹어요"}
                                        price={"n / 2원"}
                                        isOpen={restaurant.isOpen}
                                    />
                                </OptionItems>
                            </Option>
                        )}
                        {menu.options.map((option, index) => {
                            return (
                                <Option style={{ borderBottomWidth: index === menu.options.length - 1 ? 0 : styles.grayBorderWidth }}>
                                    <OptionTitle>{option.category}</OptionTitle>
                                    <OptionItems>
                                        {option.items.map((item) => {
                                            const isSelected = checkIsSelected(option, item);
                                            return (
                                                <OptionItem
                                                    isMultiple={option.isMultiple}
                                                    isSelected={isSelected}
                                                    onPress={() => toggleOption(option, item, option.isMultiple, isSelected)}
                                                    isOpen={restaurant.isOpen}
                                                    {...item}
                                                />
                                            )
                                        })}
                                    </OptionItems>
                                </Option>
                            )
                        })}
                    </OptionsList>
                </ScrollView>
                {restaurant.isOpen && (
                    <FooterBtn text={"장바구니에 담기"} onPress={addSelectedMenuToCart} header={(
                        <AddBtnHeader>
                            <MenuCountController
                                onDecrease={decreaseCount}
                                onIncrease={increaseCount}
                                count={menu.count}
                            />
                            <CurrentPrice>{menu.price} 원</CurrentPrice>
                        </AddBtnHeader>
                    )} />
                )}
            </ViewContainer>
        )
    )
}