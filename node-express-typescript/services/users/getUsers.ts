import User from "../../models/User"

interface IGetUsersArgs {
    amountOfRows: number;
    numberOfStartScip?: number
}

const getUsers =  async (args: IGetUsersArgs) => {
    const { amountOfRows, numberOfStartScip = 0} = args
    const users = await User.find().skip(numberOfStartScip).limit(amountOfRows)
    const total = await User.count()
    // console.log(users)
    return { 
        users,
        total
    }
}

export default getUsers