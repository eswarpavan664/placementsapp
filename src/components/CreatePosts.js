import React,{useState,useEffect} from 'react'

function CreatePosts(props) {

    const [CompanayName,setCompanyName] = useState("TCS");
    const [ApplyLink,   setApplyLink] = useState("");
    const [lastDate,    setlastDate] = useState("");
    const [Salary,      setSalary] = useState("");
    const [Description ,setDescription] = useState("");
    const [PostedDate,  setPostedDate] = useState("");
    const [PostId,      setPostId] = useState("");


const Companay={"TCS":"https://akm-img-a-in.tosshub.com/businesstoday/images/story/202106/tcs_logo_1200_020621101143.jpg?size=1200:675",
                "INFOSYS":"https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/v1415386231/utypaslbyxwfuwhfdzxd.png",
                "ZOHO":"https://zohowebstatic.com/sites/default/files/ogimage/zoho-logo.png",
                "TECH MAHENDHRA":"https://files.techmahindra.com/static/img/brandkit/logo/Logo-True-Colors-original.png",
                "ACCENTURE":"https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Accenture.svg/2560px-Accenture.svg.png",
                "HCL":"https://1000logos.net/wp-content/uploads/2021/09/HCL-Logo.png",
                "WIPRO":"https://pbs.twimg.com/media/C-7IgZ1XcAAJN9B.jpg:large"}
       
  const   PostNow = async ()=>{
    var date = new Date().getDate();
    var month = new Date().getMonth()+1;
    var year = new Date().getFullYear();
    var result = date.toString() + '-0'+ month.toString() + '-' + year.toString()

    fetch("http://192.168.55.107:5000/AddJobPost",{
      method:"POST",
      headers: {
       'Content-Type': 'application/json'
     },
     body:JSON.stringify({
        
       "CompanyName":CompanayName,
       "lastDate":lastDate,
       "Salary":Salary,
       "PostedDate":result,
       "collegeId":props.id, 
       "Description":Description,
       "PostId":props.id+"+"+CompanayName+"+"+result,
       "ApplyLink":ApplyLink,
       "Logo":Companay[CompanayName]

     })
    })

    alert("Posted....!")
    setCompanyName("")
    setApplyLink("")
    setlastDate("")
    setSalary("")
    setDescription("")
    setPostedDate("")
    setPostId("")
  
 }
    
    
  return (
    <div> 
    
            <label>
        Select Company Name
        <select onChange={(e)=>setCompanyName(e.target.value)}>
          <option value="TCS"  >    TCS</option>
          <option value="INFOSYS" >INFOSYS</option>
          <option value="HCL"  >     HCL</option>
          <option value="WIPRO" >    WIPRO</option>
          <option value="ZOHO"  >ZOHO</option>
          <option value="TECH MAHENDHRA">TECH MAHENDHRA</option>
          <option value="ACCENTURE"     >     ACCENTURE</option>
        </select>
      </label>


     
            <div>
            <label>lastDate : -</label>
            <input type="date" placeholder='lastDate' value={lastDate} onChange={(e)=>setlastDate(e.target.value)}/> 
            </div>
            <div>
                <label>
                Salary: -
                </label>
                <input type="text" placeholder='Salary' value={Salary} onChange={(e)=>setSalary(e.target.value)}/>
            </div>
            <div>
                <label>
                Description: -
                </label>
                <input type="text" placeholder='Description' value={Description} onChange={(e)=>setDescription(e.target.value)}/>
            </div>
            <div>
                <label>
                ApplyLink: - 
                </label>
                  
            <input type="text" placeholder='ApplyLink' value={ApplyLink} onChange={(e)=>setApplyLink(e.target.value)}/>
            </div>
             
            <button
             onClick={PostNow}
            >POST</button>
           
    </div>
  )
}


function MyPosts(props){

    const [UserData,setData] = useState("")
    const [Ids,setIds] =useState([]);
    let Cid = "";
    const  GetPosts = async ()=>{
      var k = ["hello"];
       const token = await  localStorage.getItem("token")
     fetch('http://192.168.55.107:5000/getposts?id='+props.id,{
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
            GetPosts();
         }, 2000)
        
       },[])
      
    
  
    return(
        <div>
            {Object.keys(UserData).map((item, i) => (
                 <ContentDisplay  
                    _id={UserData[i]._id}
                    collegeId={UserData[i].collegeId}
                    ApplyLink={UserData[i].ApplyLink}
                    lastDate={UserData[i].lastDate}
                    
                    Salary={UserData[i].Salary}
                    
                    Logo={UserData[i].Logo}
                    
                    CompanyName={UserData[i].CompanyName}
                    
                     PostedDate={UserData[i].PostedDate}
                      Description={UserData[i].Description}
                    
                     PostId={UserData[i].PostId}
                    
                  

                 />
                     
                ))}
        </div>
    )
}

function ContentDisplay(props){

    const DeletePost= async()=>{
        const token = await  localStorage.getItem("token")
        fetch('http://192.168.55.107:5000/deletepost?id='+props._id,{
          headers:new Headers({
            Authorization:"Bearer "+token
          })
          }) 
          .then(()=>{
             console.log("deleted....!");
             
          }
          )
       }

    return(
        <div>
                    <h1>CollegeId : -{props.collegeId}</h1> 
                    <h1>ApplyLink : -{props.ApplyLink} </h1>
                    <h1>lastDate : -{props.lastDate} </h1> 
                    <h1>Salary : -{props.Salary }</h1>
                    <h1>CompanyName : -{props.CompanyName }</h1>
                    <h1>PostedDate : -{props.PostedDate} </h1>
                    <h1>Description : -{props.Description} </h1>
                    <h1>PostId : -{props.PostId }</h1>
        <button onClick={DeletePost}>Delete Post</button>

        </div>
    )
}
export   {CreatePosts,MyPosts};