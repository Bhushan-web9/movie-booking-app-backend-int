import "./Header.css";
import React, { useState ,useContext} from "react";
import logo from "./logo.svg";
import { Button } from "@material-ui/core";
import LoginSingup from "../../screens/Modal/LoginSingup";
import { changeContext } from "../../contexApi/changeContex";
import axios from "axios";
const Header =()=> {
    
    const {isLoggedIn,setIsLoggedIn,setIsOpenModal}=useContext(changeContext);
    const handleLogin=()=>{
        setIsOpenModal(isOpenModal=>!isOpenModal)
        }
    const handleLogout= ()=>{
      let _id=sessionStorage.getItem("_id");
      axios.post("http://localhost:8085/api/logout",{_id})
      .then((res)=>console.log("logout",res))
      sessionStorage.removeItem("_id");
      sessionStorage.removeItem("access-token");
      setIsLoggedIn(isLoggedIn=>!isLoggedIn);
    }
    return (
        <>
      <div className="header header-flex">
        <img src={logo} className="headerLogo" alt="Logo"></img>
        <div>
        {isLoggedIn && isLoggedIn?( <Button variant="contained" color="primary" onClick={()=>handleLogout()}>
          Logout
        </Button>):( <Button variant="contained" color="primary" onClick={()=>handleLogin()}>
          Login
        </Button>)}
        </div>
      </div>
      <LoginSingup />
      </>
    );
}
export default Header;
