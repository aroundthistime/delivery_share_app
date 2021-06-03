import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

const categories = [
    {
        name: "한식",
        uri: require("./assets/category_logos/한식.png")
    },
    {
        name: "치킨",
        uri: require("./assets/category_logos/치킨.png")
    },
    {
        name: "피자",
        uri: require("./assets/category_logos/피자.png")
    },
    {
        name: "중식",
        uri: require("./assets/category_logos/중식.png")
    },
    {
        name: "양식",
        uri: require("./assets/category_logos/양식.png")
    },
    {
        name: "카페/디저트",
        uri: require("./assets/category_logos/카페.png")
    },
    {
        name: "일식",
        uri: require("./assets/category_logos/일식.png")
    },
    {
        name: "햄버거",
        uri: require("./assets/category_logos/햄버거.png")
    },
    {
        name: "야식",
        uri: require("./assets/category_logos/야식.png")
    },
    {
        name: "족발/보쌈",
        uri: require("./assets/category_logos/족발보쌈.png")
    },
    {
        name: "도시락",
        uri: require("./assets/category_logos/도시락.png")
    },
    {
        name: "분식",
        uri: require("./assets/category_logos/분식.png")
    },
    {
        name: "찜/탕",
        uri: require("./assets/category_logos/찜탕.png")
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