import React, { useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
  const [credenditals, setCredenditals] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/api/creatuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name:credenditals.name,email:credenditals.email,password:credenditals.password,location:credenditals.geolocation}),
    });

    const jsondata = await response.json();
    console.log(jsondata)
    if(!jsondata.success){
        alert("Enter valid Credentials")
       

    }
  };

  const onChangefun = (event) =>{
    setCredenditals({...credenditals,[event.target.name]:event.target.value})
  }

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={credenditals.name}
              onChange={onChangefun}
            />
          </div>
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

          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="geolocation"
              value={credenditals.geolocation}
              onChange={onChangefun}
            />
          </div>


          <button type="submit" className="m-3 btn btn-success">
            Submit
          </button>
          <Link to="/login" className="m-3 btn btn-danger">
            Already a User !
          </Link>
        </form>
      </div>
    </>
  );
}

export default Signup;
