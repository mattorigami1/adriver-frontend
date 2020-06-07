import React, { useContext, useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { RootContext } from "../../context/RootContext";
import { useForm } from "../../hooks";
import { Link } from "react-router-dom";
import Axios from "axios";

function Register() {
  const [errors, setErrors] = useState({});
  const initialState = {
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
  };
  const { isLoading } = useContext(RootContext);

  const registerUser = () => {
    const Obj = {
      name: values.username,
      password: values.password,
      email: values.email,
      password2: values.confirmPassword,
    };
    console.log("Obj => ", Obj);
    Axios.post("/api/users/register", Obj)
      .then((res) => {
        alert("Register Successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const { onChange, onSubmit, values } = useForm(registerUser, initialState);

  return (
    <div className="login-div">
      <Form
        onSubmit={onSubmit}
        noValidate
        className={isLoading ? "loading" : ""}
      >
        <h1>Register</h1>
        <Form.Input
          label="Username"
          placeholder="Username..."
          name="username"
          error={errors.username ? true : false}
          value={values.username}
          onChange={onChange}
        />
        <Form.Input
          label="Email"
          placeholder="Email..."
          name="email"
          error={errors.email ? true : false}
          type="email"
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
        <Form.Input
          label="Confirm password"
          placeholder="Confirm Password..."
          name="confirmPassword"
          error={errors.confirmPassword ? true : false}
          type="password"
          value={values.confirmPassword}
          onChange={onChange}
        />
        <Button type="submit" primary style={{ width: "100%" }}>
          Register
        </Button>
        <div style={{ padding: "10px", textAlign: "center" }}>
          <Link to="/login">Login</Link>
        </div>
      </Form>
    </div>
  );
}

export default Register;
