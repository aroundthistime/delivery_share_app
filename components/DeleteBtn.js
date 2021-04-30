import React from "react";
import { FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";

export default ({onPress, size=20, color="rgba(0, 0, 0, 0.4)"}) => (
    <TouchableOpacity onPress={onPress}>
        <FontAwesome5 name="times" size={size} color={color} />
    </TouchableOpacity>
)