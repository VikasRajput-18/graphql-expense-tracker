
const userTypeDef = `#graphql
  type User {
    _id : ID!
    username : String!
    name: String!
    password : String!
    profile_picture : String
    gender : String!
    transactions : [Transaction!]
  }

  type Query {
    # users : [User!]
    authUser : User
    user(userId : ID!) : User
  }
  type Mutation {
    signUp(input : SignUpInput!) : User
    login(input : LoginInput!) : User
    logout : LogoutInput
  }

  input SignUpInput {
    username : String!
    name : String!
    gender : String!
    password : String!  
  }

  input LoginInput {
    username : String!
    password : String!
  }

  type LogoutInput{
    message : String!
  }
`


export default userTypeDef