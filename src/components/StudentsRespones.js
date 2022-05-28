/* eslint-disable react/jsx-no-duplicate-props */
import React,{useEffect,useState} from 'react'

function StudentsRespones(props) {
  var ss=0;

  return(
    <> 
     {props.kk.map((key) => (
      <ContentDisplay  id={props.id} k={key} count={ss}/>
        
        ))}
   
   
   </>
  )
 
}


function ContentDisplay(props){
  
  const [UserData,setData] = useState("")
  const [CollId,setCollId] =useState();
  let Cid = "";
  const  GetData = async ()=>{
     const token = await  localStorage.getItem("token")
   fetch('http://192.168.55.107:5000/getapplys?id='+props.id,{
   headers:new Headers({
     Authorization:"Bearer "+token
   })
   }).then(res=>res.json())
   .then(data=>{ 
   
     Cid=data.CollegeId;
     setData(data);
     
          console.log(data);
      
   }
   )
  }
  useEffect(()=>{
   
    setInterval(() => {
      GetData();
     }, 2000)
    
   },[])
var di=props.k.split("+")
  
  return (
    <>
    {UserData?
      <div  >

      

      <div>
      <h1>PostId:- {props.k}</h1>
      <h1>Posted Date:- {di[2]}</h1>
  
  <table class="table table-bordered">
    <thead>
    <tr>
        <th scope="col">S No.</th>
        <th scope="col">Name</th>
        <th scope="col">Reg Id</th>
        <th scope="col">Branch</th>
  
        <th scope="col">Email Id</th>
        <th scope="col">PhoneNumber</th>
        <th scope="col">Applied CompanayName</th>
        <th scope="col">Posted Date</th>
        
        <th scope="col">Applied Date</th>
      </tr>
    </thead>
    <tbody>
  



    {Object.keys(UserData).map((item, i) => (
                      <> 
      {props.k===UserData[i].PostId?<tr>
        <th scope="row">{}</th>
        <th scope="row">{UserData[i].Name}</th>
        <th scope="row">{UserData[i].Id}</th>
        <th scope="row">{UserData[i].Branch}</th>
      
        <th scope="row">{UserData[i].email}</th>
        <th scope="row">{UserData[i].PhoneNumber}</th>
        <th scope="row">{UserData[i].CompanyName}</th>
        <th scope="row">{UserData[i].PostedDate}</th>
        <th scope="row">{UserData[i].AppliedDate}</th>
      </tr>:null

      }
      </>      
                     ))}
  
       
      
    </tbody>
  </table>
      </div>



               
      </div>
      :
      <h1>Loading</h1>}
    </>
  )
}
export default StudentsRespones;