import User from "../../models/User"

const deleteUser = async (_id: string) => {
        
    await User.findByIdAndDelete(_id)

    const total = await User.count()
    
    return {
    total: total
    }
}

export default deleteUser