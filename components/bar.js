import { useState } from "react";
import Select from "react-select"
import Switch from "react-switch"
import { levelOptions, semOptions, yearOptions, deptOptions } from "./options";



export default function Bar({ setRecord, setDetails }) {
  
  const  submitquery = async ()=>{
    setRecord()
    const typ= type=="Name" ? "name" : "matric"
    const data={
      query,typ,year,sem,level,dept 
    }

    if (query=="") {
      return alert ("Search Field is empty!")
    }
    else{
      if (sem.value==null || year.value==null || level.value==null) {
        return alert("Year, Semester and Level must be Selected");
      }
      else{
        
        const res = await fetch("http://localhost:3000/api/fetchresult",{
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
          setRecord(result) 
          setDetails(data)
        })
        .catch(function(err){
          console.log(err)
        })
       
        
      }
    }
    
}


  const [query, setQuery] = useState("");
  const [level, setLevel] = useState(levelOptions[0]);
  const [dept, setDept] = useState(deptOptions[0]);
  const [sem, setSem] = useState(semOptions[0]);
  const [year, setYear] = useState(yearOptions[0]);

  const [checked, changeCheked] = useState(false)
  const [type, changeType] = useState("Matric Number")
 
  const clearFilter = ()=>{
    setRecord()
    setYear(yearOptions[0])
    setLevel(levelOptions[0])
    setSem(semOptions[0])
    setDept(deptOptions[0]) 
  }

  const handleChange=()=>{
      changeCheked(checked ? false : true)
      changeType(type=="Name" ? "Matric Number" : "Name")
  }
    return (
    <>
      <div className="sm:w-10/12 md:w-6/12 h-80 m-auto mt-32">
      <p className="text-sm"> Search by Name</p>
      <Switch onChange={handleChange} width={50} height={20}  checked={checked} /> <br />
        <input
          className="bar"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onSubmit={() => submitquery()}
          placeholder={type}
        />
        <button className=" h-10 w-2/12 inline-block text-xs text-white p-2 bg-green-blue" onClick={()=>{submitquery()}}>Search</button>
        <div className="mt-1 w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 5 25 25"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 mt-2 inline-block"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5"
            />
          </svg>
            <p className="inline-block text-sm">Filters - <span className="text-xs text-green-700">You must select at least Year, Semester and Level</span></p>
            <button className="text-xs text-white p-2 float-right bg-green-blue" onClick={()=> clearFilter()}>Clear Filters</button>        
        </div>

        <div>
          <Select value={year} onChange={(e)=>setYear(e)} options={yearOptions} className='drop' placeholder="Year" /> 
          <Select value={sem} onChange={(e)=>setSem(e)} options={semOptions} className='drop' placeholder="Semester" />
          <Select value={dept} onChange={(e)=>setDept(e)} options={deptOptions} className='drop' placeholder="Department" /> 
          <Select value={level} onChange={(e)=>setLevel(e)} options={levelOptions} className='drop' placeholder="Level" />
         
        </div>
      </div>
    </>
  );
}
