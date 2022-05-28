/* eslint-disable no-undef */
import React,{useState,useEffect} from 'react'
import '../App.css'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

import CreateStudentsLogins from './../components/CreateStudentsLogins';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
 
import {
 
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  PoweroffOutlined,
  HomeOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import {Layout, Menu, Breadcrumb, DatePicker } from 'antd';

 
import DashBoardDetails from './../components/DashBoardDetails';
 
import StudentsRespones from './../components/StudentsRespones';
import {CreatePosts,MyPosts} from './../components/CreatePosts';
import { useNavigate } from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;



function DashBoard(){
  let navigate = useNavigate();
  const [UserData,setData] = useState("")
  const [CollId,setCollId] =useState();
  let Cid = "";
  const  GetData = async ()=>{
     const token = await  localStorage.getItem("token")
   fetch('http://192.168.55.107:5000/getadmindata',{
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
 
  GetData();

},[])
const  logout =()=>{
  localStorage.removeItem("token") 
   navigate('/Login')
 
}

  
  return (
    <> 
    {UserData.Role==='Admin'?<MainLayout Data={UserData}/>:
    <div>

    <h1>Admin error:- your are not an admin</h1>
    <button onClick={logout}>go back</button>
    </div>
    

    }  
    </>
  )
}


class MainLayout extends React.Component{

  
  state = {
    category:'Home',
    collapsed: false,
    type:"",
  };


  passprops=(a,b)=>{
      this.setState({
          category:a,
          type:b,
      })

  }

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

   


render() {
 
const { collapsed } = this.state;
return (
  <>
     <h1 style={{textAlign:'center' }}>Admin Panel</h1>
 
    <Layout style={{ minHeight: '100vh' }}>
    
     
    <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
      <div className="logo" />
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1"  onClick={()=>this.passprops("Home","Admin")} icon={<HomeOutlined />} >
         DashBoard
        </Menu.Item>
        <Menu.Item key="2"  onClick={()=>this.passprops("Profile","Admin")} icon={<UserOutlined />}>
           Profile
        </Menu.Item>
        <SubMenu key="sub2" icon={<FileTextOutlined />} title="New Post">
          <Menu.Item  onClick={()=>this.passprops("Create Posts","Admin")} key="3">Create Posts</Menu.Item>
          <Menu.Item key="4"  onClick={()=>this.passprops("My Posts","Admin")}>My Posts</Menu.Item>
          
        </SubMenu>
       
        <SubMenu key="sub1" icon={<FileTextOutlined />} title="Add Students">
          <Menu.Item  onClick={()=>this.passprops("Create Logins","Admin")} key="5">Create Logins</Menu.Item>
          <Menu.Item key="6"  onClick={()=>this.passprops("Responses","Admin")}> Responses</Menu.Item>
          
        </SubMenu>
       
         
      </Menu>
    </Sider>
    <Layout className="site-layout">
    
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
           
        </Breadcrumb>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 580 }}>
          <ContentDisplay screen={this.state.category} admindetails={this.props.Data} />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  </Layout>
  </>
);
}
}



function ContentDisplay(props){
  let navigate = useNavigate();




  const [UserData,setData] = useState("")
  const [Ids,setIds] =useState([]);
  let Cid = "";
  const  GetData = async ()=>{
    var k = ["hello"];
     const token = await  localStorage.getItem("token")
   fetch('http://192.168.55.107:5000/getposts?id='+props.admindetails.CollegeId,{
   headers:new Headers({
     Authorization:"Bearer "+token
   })
   }).then(res=>res.json())
   .then(data=>{ 
   
     Cid=data.CollegeId;
     
     setData(data);
      console.log(data);
      const items = Object.values(data);
      let keys =Object.keys(data)
       
      const  ids = data.map((number) => number.PostId);
     
        setIds(ids)
      
   }
   )
   console.log(CollId);
  }
useEffect(()=>{
 
  GetData();

},[])
  

  const  logout =()=>{
       localStorage.removeItem("token") 
        navigate('/Login')
      
    }
  
   if(props.screen==="Responses"){
            return(
  
                    <div>
                      <StudentsRespones  id={props.admindetails.CollegeId} kk={Ids}/>
                    </div>

              )
    }
    if(props.screen==="Create Logins"){
        return(

                <div>
                  

                                    
                   <CreateStudentsLogins id={props.admindetails.CollegeId}/>
              
                </div>

        )

       
    }

    if(props.screen==="Home"){
        return(

                 <div>
                    <DashBoardDetails  id={props.admindetails.CollegeId}/>
                 </div>
        )

       
    }

console.log("userloged = ",props.admindetails)
    if(props.screen==="Profile"){
        return(

                 <div  >
                      <h1>{props.admindetails.Name}</h1>
                      <h1>{props.admindetails.email}</h1>
                      <h1>{props.admindetails.CollegeId}</h1>
                      <h1>{props.admindetails.PhoneNumber}</h1>
                      <button onClick={logout}>logout</button>
                 </div>

        )
    }

    if(props.screen==="Create Posts"){
      return(

              <CreatePosts id={props.admindetails.CollegeId} kk={Ids}/>

      )
  }

  if(props.screen==="My Posts"){
    return(

            <MyPosts id={props.admindetails.CollegeId} kk={Ids}/>

    )
}
     
}

export default DashBoard;