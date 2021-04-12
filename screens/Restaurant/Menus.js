import React from "react";
import { FlatList } from "react-native";
import MenuListBar from "../../components/MenuListBar";
import { useRestaurant } from "../../Contexts/RestaurantContext";


export default ({navigation}) => {
    const restaurant = useRestaurant();
    const menus = restaurant.menus;
    const renderMenuBar = ({item}) => (
        <MenuListBar {...item} onPress={()=>navigation.navigate("Menu", {menuId : item.id})} />
    )
    return <FlatList
        data={menus}
        renderItem={renderMenuBar}
        nestedScrollEnabled
    //     style={{
    //         backgroundColor : styles.lightGrayColor,
    //         paddingTop : styles.grayBorderWidth,
    // }}
    >
    </FlatList>
}