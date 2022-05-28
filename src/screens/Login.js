/* eslint-disable no-unused-vars */
import React,{useEffect,useState} from 'react'
import Lodi from '../images/95530-password.json'
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import {
  NavLink
} from "react-router-dom";
import { Button } from 'antd';
import {useNavigate} from "react-router-dom";
function Login() {
  let navigate = useNavigate();

  const detectLogin= async ()=>{
    const token =   localStorage.getItem('token')
        if(token){
          navigate('/DashBoard');
        }
        else{
          setScreen(0);
        }
        
        
  }
  useEffect(()=>{
    detectLogin();
},[])



  const [email,setEmail] = useState('');
const [password,setPassword]=useState('')


const sendCred = async (props)=>{
fetch("http://192.168.55.107:5000/Adminsignin",{
  method:"POST",
  headers: {
   'Content-Type': 'application/json'
 },
 body:JSON.stringify({
   "email":email,
   "password":password
 })
})
.then(res=>res.json())
.then(async (data)=>{
       try {
          localStorage.setItem('token',data.token)
          console.log("loged")
          navigate('/DashBoard');
       } catch (e) {
         console.log("error hai",e)
          
       }
})
}
const [Screen,setScreen] = useState(1);
  return (
    <div   class="row"  >

      <div  >
      <Player
                    autoplay
                    loop
                    src={Lodi}
                    style={{ height: '300px', width: '300px' }}
                >
                   
                </Player>
      </div>


    <div class="container-fluid" style={{width:'80%'}}>
		<div class="row main-content bg-success text-center">
          <div class="col-md-4 text-center company__info">
            <span class="company__logo"><h2><span class="fa fa-android"></span></h2></span>
            <h4 class="company_title">Placements</h4>
          </div>
			<div class="col-md-8 col-xs-12 col-sm-12 login_form ">
				<div class="container-fluid">
              <div class="row">
                <h2>Log In</h2>
              </div>
              <div class="row">
                    <form control="" class="form-group">
                      <div class="row">
                        <input type="text" name="username" id="username" class="form__input" placeholder="Username" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                      </div>
                      <div class="row">
                        <span class="fa fa-lock"></span> 
                        <input type="password" name="password" id="password" class="form__input" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                      </div>
                      <div class="row">
                        <input type="checkbox" name="remember_me" id="remember_me" class="" />
                        <label for="remember_me">Remember Me!</label>
                      </div>
                      <div class="row">
                      
                      </div>
                    </form>
                    <button class="btn btn-success" onClick={sendCred}>submit</button>
              </div>
					 
				</div>
			</div>
		</div>
	</div>
 
 
    </div>
  )
}

export default Login;