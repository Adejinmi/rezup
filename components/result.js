import * as XLSX from 'xlsx';

export default function Result({ record, details, isExport, isDepartment }){
    

    const exportResult = (result)=>{
        let courseBeg;
        let courseEnd;
        let titleBeg
        let titleEnd
        switch (details.level.value) {
            case "100l":
                courseBeg='ESM10'
                titleBeg="Introduction "
                break;
            case "200l":
                courseBeg='ESM20'
                titleBeg="Intermediate "
                break;
            case "300l":
                courseBeg='ESM30'
                titleBeg="Advance "
                break;
            case "400l":
                courseBeg='ESM40'
                titleBeg="Public Performance "
                break;
            case "500l":
                courseBeg='ESM50'
                titleBeg="Public Performance "
                break;

            default:
                courseBeg="";
                break;
        }

        switch (details.sem.value) {
            case "first":
                courseEnd="1";
                titleEnd="I"
                break;
            case "second":
                courseEnd="2"
                titleEnd="II"
                break;
            default:
                courseEnd="";
                break;
        }

        const course= courseBeg+courseEnd;
        const title= "Every Student a Musician:"+titleBeg+titleEnd;
        const semester = "Semester:"+details.sem.value;

      var workbook = XLSX.utils.book_new();
        var worksheet = XLSX.utils.aoa_to_sheet([
            ["Course:", /**/, course,title],
            ["Session:", /**/, details.year.label,/**/,semester],
            [],
            [],
            [],
            ["Programme Type:",/**/,"Undergraduate"],
            [],
            [/**/,"Max C/A Score:","30","Max Exam Score","70"],
            ["Matric No.","Name","C/A Score","Exam Score","Ammendment Reason"]
          ]); 
          worksheet["!cols"]=[ {wch:14},{wch:40},{wch:11},{wch:40} ]
        
        if (isDepartment){
            let arr = [];
            result.forEach((element) =>{
                arr.push([element.matric,element.name,element.ca,element.exam])
            });
            XLSX.utils.sheet_add_aoa(worksheet, arr , { origin: "A10" });
            XLSX.utils.sheet_add_aoa(worksheet, [["Department:",/**/,details.dept.label]] , { origin: "A3" });
            const filename = `${course}.${details.year.label}.${details.dept.label}.xlsx`
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1'); 
            XLSX.writeFile(workbook, filename);
            
        }
        else{
            XLSX.utils.sheet_add_aoa(worksheet, [[result.matric,result.name,result.ca,result.exam]], { origin: "A10" });
            const filename = `${course}.${details.year.label}.${result.name}.xlsx`
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1'); 
            XLSX.writeFile(workbook, filename);
        }
        
        
    }
    
          
        if (record) {
            const records = record.err ? [] : record.row
        if (records.length==0) {
            return(
                <div className="p-2 text-center">
                    <h1 className="text-lg font-semibold uppercase">Showing Results From {details.level.label} {details.sem.label} {details.year.label} Session </h1>
                    {details.dept.value ? <h2 className="text-sm font-semibold uppercase text-center mt-0">{details.dept.label} Department</h2> : <h2></h2>}
                    <p>No Result found</p>
                </div>
                
            )
        }
           else{
            if (isExport) {
                const lists = records.map((result)=>{
                    return <tr key={result.matric}><td>{result.matric}</td> <td>{result.name}</td> <td>{result.ca}</td> <td>{result.exam}</td> <td><button onClick={()=>exportResult(result)} className="text-xs bg-th-blue p-1 text-white outline-none"> Export Result </button></td> </tr>
                })
                return(
                    <div className="p-2 h-52 overflow-y-auto">
                        <h1 className="text-lg font-semibold uppercase text-center">Showing Results From {details.level.label} {details.sem.label} {details.year.label} Session </h1>
                        {details.dept.value ? <h2 className="text-sm font-semibold uppercase text-center mt-0">{details.dept.label} Department</h2> : <h2></h2>}
                        <table className="w-full text-center  border-separate text-sm" >
                            <thead className="text-gray-700 bg-green-blue">
                                <tr>
                                  <td>Matric No</td> 
                                  <td>Name</td>
                                  <td>CA</td>
                                  <td>Exam</td> 
                                  <td>Export</td>
                                </tr>                   
                            </thead>
                            <tbody className="bg-white">
                                {lists}
                            </tbody>
                        </table>
                        
                    </div>
                )
            } else {
                const lists = records.map((result)=>{
                    return <tr key={result.matric}><td>{result.matric}</td> <td>{result.name}</td> <td>{result.ca}</td> <td>{result.exam}</td> </tr>
                })
                return(
                    <div className="p-2">
                        <h1 className="text-lg font-semibold uppercase text-center">Showing Results From {details.level.label} {details.sem.label} {details.year.label} Session </h1>
                        {details.dept.value ? <h2 className="text-sm font-semibold uppercase text-center mt-0">{details.dept.label} Department</h2> : <h2></h2>}
                    <div className="h-52 overflow-y-auto mt-2">
                        <table className="w-full text-center  border-separate">
                            <thead className="text-gray-700 bg-green-blue">
                                <tr>
                                  <td>Matric No</td> 
                                  <td>Name</td>
                                  <td>CA</td>
                                  <td>Exam</td> 
                                </tr>                   
                            </thead>
                            <tbody className="bg-white">
                                    {lists}
                            </tbody>
                        </table>
                        
                        
                    </div>
                    { isDepartment ? <button className="text-sm bg-th-blue p-1 text-white outline-none mt-2" onClick={()=>exportResult(records)}>Export Department</button> : <></> } 
                    </div>
                )
            }
            
        } 
        }
    
    
    
}