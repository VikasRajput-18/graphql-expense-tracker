import { gql } from '@apollo/client';

export const GET_AUTH_USER = gql`
  query GetAuthenticatedUser {
    authUser {
    _id
    username
    name
    profile_picture
    }
  }
`;


export const GET_USER_AND_TRANSACTIONS = gql`
  query GetUserAndTransactions($userId : ID!){
    user(userId : $userId){
      _id
      name
      username
      profile_picture
      transactions{
        _id 
        description
        category
        amount
        location
        date
        paymentType
      }
    }
  }
`