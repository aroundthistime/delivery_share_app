import React from "react";
import Loader from "../../components/Loader";
import { useQuery, } from "@apollo/client";
import { GET_MENU } from "../../queries/RestaurantQueries";
import MenuPresenter from "./MenuPresenter";


export default ({ navigation, route }) => {
    const {
        params: { menuId, restaurant }
    } = route;
    const { loading, data, error } = useQuery(GET_MENU, {
        variables: {
            seq: menuId
        }
    });
    navigation.setOptions({ title: "" });
    if (!loading && data && data.Menu) {
        navigation.setOptions({ title: data.Menu.name });
    }
    return (
        !loading && data && data.Menu ? (
            <MenuPresenter menuData={data.Menu} navigation={navigation} restaurant={restaurant} />
        ) : (
            <Loader />
        )
    )
}