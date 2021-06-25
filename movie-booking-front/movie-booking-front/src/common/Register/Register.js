import { FormHelperText, FormControl } from "@material-ui/core";
import { Grid, TextField, Button } from "@material-ui/core";
import { React, useState } from "react";
import axios from "axios";
const Register = () => {
  const [reqFirstName, setReqFirstName] = useState("dispNone");
  const [reqLastName, setReqLastName] = useState("dispNone");
  const [reqEmail, setReqEmail] = useState("dispNone");
  const [reqPassword, setReqPassword] = useState("dispNone");
  const [reqContact, setReqContact] = useState("dispNone");
  const [success, setSuccess] = useState("");
  const [state, setState] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    contact: "",
  });
  const gridStyle = {
    margin: "19px auto",
    width: 300,
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
  };
  const handleRegister = () => {
    state.first_name === ""
      ? setReqFirstName("dispBlock")
      : setReqFirstName("dispNone");
    state.last_name === ""
      ? setReqLastName("dispBlock")
      : setReqLastName("dispNone");
    state.email === "" ? setReqEmail("dispBlock") : setReqEmail("dispNone");
    state.password === ""
      ? setReqPassword("dispBlock")
      : setReqPassword("dispNone");
    state.contact === ""
      ? setReqContact("dispBlock")
      : setReqContact("dispNone");

    if (
      state.first_name === "" ||
      state.last_name === "" ||
      state.email === "" ||
      state.password === "" ||
      state.contact === ""
    ) {
      return;
    }

    axios
      .post("http://localhost:8085/api/auth/signup", state)
      .then((res) => setSuccess(res.data.message))
      .catch((err) => console.log({ err }));
  };

  const handleChange = (key, value) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };
  return (
    <div>
      <Grid style={gridStyle}>
        <FormControl required className="formControl" style={{marginBottom:'11px'}}>
          <TextField
            label="First Name"
            placeholder="First Name"
            required
            value={state.first_name}
            onChange={(e) => handleChange("first_name", e.target.value)}
          />
          <FormHelperText className={reqFirstName}>
            <span className="red">Required</span>
          </FormHelperText>
        </FormControl>
        <FormControl required className="formControl" style={{marginBottom:'11px'}}>
          <TextField
            label="Last Name"
            value={state.last_name}
            onChange={(e) => handleChange("last_name", e.target.value)}
          />
          <FormHelperText className={reqLastName} style={{marginBottom:'11px'}}>
            <span className="red">Required</span>
          </FormHelperText>
        </FormControl>
        <FormControl required className="formControl" style={{marginBottom:'11px'}}>
          <TextField
            label="Email"
            type="email"
            value={state.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          <FormHelperText className={reqEmail}>
            <span className="red">Required</span>
          </FormHelperText>
        </FormControl>
        <FormControl required className="formControl" style={{marginBottom:'11px'}}>
          <TextField
            label="Password"
            type="password"
            value={state.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />
          <FormHelperText className={reqPassword}>
            <span className="red">Required</span>
          </FormHelperText>
        </FormControl>
        <FormControl required className="formControl" style={{marginBottom:'25px'}}>
          <TextField
            label="Contact No."
            value={state.contact}
            onChange={(e) => handleChange("contact", e.target.value)}
          />
          <FormHelperText className={reqContact}>
            <span className="red">Required</span>
          </FormHelperText>
        </FormControl>
        {success.length === 0 ? (
          ""
        ) : (
          <FormControl
            style={{
              display: "block",
              width: "100%",
              margin: "0 auto",
              textAlign: "center",
              padding: "2%",
            }}
          >
            <div>{success}</div>
          </FormControl>
        )}
        <Button
          type="submit"
          color="primary"
          variant="contained"
          onClick={handleRegister}
          style={{marginTop:'28px'}}
        >
          REGISTER
        </Button>
      </Grid>
    </div>
  );
};

export default Register;
