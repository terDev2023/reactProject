import User from "../../models/User"

interface ICreateUsersArgs {
    name?: string,
    username?: string,
    password?: string,
    age?: number,
}

const createUser = async (args: ICreateUsersArgs) => {
    const { name = 'Unknown', age = 18, username = name, password = Math.random().toString(36).slice(2, 10) } = args

    const userbody = {
        name: name,
        username: username,
        password: password,
        age: age
    }
    console.log(userbody)


    await User.create(userbody)
    const user = await User.findOne({name: name}, {username: username}, {age: age})
    const total = await User.count()

    return {
    _id: user?._id,
    total: total
    }
}

export default createUser