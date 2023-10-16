import { useUserContext } from "@/context/UserContext"
import sendHttpRequest from "@/utils/sendHTTPRequest"
import { USER_INFO } from "@/const/ApiUrls"
import {useEffect} from 'react'
import { useRouter } from "next/router"
import { LOGIN_URL } from "@/const/clientUrls"


interface ILayoutProps {
    children: React.ReactNode
}

export const AuthLayout = (props: ILayoutProps ) => {

    const {children} = props
    const {user, getUserInformation} = useUserContext()
    const router = useRouter()

    useEffect( () =>{
        if (!user) {
            getUserInformation().then((res) => {
                if (!res){
                    router.push(LOGIN_URL)
                }
            })
        }
    }, [])

    return (
        <>
        {children}
        </>
    )
}