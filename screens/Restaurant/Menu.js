import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import styled from "styled-components";
import { FontAwesome5 } from '@expo/vector-icons';
import FooterBtn from "../../components/FooterBtn";
import ViewContainer from "../../components/ViewContainer";
import constants from "../../constants";
import styles from "../../styles";
import { useEffect } from "react";
import Loader from "../../components/Loader";

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
    font-weight : 600;
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
    font-weight : 600;
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

const OptionBtnMultiple = ({isSelected}) => (
    isSelected ? (
        <OptionBtnMultipleContainer style={{backgroundColor : styles.themeColor}}>
            <FontAwesome5 name="check" size={14} color="white" />
        </OptionBtnMultipleContainer>
    ) : (
        <OptionBtnMultipleContainer style={{backgroundColor : "lightgray"}}>
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

const OptionBtnSingle = ({isSelected}) => (
    isSelected ? (
        <OptionBtnSingleContainer>
            <OptionBtnSingleDot style={{
                backgroundColor : styles.themeColor
            }}/>
        </OptionBtnSingleContainer>
    ) : (
        <OptionBtnSingleContainer>
            <OptionBtnSingleDot  style={{
            backgroundColor : "#c1bdbd"
        }}/>
        </OptionBtnSingleContainer>
    )
)

const OptionItem = ({isMultiple, isSelected, onPress, content, price=0}) => {
    if (isMultiple) {
        if (isSelected){
            return (
                <OptionItemContainer activeOpacity={1} onPress={onPress}>
                    <OptionBtnMultiple isSelected={true}/>
                    <OptionItemContent>{content}</OptionItemContent>
                    <OptionItemPrice>+ {price}원</OptionItemPrice>
                </OptionItemContainer>
            )
        } else {
            return (
                <OptionItemContainer activeOpacity={1} onPress={onPress}>
                    <OptionBtnMultiple isSelected={false}/>
                    <OptionItemContent>{content}</OptionItemContent>
                    <OptionItemPrice>+ {price}원</OptionItemPrice>
                </OptionItemContainer>
            )
        }
    } else {
        if (isSelected){
            return (
                <OptionItemContainer activeOpacity={1} onPress={onPress}>
                    <OptionBtnSingle isSelected={true}/>
                    <OptionItemContent>{content}</OptionItemContent>
                    <OptionItemPrice>+ {price}원</OptionItemPrice>
                </OptionItemContainer>
            )
        } else{
            return (
                <OptionItemContainer activeOpacity={1} onPress={onPress}>
                    <OptionBtnSingle isSelected={false}/>
                    <OptionItemContent>{content}</OptionItemContent>
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

const MenuCountController = styled.View`
    width : 110;
    height : 40;
    border-color : ${styles.lightGrayColor};
    border-width : 1;
    border-radius : 20;
    flex-direction : row;
`

const CountControlBtnContainer = styled.TouchableOpacity`
    justify-content : center;
    align-items : center;
    width : 40;
    height : 40;
`

const CountControlBtn = ({isMinus, onPress}) => (
    isMinus ? (
        <CountControlBtnContainer onPress={onPress} activeOpacity={0.9}>
            <Text style={{fontSize : 16}}>-</Text>
        </CountControlBtnContainer>
    ) : (
        <CountControlBtnContainer onPress={onPress} activeOpacity={0.9}>
            <Text style={{fontSize : 16}}>+</Text>
        </CountControlBtnContainer>
    )
)

const CurrentCount = styled.Text`
    width : 30;
    height : 40;
    text-align : center;
    text-align-vertical : center;
    font-size : 15;
`

const CurrentPrice = styled.Text`
    font-size : 14.5;
    opacity : 0.75;
`

export default ({navigation, route}) => {
    const {
        params : {menuId}
    } = route;
    const [menu, setMenu] = useState({});
    const [loading, setLoading] = useState(true);
    // const [orderMenu, setMenu] = useState({
    //     count : 0,
    //     price : 0,
    //     options : []
    // });
    // const menu = {
    //     ...구한거,
    //     options : menu.
    // }
    // const requiredOptions = menu.options.filter(option => option.isRequired);
    const menuData = {
        name : "로제떡볶이",
        id : 2,
        thumbnail : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSigAD5XWPpDiv4k6yVbCLnUEFSD829OgpWng&usqp=CAU",
        description : "색다른 기분을 위한 로제 떡볶이(1~2인)",
        price : 12000,
        isAvailable : true,
        isBestMenu : false,
        options : [
            {
                category : "맵기선택",
                isRequired : true,
                isMultiple : false,
                items : [
                    {
                        content : "0단계",
                        price : 0
                    },
                    {
                        content : "1단계",
                        price : 1
                    }
                ]
            },
            {
                category : "추가토핑",
                isRequired : false,
                isMultiple : true,
                items : [
                    {
                        content : "베이컨 추가",
                        price : 1000
                    },
                    {
                        content : "치즈 추가",
                        price : 1500
                    }
                ]
            }
        ]
    };
    useEffect(() => {
        setMenu({
            ...menuData,
            count : 1,
            options : menuData.options.map(option => {
                return ({
                    ...option,
                    selected : option.isRequired ? [option.items[0]] : [],
                })
            })
        });
        setLoading(false);
    }, [])
    navigation.setOptions({title : menu.name});
    const toggleOption = (currentOption, currentItem, isMultiple, isSelected) => {
        if (isMultiple){
            if (isSelected){
                setMenu({
                    ...menu,
                    price : menu.price - currentItem.price * menu.count,
                    options : menu.options.map(option => {
                        if (option.category === currentOption.category){
                            return {
                                ...option,
                                selected : option.selected.filter(item => item.content !== currentItem.content)
                            }
                        } else{
                            return option
                        }
                    }),
                })
            } else{
                setMenu({
                    ...menu,
                    price : menu.price + currentItem.price * menu.count,
                    options : menu.options.map(option => {
                        if (option.category === currentOption.category){
                            return {
                                ...option,
                                selected : option.selected.concat([currentItem])
                            }
                        } else{
                            return option
                        }
                    }),
                })
            }
        } else {
            if (isSelected){
                return
            } else{
                setMenu({
                    ...menu,
                    options : menu.options.map(option => {
                        if (option.category === currentOption.category){
                            return {
                                ...option,
                                selected : [currentItem]
                            }
                        } else{
                            return option
                        }
                    }),
                    price : menu.price + currentItem.price * menu.count - currentOption.selected[0].price * menu.count,
                })
            }
        }
    }
    const checkIsSelected = (option, item) => option.selected.some(selectedItem => selectedItem.content === item.content);
    const decreaseCount = () => {
        setMenu({
            ...menu,
            count : menu.count > 1 ? menu.count - 1 : menu.count,
            price : menu.count > 1
                ? menu.price * (menu.count - 1) / menu.count
                : menu.price
        })
    }
    const increaseCount = () => {
        setMenu({
            ...menu,
            count : menu.count + 1,
            price : menu.price * (menu.count + 1) / menu.count
        });
    }
    const extractSelectedMenu = () => {
        return {
            name : menu.name,
            id : menu.id,
            price : menu.price,
            count : menu.count,
            options : menu.options.filter(option => option.selected.length > 0).map(option => ({
                category : option.category,
                items : [...option.selected]
            }))
        }
    }
    const addCurrentMenuToCart = () => {
        const currentMenu = extractSelectedMenu();
        
    }
    return (
        loading ? (
            <Loader />
        ) : (
            <ViewContainer>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{flexGrow : 1, alignItems : "center"}}
                >
                    <MenuBrief>
                        <MenuImage source={{uri : menu.thumbnail}}/>
                        <MenuName>{menu.name}</MenuName>
                        <MenuDescription>{menu.description}</MenuDescription>
                    </MenuBrief>
                    <OptionsList>
                        {menu.options.map((option, index) => {
                            return (
                                <Option style={{borderBottomWidth : index === menu.options.length - 1 ? 0 : styles.grayBorderWidth}}>
                                    <OptionTitle>{option.category}</OptionTitle>
                                    <OptionItems>
                                        {option.items.map((item) => {
                                            const isSelected = checkIsSelected(option, item);
                                            return (
                                                <OptionItem
                                                    isMultiple={option.isMultiple}
                                                    isSelected={isSelected}
                                                    onPress={()=>toggleOption(option, item, option.isMultiple, isSelected)}
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
                <FooterBtn text={"장바구니에 담기"} onPress={()=>console.log(extractSelectedMenu())} header={(
                    <AddBtnHeader>
                        <MenuCountController>
                            <CountControlBtn isMinus={true} onPress={decreaseCount} />
                            <CurrentCount>{menu.count}</CurrentCount>
                            <CountControlBtn isMinus={false} onPress={increaseCount} />
                        </MenuCountController>
                        <CurrentPrice>{menu.price} 원</CurrentPrice>
                    </AddBtnHeader>
                )}/>
            </ViewContainer>
        )
    )
}