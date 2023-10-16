import User from "../../models/User"

const getUserById =  async ( id: string) => {
    
    const user = await User.findById(id)
    if (!user) return false
    return user
}

export default getUserById