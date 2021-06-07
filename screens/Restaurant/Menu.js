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