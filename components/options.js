export const yearOptions=[
    {value:null, label:'Year'},
    {value:'201617', label:'2016/17'},
    {value:'201718', label:'2017/18'},
    {value:'201819', label:'2018/19'},
    {value:'201920', label:'2019/20'},
    {value:'202021', label:'2020/21'},
    {value:'202122', label:'2021/22'}
  ]
  export const semOptions=[
    {value:null, label:'Semester'},
    {value:'first', label:'First Semester'},
    {value:'second', label:'Second Semester'},
  ]
  
  export const levelOptions=[
    {value:null, label:'Level'},
    {value:'100l', label:'100 Level'},
    {value:'200l', label:'200 Level'},
    {value:'300l', label:'300 Level'},
    {value:'400l', label:'400 Level'},
    {value:'500l', label:'500 Level'},
  ]

 export const deptOptions=[{value:null, label:'Department'}]
 
 const dept = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/fetchdepartment`,{
    method:"POST"
  }).then(response=>{
        return response.json()
  }).then(data=>{
    return data.row.forEach(element => {
        deptOptions.push({value:element.prefix, label:element.dname})
      });
  }) 

/*   export const deptOptions=[
    {value:null, label:'Level'},
    {value:'100l', label:'100 Level'},
    {value:'200l', label:'200 Level'},
    {value:'300l', label:'300 Level'},
    {value:'400l', label:'400 Level'},
    {value:'500l', label:'500 Level'},
  ] */
 
  