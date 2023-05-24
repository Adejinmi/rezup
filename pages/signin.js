import SignIn from "../components/signin"
import { hasCookie, getCookie } from 'cookies-next';



export default function Signin(){
    
    return(
        <>
            <SignIn />
        </>
    )

    
}

export async function getServerSideProps({ req,res }){
    const  token =  getCookie("Auth",{ req, res })
    if (token){
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/authorize`,{
            headers:{
                Authorization:token
            }
        })
        const json = await res.json()
        if(json.isAuth){
            return {
                redirect:{
                    destination:"/",
                    permanent:false
                }
            }
        }
        return{props:{}}
        
    }
    return{props:{}}
    
  }



