import logo from './logo.svg';
import './App.css';
import {
  useNavigate ,
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
 
import Loading from './screens/Loading'
 
import DashBoard from './screens/DashBoard';
 
import Login from './screens/Login';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      

 
          
          <Route path="/" element={<Loading />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/DashBoard" element={<DashBoard />} />
         
         
    </Routes>
  </BrowserRouter>
  );
}

export default App;
