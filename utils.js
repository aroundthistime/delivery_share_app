import { ToastAndroid } from "react-native";

export const formatReviewCounts = (count) => {
    if (count <= 100) {
        return count
    }
    let countString = count.toString();
    let digits = countString.length;
    return `${countString[0] + "0".repeat(digits - 1)}+`;
}

export const formatAmPm = (time) => {
    let [hour, minute] = time.split(":");
    hour = parseInt(hour);
    if (hour === 24) {
        return `밤 ${12}:${minute}`
    } else if (hour < 6) {
        return `새벽 ${hour}:${minute}`
    } else if (hour < 12) {
        return `오전 ${hour}:${minute}`
    } else if (hour === 12) {
        return `오후 ${12}:${minute}`
    } else {
        return `오후 ${hour - 12}:${minute}`
    }
}

export const formatDateYYMMDD = (date) => {
    const dateObj = new Date(date);
    return `${dateObj.getFullYear()}년 ${dateObj.getMonth()}월 ${dateObj.getDate()}일`;
}

export const showToast = (text, isBottom) => {
    if (isBottom) {
        ToastAndroid.show(text, ToastAndroid.SHORT);
    } else {
        ToastAndroid.showWithGravity(text, ToastAndroid.SHORT, ToastAndroid.CENTER);
    }
}