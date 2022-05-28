import React,{useState} from 'react';
import readXlsxFile from 'read-excel-file'
import * as xlsx from "xlsx";

function CreateStudentsLogins() {
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
           "email":props.Accounts[i].email,
           "password":props.Accounts[i].password,
           "Name":props.Accounts[i].name,
           "Year":props.Accounts[i].year,
           "Branch":props.Accounts[i].branch,
           "Percentage":props.Accounts[i].percentage,
           "PhoneNumber":props.Accounts[i].phoneno,
           "Backlogs":props.Accounts[i].backlogs,
           "RegId":props.Accounts[i].id,
          "collegeId":props.Accounts[i].collegeId,
  
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
        <th scope="col">College Id</th>
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
        <th scope="row">{data.collegeId}</th>
      </tr>
      
    );
  })}
       
      
    </tbody>
  </table>
      </div>
    )
  }
  
  function UploadeJobPost(){
  
    const [CompanayNames,setComapanyNames]=useState(
      {
        "TCS":"https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg",
        "INFOSYS":"https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/v1415386231/utypaslbyxwfuwhfdzxd.png",
        "WIPRO":"https://www.wipro.com/content/dam/nexus/en/brand/images/wipro-primary-logo-color-rbg.png",
        "Tech Mahindra":"https://m.economictimes.com/thumb/msid-74861589,width-1200,height-900,resizemode-4,imgsize-35143/tech-mahindra-tweaks-brand-logo-to-convey-solidarity-in-fight-against-covid-19.jpg",
        "HCL Technologies":"https://1000logos.net/wp-content/uploads/2021/09/HCL-Logo.png",
        "Accenture":"https://180dc.org/wp-content/uploads/2014/04/accenture-logo.png",
        "Zoho":"https://download.logo.wine/logo/Zoho_Corporation/Zoho_Corporation-Logo.wine.png"
      })
  
    return(
      <div>
        <h1>Posts</h1>
      </div>
    )
  }
   
  

export default CreateStudentsLogins;