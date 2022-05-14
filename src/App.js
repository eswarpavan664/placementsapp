/* eslint-disable no-unused-vars */
import React,{useState} from 'react';
import readXlsxFile from 'read-excel-file'
import * as xlsx from "xlsx";
function App() {
const [Data,setData] = useState([]);

const readUploadFile = (e) => {
  e.preventDefault();
  if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
          const data = e.target.result;
          const workbook = xlsx.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json = xlsx.utils.sheet_to_json(worksheet);
          console.log(json);
          setData(json);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
  }
}

 
  return (
    <div class="container">

           <div  >
           {Data
            ?
            <DisplayInTable Data={Data}/>
            :
            null
          }

           </div>

      <form>
            <label htmlFor="upload">Upload File</label>
            <input
                type="file"
                name="upload"
                id="upload"
                onChange={readUploadFile}
            />
      </form>

      {Data
            ?
            <CreateAccounts Accounts={Data} />
            :
            null
      }


    </div>
  );
}


function CreateAccounts(props){

  const Generate= async ()=>{

    var len = Object.keys(props.Accounts).length
    for(var i=0;i<len;i++){

      fetch("http://192.168.55.103:5000/signup",{
        method:"POST",
        headers: {
         'Content-Type': 'application/json'
       },
       body:JSON.stringify({
         "email":props.Accounts[i].name,
         "password":props.Accounts[i].email,
         "Name":props.Accounts[i].name,
         "Year":props.Accounts[i].year,
         "Branch":props.Accounts[i].branch,
         "Percentage":props.Accounts[i].percentage,
         "PhoneNumber":props.Accounts[i].phoneno,
         "Backlogs":props.Accounts[i].backlogs,
         "RegId":props.Accounts[i].id,


       })
      })
      .then(res=>res.json())
     }
  alert("Accounts Generated Successfully")
  window.location.reload()
 }
  return(
    <button onClick={Generate}>generate Accounts</button>
  )
}


function DisplayInTable(props){
  return(
    <div>

<table class="table table-bordered">
  <thead>
  <tr>
      <th scope="col">S No.</th>
      <th scope="col">Name</th>
      <th scope="col">Reg Id</th>
      <th scope="col">Branch</th>
      <th scope="col">Year</th>
      <th scope="col">Email Id</th>
      <th scope="col">Password</th>
      <th scope="col">Percentage</th>
      <th scope="col">Backlogs</th>
    </tr>
  </thead>
  <tbody>

       
{props.Data.map((data, key) => {
  return (
    
    <tr>
      <th scope="row">{key+1}</th>
      <th scope="row">{data.name}</th>
      <th scope="row">{data.id}</th>
      <th scope="row">{data.branch}</th>
      <th scope="row">{data.year}</th>
      <th scope="row">{data.email}</th>
      <th scope="row">{data.password}</th>
      <th scope="row">{data.percentage}</th>
      <th scope="row">{data.backlogs}</th>
    </tr>
    
  );
})}
     
    
  </tbody>
</table>
    </div>
  )
}

 

export default App;
