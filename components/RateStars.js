import React from "react";
import { View } from "react-native"
import { FontAwesome } from '@expo/vector-icons';;
import styles from "../styles";

export default ({ rate }) => (
    <View style={{ flexDirection: "row" }}>
        {[1, 2, 3, 4, 5].map(n => {
            // rate >= n ? (
            //     <FontAwesome name="star" size={13} color={styles.yellowColor} />
            // ) : (
            //     <FontAwesome name="star-o" size={13} color={styles.yellowColor} />
            // )
            if (rate >= n) {
                return <FontAwesome name="star" size={13} color={styles.yellowColor} />
            } else if (Math.ceil(rate) === n) {
                return <FontAwesome name="star-half-empty" size={13} color={styles.yellowColor} />
            } else {
                return <FontAwesome name="star-o" size={13} color={styles.yellowColor} />
            }
        })}
    </View>
)