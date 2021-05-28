import { gql } from "@apollo/client";

export const GET_RESTAURANTS = gql`
    query getRestaurants ($category : String!, $si : String!, $dong : String!){
        Restaurant(category: $category, si: $si, dong: $dong){
            name
            rate
            min_order
            thumbnail
            seq
            rate1count
            rate2count
            rate3count
            rate4count
            rate5count
            isopen
        }
    }
`