import { ToastAndroid } from "react-native";

export const formatReviewCounts = (count) => {
    if (count <= 100){
        return count
    }
    let countString = count.toString();
    let digits = countString.length;
    return `${countString[0] + "0".repeat(digits - 1)}+`;
}

export const showToast = (text, isBottom) => {
    if (isBottom){
        ToastAndroid.show(text, ToastAndroid.SHORT);        
    } else {
        ToastAndroid.showWithGravity(text, ToastAndroid.SHORT, ToastAndroid.CENTER);
    }
}