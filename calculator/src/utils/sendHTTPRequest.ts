
type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'


interface IArgs {
    url: string, 
    method: Method,
    contentType?: string,
    data?: {},
}



const  sendHttpRequest = async (args: IArgs ) => {
    const {url, method, data, contentType = 'application/json'} = args

    let req;
    if (method !== 'GET' && data){
        req = await fetch(url, {
        method: method,
        headers: { 'Content-Type': contentType },
        body: JSON.stringify(data)
    })
    }
    else {
        req = await fetch(url, {
            method: method,
        }) 
    }
    
    const result = await req.json()
    const status = await req.status
    return {
        result,
        status
    }
}

export default sendHttpRequest