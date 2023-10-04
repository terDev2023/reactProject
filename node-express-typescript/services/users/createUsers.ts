import User from "../../models/User"
import getUsers from "./getUsers"

interface ICreateUsersArgs {
    name: string,
    age: number,
}

const createUser = async (args: ICreateUsersArgs) => {
    const { name, age } = args
    const userbody = {
        name: name,
        age: age
    }
    await User.create(userbody)
    const user = await User.findOne({name: name}, {age: age})
    const total = await User.count()
    
    return {
    _id: user?._id,
    total: total
    }
}

export default createUser