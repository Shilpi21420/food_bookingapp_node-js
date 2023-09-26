import React, { useState } from "react";
import { Link , useNavigate} from "react-router-dom";

function Login() {
  const [credenditals, setCredenditals] = useState({
    email: "",
    password: "",
  });

  let history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credenditals.email,
        password: credenditals.password,
      }),
    });

    const jsondata = await response.json();
    console.log(jsondata);
    if (!jsondata.success) {
      alert("Enter valid Credentials");
      
    }
    if (jsondata.success) {
      localStorage.setItem("userEmail",credenditals.email);
      
      localStorage.setItem("authToken",jsondata.authToken);
      console.log(localStorage.getItem("authToken"));
      history('/');
      
    }
    
  };

  const onChangefun = (event) => {
    setCredenditals({
      ...credenditals,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              name="email"
              value={credenditals.email}
              onChange={onChangefun}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={credenditals.password}
              onChange={onChangefun}
            />
          </div>

          <button type="submit" className="m-3 btn btn-success">
            Submit
          </button>
          <Link to="/creatuser" className="m-3 btn btn-danger">
            I am a new User!
          </Link>
        </form>
      </div>
    </>
  );
}

export default Login;
