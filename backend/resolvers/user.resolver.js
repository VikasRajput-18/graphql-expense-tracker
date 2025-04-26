import User from "../models/user.model.js";
import bcrypt from "bcryptjs"

const userResolver = {

    Mutation: {
        signUp: async (_, { input }, context) => {
            const { username, name, password, gender } = input
            try {
                if (!username || !name || !password || !gender) {
                    throw new Error("All fields are required")
                }
                const existingUser = await User.findOne({ username });
                if (existingUser) {
                    throw new Error("User already registered")
                }

                const hashedPassword = await bcrypt.hash(password, 10);
                let AVATAR_BASE_URL = `https://avatar.iran.liara.run/public`
                let profilePic = `${AVATAR_BASE_URL}/${gender === "male" ? "boy" : "girl"}?username=${username}`

                const newUser = await User.create({
                    username,
                    name,
                    gender,
                    password: hashedPassword,
                    profile_picture: profilePic
                })

                await context.login(newUser)
                return newUser
            } catch (error) {
                console.error(`Error in signup : ${error}`);
                throw new Error(error.message || "Internal Server Error")

            }

        },
        login: async (_, { input }, context) => {
            try {
                const { username, password } = input;
                if (!username || !password) {
                    throw new Error("All fields are required")
                }
                const { user } = await context.authenticate("graphql-local", { username, password })

                await context.login(user);
                return user
            } catch (error) {
                console.error(`Error in login : ${error}`);
                throw new Error(error.message || "Internal Server Error")
            }
        },

        logout: async (_, args, context) => {
            try {
                await context.logout();
                context.req.session.destroy((err) => {
                    if (err) throw err
                })
                context.res.clearCookie("connect.sid");
                return { message: "Logout Successfully" }
            } catch (error) {
                console.error(`Error in logout : ${error}`);
                throw new Error(error.message || "Internal Server Error")
            }
        }


    },

    Query: {
        authUser: async (_, args, context) => {
            try {
                const user = await context.getUser()
                return user
            } catch (error) {
                console.error(`Error in authUser : ${error}`);
                throw new Error(error.message || "Internal Server Error")
            }
        },

        user: async (_, { userId }) => {
            try {
                const user = await User.findById(userId);
                return user
            } catch (error) {
                console.error(`Error in user query: ${error}`);
                throw new Error(error.message || "Internal Server Error")
            }
        }
    },

    // TODO => USER/TRANSACTION RELATION
}

export default userResolver