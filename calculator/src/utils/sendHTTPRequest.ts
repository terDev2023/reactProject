import { type } from "os"

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

interface IArgs {
    url: string, 
    method: Method
}



const  sendHttpRequest = async (args: IArgs ) => {
    const {url, method} = args
    const req = await fetch(url, {
        method: method
    })
    const result = await req.json()
    const status = await req.status
    return {
        result,
        status
    }
}

export default sendHttpRequest