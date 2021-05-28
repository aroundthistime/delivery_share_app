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
    minute = minute < 10 ? `0${minute}` : minute;
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

const checkIfYesterday = (date1, date2) => {
    if (date1.getDate() === 1) {
        if (date1.getMonth() === 1) {
            return date1.getFullYear() - 1 === date2.getFullYear()
                && date2.getMonth() === 12
                && date2.getDate() === 31
        } else {
            return date1.getFullYear() === date2.getFullYear()
                && date1.getMonth() - 1 === date2.getMonth()
                && date2.getDate() === new Date(date1.getFullYear(), date2.getMonth(), 0)
        }
    } else {
        return date1.getFullYear() === date2.getFullYear()
            && date1.getMonth() === date2.getMonth()
            && date1.getDate() - 1 === date2.getDate()
    }
}

export const getTimeStamp = (timeString) => {
    const current = new Date();
    const target = new Date(timeString);
    if (//same date
        current.getFullYear() === target.getFullYear()
        && current.getMonth() === target.getMonth()
        && current.getDate() === target.getDate()
    ) {
        let hour = target.getHours();
        let minute = target.getMinutes();
        return formatAmPm(`${hour}:${minute}`)
    } else if (checkIfYesterday(current, target)) {
        return "어제"
    } else if (current.getFullYear() === target.getFullYear()) {//same year
        return `${target.getMonth() + 1}월 ${target.getDate()}일`
    } else { //different year
        return `${target.getFullYear()}년 ${target.getMonth() + 1}월 ${target.getDate()}일`
    }
}

export const getOpponent = (participants, userId) => {
    const DEFAULT_USER = {
        name: "(알수없음)",
        avatar: "https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
    }
    if (participants.length > 1) {
        if (participants[0].id === userId) {
            return participants[1];
        } else {
            return participants[0];
        }
    } else {
        return DEFAULT_USER;
    }
}

export const showToast = (text, isBottom) => {
    if (isBottom) {
        ToastAndroid.show(text, ToastAndroid.SHORT);
    } else {
        ToastAndroid.showWithGravity(text, ToastAndroid.SHORT, ToastAndroid.CENTER);
    }
}

export const splitNumberPerThousand = (number) =>
    number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const extractLocationInfos = (locObj) => {
    const address = locObj.road_address.address_name;
    let si;
    const dong = locObj.address.region_3depth_name;
    if (locObj.address.region_2depth_name.slice(-1) === "구") {
        si = locObj.address.region_1depth_name;
    } else {
        si = locObj.address.region_1depth_name;
    }
    return {
        address,
        si,
        dong
    }
    // if (locObj.address.region_1depth_name.slice(-1) === "시")
}