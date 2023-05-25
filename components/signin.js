import { useState } from "react"
import { useRouter } from 'next/router'

export default function SignIn (){
    const [username, setUsername] = useState("") 
    const [password, setPassword] = useState("")
    const [mailerr, setMerr] = useState("") 
    const [submit, setSubmit] = useState("Submit")
    const [diasble, setDisable] = useState(false) 
    const router = useRouter()

    const HandleSubmit= async ()=>{
       const  data={username,password}
       if(username!="" && password!=""){
        const res = await fetch('api/signin', {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify(data)
        })
    
        const response = await res.json()
     
            if (response.isAuth){
                   router.push('/')
            }
            else{
                setDisable(false)
                setSubmit("Submit")
                setMerr(response.message)
                
            }
       }
       else{
        setDisable(false)
        setSubmit("Submit")
        setMerr("Both fields are required")
        
       }
        
            

        
    }
    return(
        <>
            <div className="lg:w-4/12 md:w-6/12 sm:w-11/12 h-60 m-auto mt-40 shadow-xl text-center border-top-1 border-">
                <p className="text-th-blue text-lg font-bold tracking-wider">SIGN IN</p>
                <form>
                    <input className="put" type='text' placeholder="Username" value={username} onChange={(e)=>{setUsername(e.target.value); setMerr("")}}></input><br />
                
                    <input className="put" type='password' placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value); setMerr("")}}></input><br />
                    <p className="text-red-500 text-sm">{mailerr}</p>
                
                    <input type='submit' value={submit} disabled={diasble} className="inline-block w-4/12 mt-5 bg-green-blue text-white p-1 rounded-sm" onClick={(e)=>{e.preventDefault()  
                        setSubmit(".....")
                        setDisable(true)
                        setMerr('')
                        HandleSubmit()
                    }}></input>
                </form>
            </div>
        </>
    )
}