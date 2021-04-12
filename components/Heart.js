import React from "react";
import { Ionicons } from '@expo/vector-icons';


export default ({isLiked, size=24}) => (
    isLiked
    ? <Ionicons name="heart" size={size} color="red" />
    : <Ionicons name="heart-outline" size={size} color="black" />
)