import React from "react";
import PropTypes from "prop-types";
import { Ionicons} from "@expo/vector-icons";

const TabIcon = ({name, color="rgba(100, 100, 100, 0.5)", size=22, group="Ionicons"}) => {
    if (group === "Ionicons"){
        return (
            <Ionicons
                name={name}
                color={color}
                size={size}
            />
        )
    }
}

TabIcon.propTypes = {
    name : PropTypes.string.isRequired,
    color : PropTypes.string,
    size : PropTypes.number,
    group : PropTypes.string
}

export default TabIcon;