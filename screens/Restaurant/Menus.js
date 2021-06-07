import React from "react";
import { FlatList, View } from "react-native";
import MenuListBar from "../../components/MenuListBar";
import { useRestaurant } from "../../Contexts/RestaurantContext";


export default ({ navigation }) => {
  const restaurant = useRestaurant();
  const menus = restaurant.menus;
  const renderMenuBar = ({ item }) => {
    console.log(item.seq); return (
      <MenuListBar {...item} onPress={() => navigation.navigate("Menu",
        {
          menuId: item.seq,
          restaurant: {
            id: restaurant.seq,
            name: restaurant.name,
            minOrder: restaurant.min_order,
            deliveryTip: restaurant.delivery_tip,
            isOpen: restaurant.isopen
          }
        })} />
    )
  }
  return (
    <>
      <FlatList
        data={menus}
        renderItem={renderMenuBar}
        nestedScrollEnabled
      />
      {!restaurant.isopen && (
        <View style={{ marginBottom: 70 }} />
      )}
    </>
  )

}
