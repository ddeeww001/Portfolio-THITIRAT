
import {BrowserRouter, Routes, Route, Link} from "react-router-dom"
import './App.css'
import Experience from './frontend/showExperience'
import { Profile,myDetailsData} from './frontend/Personal'
import Home from './frontend/Home.tsx'
import profileImg from './picture/profile.jpg'
const Navbar=()=>{
  return(
    <div className="navbar">
    <nav>
   
   <Link to ="/" >Home</Link>
    <Link to ="/Experience" >Experience</Link>
    <Link to ="/Profile">Profile</Link>

    
    <Link to="/profileImg">
     <img alt="ddeeww_o_o" 
     src={profileImg}  
     className="navbar-profile-pic"/>
     </Link>
     

    </nav>
    </div>
  );
};
function App() {
  

  return (
    <>
     <BrowserRouter>

     <div className='navebar'>
      <Navbar/>
      
      <div className="content-area">
      {/*เนื้อหาจะเปลี้ยนไปตาม url */}
      <Routes>
        {/* สำหรับการแสดงรูป */}
        <Route path='/profileImg' 
        element={
        <img 
        src={profileImg} 
        className="navbar-profile"
        />
        }/>
        <Route path='/' element={<Home/>}/>
        <Route path='/Experience' element={<Experience/>}/>
        <Route path='/Profile' element={<Profile data={myDetailsData}/>}/>

        


      </Routes>
      </div>
      <div className="body">
        <h1></h1>
      </div>




     </div>

     </BrowserRouter>
    </>
  )
}

export default App
