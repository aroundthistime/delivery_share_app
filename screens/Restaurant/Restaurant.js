import React from "react";
import { useQuery } from "@apollo/client";
import { GET_RESTAURANT } from "../../queries/RestaurantQueries";
import Loader from "../../components/Loader";
import RestaurantPresenter from "./RestaurantPresenter";


export default ({ navigation, route }) => {
    const {
        params: { id }
    } = route;
    const { loading, data, error } = useQuery(GET_RESTAURANT, {
        variables: {
            seq: id
        }
    });
    return <>
        {!loading && data && data.getRestaurant ? (
            <RestaurantPresenter restaurant={data.getRestaurant} navigation={navigation} />
        ) : (
            <Loader />
        )}
    </>
}