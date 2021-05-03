import React from "react";
import { Text } from "react-native";
import { splitNumberPerThousand } from "../utils";

export const MenuListWithName = ({ menus }) => {
  return <>{menus.length && menus.map((menu) => <Text>- {menu.name}</Text>)}</>;
};

export const MenuListWithPrice = ({ menus }) => {
  return (
    <>
      {menus.length &&
        menus.map((menu) => (
          <Text style={{ textAlign: "right" }}>
            {splitNumberPerThousand(menu.price)}원
          </Text>
        ))}
    </>
  );
};
