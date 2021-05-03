export const formatReviewCounts = (count) => {
  if (count <= 100) {
    return count;
  }
  let countString = count.toString();
  let digits = countString.length;
  return `${countString[0] + "0".repeat(digits - 1)}+`;
};

/**
 * DESC: 입력된 평가점수를 별로 변환하는 함수
 * TODO *
 * 1. 소수점 단위 인식하도록 변경
 * 2. 제대로 된 이미지 사용할 것
 */
export const translateStars = (average) => {
  if (average >= 5) return "⭐⭐⭐⭐⭐";
  else if (average >= 4) return "⭐⭐⭐⭐";
  else if (average >= 3) return "⭐⭐⭐";
  else if (average >= 2) return "⭐⭐";
  else return "⭐";
};
