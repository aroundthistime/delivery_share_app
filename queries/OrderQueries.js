import { gql } from "@apollo/client";

export const getOrders = gql`
    query getOrders{
        query allOrders{
            seq
            created_at
            status
            delivery_time
            canWriteUserReview
            canWriteRestaurantReview
            call{
              restaurant{
                seq
                name
              }
              cart{
                user{
                  seq
                  name
                }
                selected_menu{
                  menu{
                    name
                  }
                }
              }
            }
        }
    }
`