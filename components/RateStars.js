import React from "react";
import { View } from "react-native"
import { FontAwesome } from '@expo/vector-icons';;
import styles from "../styles";

export default ({ rate, size = 13, width }) => (
    <>
        {width ? (
            <View style={{ flexDirection: "row", justifyContent: "space-between", width }}>
                {[1, 2, 3, 4, 5].map(n => {
                    // rate >= n ? (
                    //     <FontAwesome name="star" size={13} color={styles.yellowColor} />
                    // ) : (
                    //     <FontAwesome name="star-o" size={13} color={styles.yellowColor} />
                    // )
                    if (rate >= n) {
                        return <FontAwesome name="star" size={size} color={styles.yellowColor} />
                    } else if (Math.ceil(rate) === n) {
                        return <FontAwesome name="star-half-empty" size={size} color={styles.yellowColor} />
                    } else {
                        return <FontAwesome name="star-o" size={size} color={styles.yellowColor} />
                    }
                })}
            </View>
        ) : (
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                {[1, 2, 3, 4, 5].map(n => {
                    // rate >= n ? (
                    //     <FontAwesome name="star" size={13} color={styles.yellowColor} />
                    // ) : (
                    //     <FontAwesome name="star-o" size={13} color={styles.yellowColor} />
                    // )
                    if (rate >= n) {
                        return <FontAwesome name="star" size={size} color={styles.yellowColor} />
                    } else if (Math.ceil(rate) === n) {
                        return <FontAwesome name="star-half-empty" size={size} color={styles.yellowColor} />
                    } else {
                        return <FontAwesome name="star-o" size={size} color={styles.yellowColor} />
                    }
                })}
            </View>
        )}
    </>
)