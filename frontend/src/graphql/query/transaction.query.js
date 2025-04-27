
import { gql } from "@apollo/client"


export const TRANSACTIONS = gql`
   query GetTransactions{
    transactions {
        _id 
        userId 
        description 
        paymentType 
        category 
        amount
        location  
        date
    }
   }
`
export const TRANSACTION = gql`
   query GetTransaction($transactionId :ID!){
    transaction(transactionId : $transactionId) {
        _id 
        userId 
        description 
        paymentType 
        category 
        amount
        location  
        date
        user {
            name
            username
        }
    }
   }
`
export const CATEGORY_STATITICS = gql`
   query CategoryStatitics{
    categoryStatistics {
        category
        totalAmount
    }
   }
`

