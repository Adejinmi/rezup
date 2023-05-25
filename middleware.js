import { NextResponse } from 'next/server'


export default async function middleare(req) {
  const { pathname } = req.nextUrl;
  
   const token=req.cookies.get("Auth")
    
  if (token){
  
   const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/authorize`,{
     credentials:"include",
     headers:{
      Authorization: req.cookies.get("Auth").value
     }
   })
     const response= await data.json()
     if (response.isAuth){
      const response = NextResponse.next({
        req: {
          headers: {
              Authroization:req.cookies.get("Auth").value
          },
        },
      })

      return response
         
     }
     else{
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_API_URL}signin`)
     }     
  }

  else{
    /*return new NextResponse(
      JSON.stringify({ success: false, message: 'authentication failed' }),
      { status: 307, headers: { 'content-type': 'application/json' }, redirect:{destination:'/signin', permanent:'false'} }
    )*/
      //return NextResponse.redirect(new URL('http://localhost:3000/signin', req.url))

      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_API_URL}signin`)
  }
} 

       
    
    
    export const config = {
      matcher: ['/','/singlesearch/:path*','/exportsingle/:path*','/api/fetchresult','/exportdepartment/:path*','/correctdetails/:path*']
    }

