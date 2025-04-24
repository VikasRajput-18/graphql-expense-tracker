import { users } from "../dummy/data.js";

const userResolver = {
    Query: {
        users: () => users,
        user: (_, { userId }) => {
            return users.find(u => u._id === userId)
        }

    },
    Mutation: {}
}

export default userResolver