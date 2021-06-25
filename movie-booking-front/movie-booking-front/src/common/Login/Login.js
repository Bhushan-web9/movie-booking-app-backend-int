import { React, useState,useContext } from "react";
import {
  Grid,
  TextField,
  Button,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import axios from "axios";
import { changeContext } from "../../contexApi/changeContex";
const Login = () => {
  const paperStyle = {
    height: 'auto',
    width: 300,
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    margin: "21px auto"
  };
  const btnstyle = {display: "block",width:'106px',marginTop:'47px' };
  const [reqUserName, setReqUserName] = useState("dispNone");
  const [reqPassword, setReqPassword] = useState("dispNone");
  const [state, setState] = useState({
    username: "",
    password: "",
  });
  const {isLoggedIn,isOpenModal,setIsLoggedIn,setIsOpenModal,userName,setUserName}=useContext(changeContext);

  const handleChange = (key, value) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  const handleSignIn = () => {

    state.password === ""
      ? setReqPassword("dispBlock")
      : setReqPassword("dispNone");
    state.username === ""
      ? setReqUserName("dispBlock")
      : setReqUserName("dispNone");

    if (state.password === "" || state.username === "") {
      return;
    }
    axios.post("http://localhost:8085/api/auth/login",state)
      .then((res)=>{
        console.log("Login response",res.headers['access-token'])
        sessionStorage.setItem("access-token", res.headers['access-token'])
        sessionStorage.setItem('_id',res.data._id);
        setIsLoggedIn(true);
        // setIsLoggedIn(res.data.isLoggedIn)
      setIsLoggedIn(true);

        setIsOpenModal(false);
      }).catch((err)=>console.log("Login Error",{err}))
  };
  return (
    <Grid style={paperStyle}>
      <FormControl style={{marginBottom:'30px'}}>
        <TextField
          label="Username"
          placeholder="Enter username"
          required
          value={state.username}
          onChange={(e) => handleChange("username", e.target.value)}
        />
        <FormHelperText className={reqUserName}>
          <span className="red">Required</span>
        </FormHelperText>
      </FormControl>
      <FormControl>
        <TextField
          label="Password"
          placeholder="Enter password"
          type="password"
          required
          value={state.password}
          onChange={(e) => handleChange("password", e.target.value)}
        />
        <FormHelperText className={reqPassword}>
          <span className="red">Required</span>
        </FormHelperText>
      </FormControl>
      <Button
        type="submit"
        color="primary"
        variant="contained"
        style={btnstyle}
        fullWidth
        onClick={handleSignIn}
      >
        LOGIN
      </Button>
    </Grid>
  );
};

export default Login;
