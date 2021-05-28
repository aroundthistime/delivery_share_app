import React from "react";
import { FlatList, View } from "react-native";
import MenuListBar from "../../components/MenuListBar";
import { useRestaurant } from "../../Contexts/RestaurantContext";


export default ({ navigation }) => {
  const restaurant = useRestaurant();
  const menus = restaurant.menus;
  const renderMenuBar = ({ item }) => (
    <MenuListBar {...item} onPress={() => navigation.navigate("Menu",
      {
        menuId: item.id,
        restaurant: {
          id: restaurant.id,
          name: restaurant.name,
          minOrder: restaurant.minOrder,
          deliveryTip: restaurant.deliveryTip,
          isOpen: restaurant.isOpen
        }
      })} />
  )
  return (
    <>
      <FlatList
        data={menus}
        renderItem={renderMenuBar}
        nestedScrollEnabled
      />
      {!restaurant.isOpen && (
        <View style={{ marginBottom: 70 }} />
      )}
    </>
  )

}
