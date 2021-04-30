import React from "react";
import { FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";

export default ({onPress, size=20, marginRight, isDisabled=false}) => (
    <TouchableOpacity onPress={onPress} style={{marginRight}} activeOpacity={isDisabled ? 1 : 0.2}>
        <FontAwesome5 name="trash-alt" size={size} color={isDisabled ? "rgba(0, 0, 0, 0.2)" : "black"} />
    </TouchableOpacity>
)