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
