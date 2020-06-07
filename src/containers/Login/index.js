import React, { useState, useContext } from "react";
import { useForm } from "../../hooks";
import { Form, Button } from "semantic-ui-react";
import { RootContext } from "../../context/RootContext";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

function Login() {
  let history = useHistory();

  const [errors, setErrors] = useState({});
  const initialState = {
    email: "",
    password: "",
  };

  const { isLoading, setCurrentUser, setAuthToken } = useContext(RootContext);

  const loginUser = () => {
    axios
      .post("/api/users/login", {
        email: values.email,
        password: values.password,
      })
      .then((res) => {
        const { token } = res.data;
        localStorage.setItem("auth", token);
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        localStorage.setItem("user", decoded);
        // Set current user
        // console.log("Decoded User => ", decoded);
        setCurrentUser(decoded);
        history.push("/");
      })
      .catch((err) => {
        console.log("Errors => ", err.response);
      });
  };

  const { onChange, onSubmit, values } = useForm(loginUser, initialState);

  return (
    <div className="login-div">
      <Form onSubmit={onSubmit} noValidate>
        <h1>Login</h1>
        <Form.Input
          label="Email"
          placeholder="Email..."
          name="email"
          error={errors.email ? true : false}
          value={values.email}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password..."
          name="password"
          error={errors.password ? true : false}
          type="password"
          value={values.password}
          onChange={onChange}
        />
        <Button type="submit" primary style={{ width: "100%" }}>
          Login
        </Button>
        <div style={{ padding: "10px", textAlign: "center" }}>
          <Link to="/register">Sign Up</Link>
        </div>
      </Form>
    </div>
  );
}

export default Login;
