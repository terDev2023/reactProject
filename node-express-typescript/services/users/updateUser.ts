import User from "../../models/User"
import getUsers from "./getUsers"

interface IUpdateUsersArgs {
    _id: string
    name: string,
    age: number
}

const updateUser = async (args: IUpdateUsersArgs) => {
    const {_id, name, age} = args

    await User.findByIdAndUpdate( {_id:_id}, {name: name}, {age: age})
    return true
}

export default updateUser