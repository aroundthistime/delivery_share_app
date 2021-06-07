import { gql } from "@apollo/client";

export const CREATE_USER_REVIEW = gql`
  mutation createUserReview(
    $content: String
    $fromseq: Int
    $rate: Float
    $toseq: Int
  ) {
    createUserReview(
      content: $content
      fromseq: $fromseq
      rate: $rate
      toseq: $toseq
    ) {
      content
    }
  }
`;

export const CREATE_RES_REVIEW = gql`
  mutation WriteRestaurantReview(
    $content: String
    $order_seq: Int
    $rate: Float
  ) {
    WriteRestaurantReview(
      content: $content
      order_seq: $order_seq
      rate: $rate
    ) {
      content
    }
  }
`;
