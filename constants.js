import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

const categories = [
    {
        name: "한식",
        uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThtbj4VPaL2HqzYPFs2YCAnJuIvdJY-w-EVA&usqp=CAU"
    },
    {
        name: "치킨",
        uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThtbj4VPaL2HqzYPFs2YCAnJuIvdJY-w-EVA&usqp=CAU"
    },
    {
        name: "피자",
        uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThtbj4VPaL2HqzYPFs2YCAnJuIvdJY-w-EVA&usqp=CAU"
    },
    {
        name: "중식",
        uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThtbj4VPaL2HqzYPFs2YCAnJuIvdJY-w-EVA&usqp=CAU"
    },
    {
        name: "양식",
        uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThtbj4VPaL2HqzYPFs2YCAnJuIvdJY-w-EVA&usqp=CAU"
    },
    {
        name: "카페/디저트",
        uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThtbj4VPaL2HqzYPFs2YCAnJuIvdJY-w-EVA&usqp=CAU"
    },
    {
        name: "일식",
        uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThtbj4VPaL2HqzYPFs2YCAnJuIvdJY-w-EVA&usqp=CAU"
    },
    {
        name: "햄버거",
        uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThtbj4VPaL2HqzYPFs2YCAnJuIvdJY-w-EVA&usqp=CAU"
    },
    {
        name: "야식",
        uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThtbj4VPaL2HqzYPFs2YCAnJuIvdJY-w-EVA&usqp=CAU"
    },
    {
        name: "족발/보쌈",
        uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThtbj4VPaL2HqzYPFs2YCAnJuIvdJY-w-EVA&usqp=CAU"
    },
    {
        name: "도시락",
        uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThtbj4VPaL2HqzYPFs2YCAnJuIvdJY-w-EVA&usqp=CAU"
    },
    {
        name: "분식",
        uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThtbj4VPaL2HqzYPFs2YCAnJuIvdJY-w-EVA&usqp=CAU"
    },
    {
        name: "찜/탕",
        uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThtbj4VPaL2HqzYPFs2YCAnJuIvdJY-w-EVA&usqp=CAU"
    },
]

const reportReasons = [
    "상업적 광고/도배",
    "욕설/비하",
    "음란물/성희롱",
    "기타",
]

const headerRightMargin = 10;

const requestMaxLength = 60;

const restaurantImageSize = 66;

export default { width, height, categories, headerRightMargin, requestMaxLength, reportReasons, restaurantImageSize };