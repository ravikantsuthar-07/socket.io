import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const CreateUserPage = () => {

  const [fristName, setFristName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const handleUser = async (e) => {
    e.preventDefault()
    try {

      const { data } = await axios.post(`https://socket-io-6tt7.onrender.com/api/v1/auth/create`, { fristName, lastName, mobileNo, email, street, city, state, country, loginId, password })
      if (data?.success) {
        alert(data.message)
        navigate(`/login`)
      } else {
        alert(data?.message)
      }

    } catch (error) {
      console.log(error);
      alert(error?.message);
    }
  }
  return (
    <>
      <div class="container mt-5">
        <div class="row">
          <div class="col-md-6">
            <h2>User Registrations</h2>
            <form method='post' onSubmit={handleUser}>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Frist Name</label>
                <input type="text" class="form-control" name="fristName" id="fristname" onChange={(e) => { setFristName(e.target.value) }} />
              </div>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Last Name</label>
                <input type="text" class="form-control" name="lastName" id="lastname" onChange={(e) => setLastName(e.target.value)} />
              </div>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Mobile Number</label>
                <input type="text" class="form-control" name="mobileNo" id="mobileNo" onChange={(e) => setMobileNo(e.target.value)} />
              </div>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input type="email" class="form-control" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Street</label>
                    <input type="text" class="form-control" name="street" id="street" onChange={(e) => setStreet(e.target.value)} />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">City</label>
                    <input type="text" class="form-control" name="city" id="city" onChange={(e) => setCity(e.target.value)} />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">State</label>
                    <input type="text" class="form-control" name="state" id="state" onChange={(e) => setState(e.target.value)} />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Country</label>
                    <input type="text" class="form-control" name="country" id="country" onChange={(e) => setCountry(e.target.value)} />
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Login Id</label>
                <input type="text" class="form-control" name="loginId" id="loginId" onChange={(e) => setLoginId(e.target.value)} />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" class="form-control" name="password" id="password" onChange={(e) => setPassword(e.target.value)} />
              </div>
              <button type="submit" class="btn btn-primary">Save</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateUserPage