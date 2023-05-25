import Select from "react-select"
import { useState } from "react"
import Menu from "../components/mainMenu"
import Head from "next/head"
import { yearOptions, semOptions, levelOptions, deptOptions } from "../components/options"
import Result from "../components/result"

export default function Department(){
     const [dept, setDept] = useState(deptOptions[0])
     const [year, setYear] = useState(yearOptions[0])
     const [sem, setSem] = useState(semOptions[0])
     const [level, setLevel] = useState(levelOptions[0])
     const [record, setRecord] = useState()
     const [details, setDetails] = useState()
     const [butcol, setButcol] = useState("bg-green-blue")

     const  submitquery = async ()=>{
        setRecord()
        const data = {
            dept,year,sem,level
        }
     
          if (sem.value==null || year.value==null || level.value==null || dept.value==null) {
            return alert("All fields are required");
          }
          else{
            setButcol("bg-gray-500")
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/fetchresult`,{
              method:"POST",
              redirect:"follow",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data)
            }).then(response =>{
              if (response.redirected) {
                return window.location.href = response.url
              }
              else{
                return response.json() 
              } 
            })
            .then(result =>{
              setButcol("bg-green-blue")
              setRecord(result) 
              setDetails(data)
            })
            .catch(function(err){
              console.log(err)
            })
           
            
          }
        
        
    }

    return(
        <>
        <Head>
            <title>Search for result</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <main className="sm:block lg:grid grid-cols-6 h-full fixed w-full">
        <Menu />
        <div className="sm:h-full sm:absolute sm:top-0 sm:left-0 sm:w-full lg:static lg:col-span-5  bg-gray-200  ">
        <div className="sm:block lg:grid grid-cols-2 p-3 w-6/12 m-auto justify-items-center mt-20">   
        <Select value={year} onChange={(e)=>setYear(e)} options={yearOptions} className='drop' placeholder="Year" /> 
          <Select value={sem} onChange={(e)=>setSem(e)} options={semOptions} className='drop' placeholder="Semester" />
          <Select value={dept} onChange={(e)=>setDept(e)} options={deptOptions} className='drop' placeholder="Department" /> 
          <Select value={level} onChange={(e)=>setLevel(e)} options={levelOptions} className='drop' placeholder="Level" />

          <button className={`h-10 w-52 inline-block text-sm text-white p-2 ${butcol}`} onClick={()=>{submitquery()}}>Submit</button>
        </div>
        
        <Result record={record} details={details} isDepartment />

        </div>

        

        

      </main>
        </>
    )
}
