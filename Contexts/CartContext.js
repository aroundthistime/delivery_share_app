import React, { createContext, useContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState({
        restaurant : undefined,
        menus : []
    })
    const isSameMenu = (menu1, menu2) => (
        menu1.id === menu2.id
        && JSON.stringify(menu1.options) === JSON.stringify(menu2.options)
    )
    const alreadyInCart = (menuObj) => cart.menus.some(menu => 
        isSameMenu(menu, menuObj)
    );
    const getMenuIncreasedCart = (menuObj) => cart.menus.map(menu => {
        if (isSameMenu(menu, menuObj)){
            return {
                ...menu,
                count : menu.count + 1
            }
        } else {
            return menu
        }
    })
    const getMenuDecreasedCart = (menuObj) =>  cart.menus.map(menu => {
        if (isSameMenu(menu, menuObj)){
            return {
                ...menu,
                count : menu.count - 1
            }
        } else {
            return menu
        }
    })
    const increaseMenuInCart = (menu) => {
        const menuIncreasedCart = getMenuIncreasedCart(menu);
        setCart({
            restaurant : cart.restaurant,
            menus : menuIncreasedCart
        })
    }
    const decreaseMenuInCart = (menu) => {
        const menuDecreasedCart = getMenuDecreasedCart(menu);
        setCart({
            restaurant,
            menus : menuDecreasedCart
        })
    }
    const addMenuToCart = (menu, restaurant) => {
        if (!cart.restaurant || cart.restaurant.id === restaurant.id){
            if (alreadyInCart(menu)) {
                increaseMenuInCart(menu);
                return 0
            } else {
                setCart({
                    restaurant,
                    menus : cart.menus.concat([menu])
                })
                return 1
            }
        } else {
            return false
        }
    }
    const deleteMenuFromCart = (menuObj) => {
        try{
            setCart({
                ...cart,
                menus : cart.menus.filter(menu => !isSameMenu(menu, menuObj))
            })
        }catch{}
    }
    const clearCart = (menu) => {
        setCart({
            restaurant : undefined,
            menus : []
        })
    }
    return <CartContext.Provider value={{cart, increaseMenuInCart, decreaseMenuInCart, addMenuToCart, deleteMenuFromCart, clearCart}}>{children}</CartContext.Provider>
}

export const useCart = () => {
    const { cart } = useContext(CartContext);
    return cart
}

export const useIncreaseMenuInCart = () => {
    const { increaseMenuInCart } = useContext(CartContext);
    return increaseMenuInCart
}

export const useDecreaseMenuInCart = () => {
    const { decreaseMenuInCart } = useContext(CartContext);
    return decreaseMenuInCart
}

export const useAddMenuToCart = () => {
    const { addMenuToCart } = useContext(CartContext);
    return addMenuToCart
}

export const useDeleteMenuFromCart = () => {
    const { deleteMenuFromCart } = useContext(CartContext);
    return deleteMenuFromCart
}

export const useClearCart = () => {
    const { clearCart } = useContext(CartContext);
    return clearCart
}