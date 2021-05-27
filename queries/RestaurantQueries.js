import { gql } from "@apollo/client";

export const GET_RESTAURANTS = gql`
    query getRestaurants ($category : String!, $si : String!, $dong : String!){
        Restaurant(category: $category, si: $si, dong: $dong){
            name
            rate
            introduction
            delivery_tip
            min_order
        }
    }
`