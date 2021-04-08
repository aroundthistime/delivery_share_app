export const formatReviewCounts = (count) => {
    if (count <= 100){
        return count
    }
    let countString = count.toString();
    let digits = countString.length;
    return `${countString[0] + "0".repeat(digits - 1)}+`;
}