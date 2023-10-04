import User from "../../models/User"

const getUserById =  async ( id: string) => {
    
    const user = await User.findById(id)
    return user
}

export default getUserById