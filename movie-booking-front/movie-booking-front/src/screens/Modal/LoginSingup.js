import React, { useState, useContext } from "react";
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Login from '../../common/Login/Login';
import Register from '../../common/Register/Register'
import Modal from "react-modal";
import { changeContext } from "../../contexApi/changeContex";
Modal.setAppElement("#root");
const LoginSingup = () => {
  //    const [modalIsOpen, setModalIsOpen] = useState(state);
  const [value,setValue]=useState(0)
  const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    const {isOpenModal,setIsOpenModal}=useContext(changeContext);

    const paperStyle={width:'100%',top:"0",padding:0,boxShadow:'none'}
    const loginStyle= {
      content:{
        width: "400px",
        color: "black",
        margin: "0 auto",
        padding:'0',
        height: '300px'
      }
    }
    const registerSyle={
      content:{
        width: "400px",
        color: "orange",
        margin: "0 auto",
        padding:'0',
        height:'480px'
      }
    }
    function TabPanel(props) {
      const { children, value, index, ...other } = props;
    return (
        <div
          role="tabpanel"
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
          {...other}
        >
          {value === index && (
            <Box>
              <Typography>{children}</Typography>
            </Box>
          )}
        </div>
      );
    }
  return (
    <div>
      <Modal
        isOpen={isOpenModal}
        onRequestClose={() =>{setIsOpenModal(!isOpenModal)}}
        style={value===0?loginStyle:registerSyle}
      >
       
       <Paper style={paperStyle}>
        <Tabs
          value={value}
          indicatorColor="secondary"
          textColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          <Tab label="LOGIN" />
         
          <Tab label="REGISTER" />
        </Tabs>
        <TabPanel value={value} index={0} style={{height:'200px',boxShadow:"none"}}>
       <Login handleChange={handleChange}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <Register/>
      </TabPanel>
      </Paper>
      </Modal>
    </div>
  );
};

export default LoginSingup;
