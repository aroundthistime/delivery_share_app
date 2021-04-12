import React, { createContext, useContext, useState } from "react";

export const RestaurantContext = createContext();

export const RestaurantProvider = ({restaurant : restaurantProp, children}) => {
    const [restaurant, setRestaurant] = useState(restaurantProp);
    return <RestaurantContext.Provider value={{restaurant, setRestaurant}}>{children}</RestaurantContext.Provider>
}

export const useRestaurant = () => {
    const { restaurant } = useContext(RestaurantContext);
    return restaurant;
}

// export const useSetRestaurant = () => {
//     console.log(useContext(RestaurantContext));
//     const { setRestaurant } = useContext(RestaurantContext);
//     return setRestaurant;
// }