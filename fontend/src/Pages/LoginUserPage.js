import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/auth.js'
import { io } from 'socket.io-client';

const LoginUserPage = () => {
  const socket = io(`https://socket-io-6tt7.onrender.com/`);

  const [auth, setAuth] = useAuth()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const handleUser = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(`https://vercel-deployment-backend.onrender.com/api/v1/auth/login`, { email, password })
      if (data?.success) {
        socket.on('joinRoom', {email})
        setAuth({
          ...auth,
          user: data?.user,
          token: data?.token
        })
        alert(data.message);
        navigate(`/`);
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
            <h2>User Login</h2>
            <form method='post' onSubmit={handleUser}>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input type="email" class="form-control" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" class="form-control" name="password" id="password" onChange={(e) => setPassword(e.target.value)} />
              </div>
              <button type="submit" class="btn btn-primary">Login</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginUserPage