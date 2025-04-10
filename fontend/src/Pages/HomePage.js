import axios from 'axios';
import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { Link } from 'react-router-dom'

const HomePage = () => {
    const socket = io(`https://socket-io-6tt7.onrender.com/`);

    const [liveUser, setLiveUser] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState([]);
    const gettingUser = async () => {
        try {
            const { data } = await axios.get(`https://socket-io-6tt7.onrender.com/api/v1/auth/get`);
            if (data?.success) {
                setUsers(data?.user);

            }
        } catch (error) {
            alert(error?.responce?.data?.mesage);
        }
    }
    const gettingLiveUser = async () => {
        try {
            const { data } = await axios.get(`https://socket-io-6tt7.onrender.com/api/v1/auth/getLiveUser`)
            socket.emit("live_users", data?.user);
            setLiveUser(data?.user);
        } catch (error) {
            alert(error?.responce?.data?.message);
        }
    }

    const fetchUserDetails = async (email) => {
        try {
            const { data } = await axios.get(`https://socket-io-6tt7.onrender.com/api/v1/auth/user/${email}`)
            socket.emit("joinRoom", data?.user);
            setSelectedUser(data?.user);
        } catch (error) {
            alert(error?.responce?.data?.message);
        }
    }
    const deleteSocket = (id) => {
        socket.emit("disconnect", (s)=> {
            console.log(s)
        })
    }
    useEffect(() => {
        gettingUser();
        gettingLiveUser();
        socket.emit("live_users", users).on("updateUsers", (updatedUsers) => {
            setLiveUser(updatedUsers)
        });

        // eslint-disable-next-line
    }, [])

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-12'>
                    <Link to={`/create`} className="btn btn-primary" >Add User</Link>
                    <h1 className='text-center'>User List</h1>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Mobile Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u, i) => (


                                <tr key={i}>
                                    {console.log(u)}
                                    <th scope="row">{i + 1}</th>
                                    <td>{u.fristName + " " + u.lastName}</td>
                                    <td onClick={() => fetchUserDetails(u.email)} style={{ cursor: "pointer" }}>{u.email}</td>
                                    <td>{u.mobileNo}</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>

                <div>
                    <h2>Live Users</h2>
                    <ul>
                        {liveUser.map((user) => (
                            <li key={user.socketId} onClick={() => fetchUserDetails(user.email)} style={{ cursor: "pointer" }}>
                                {user.fristName} ({user.email})
                            </li>
                        ))}
                    </ul>

                    {selectedUser && (
                        <div style={{ border: "1px solid black", padding: "10px", marginTop: "10px" }}>
                            <h3>User Details</h3>
                            <p><strong>Name:</strong> {selectedUser.fristName + " " + selectedUser.lastName}</p>
                            <p><strong>Email:</strong> {selectedUser.email}</p>
                            <p><strong>Socket ID:</strong> {selectedUser.socketId}</p>
                            <button onClick={() => deleteSocket(selectedUser.socketId)}>Close</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default HomePage