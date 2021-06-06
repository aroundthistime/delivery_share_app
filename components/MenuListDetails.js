import React from "react";
import { Text } from "react-native";
import { splitNumberPerThousand } from "../utils";
import { v4 as uuid } from "uuid";

export const MenuListWithName = ({ menus }) => {
  console.log(menus);
  return (
    <>
      {menus.length &&
        menus.map((menu) => (
          <Text style={{ marginBottom: 2 }} key={uuid()}>
            - {menu.menu.name}
          </Text>
        ))}
    </>
  );
};

export const MenuListWithPrice = ({ menus }) => {
  return (
    <>
      {menus.length &&
        menus.map((menu) => (
          <Text key={uuid()} style={{ textAlign: "right" }}>
            {splitNumberPerThousand(menu.menu.price)}원
          </Text>
        ))}
    </>
  );
};
