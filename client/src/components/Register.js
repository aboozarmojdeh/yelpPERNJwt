import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./register.css";
import signUp from "../img/signUp.png";
const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
  });
  const { email, password, name } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    console.log(e.target.value);
    console.log("input:", inputs);
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password, name };
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();
      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        console.log(parseRes);
        toast.success("Registered successfully!");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <Fragment>
      <ul class="nav justify-content-end my-3">
         
          <li class="nav-item">
            <a class="nav-link btn btn-outline-primary" aria-current="page" href="/">
              Home
            </a>
          </li>
        </ul>

      <div class="imgcontainer text-center my-3">
        <img src={signUp} alt="Sign-up" width="350" height="250" />
      </div>

      <form onSubmit={onSubmitForm}>
        <input
          className="form-control my-3"
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => onChange(e)}
        />
        <input
          className="form-control my-3"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => onChange(e)}
        />
        <input
          className="form-control my-3"
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e) => onChange(e)}
        />

        <button className="btn btn-success register-btn">Submit</button>
      </form>
      <Link to={"/login"}>Login</Link>
    </Fragment>
  );
};

export default Register;
