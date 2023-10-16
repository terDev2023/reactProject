import User from "../../models/User"

interface IGetUsersArgs {
    amountOfRows: number;
    numberOfStartScip?: number
}

const getUsers =  async (args: IGetUsersArgs) => {
    const { amountOfRows, numberOfStartScip = 0} = args
    let users
    let total
    try{
        users = await User.find().skip(numberOfStartScip).limit(amountOfRows)
        total = await User.count()
    } catch ( err ){
        return false
    }
    // console.log(users)
    return { 
        users,
        total
    }
}

export default getUsers