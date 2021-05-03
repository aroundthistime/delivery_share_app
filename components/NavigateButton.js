import React from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const NavigateButton = ({ navigation, flaticon, params, text }) => {
  const setVectorIcons = (flaticon) => {
    if (flaticon.type === "Ionicons")
      return (
        <Ionicons
          style={{ marginRight: 10 }}
          name={flaticon.name}
          size={24}
          color="black"
        />
      );
    else if (flaticon.type === "MaterialCommunityIcons")
      return (
        <MaterialCommunityIcons
          style={{ marginRight: 10 }}
          name={flaticon.name}
          size={24}
          color="black"
        />
      );
  };

  return (
    <NavigatinoBtn onPress={() => navigation.navigate(params)}>
      {flaticon ? setVectorIcons(flaticon) : null}
      <Text>{text}</Text>
    </NavigatinoBtn>
  );
};

export default NavigateButton;

const NavigatinoBtn = styled.TouchableOpacity`
  flex-direction: row;
  border: 1px solid #adadad;
  border-radius: 10px;
  padding: 10px 15px;
  width: 45%;
  justify-content: center;
  align-items: center;
`;
