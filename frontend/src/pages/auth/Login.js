import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import {useAuth} from "../../context/auth";
import { useNavigate } from 'react-router-dom';

function Login() {
 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [auth,setAuth] =  useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.post('https://backend-7-o9m5.onrender.com/api/login', { email, password });
            console.log(data)
            if (data?.error){
              toast.error(data.error)
            }else{
              localStorage.setItem('auth',JSON.stringify(data));
              setAuth({...auth,token:data.token,user:data.user});
              toast.success("Login successfull");
              navigate('/dashboard/user');
          }
        } catch (err) {
            console.error(err);
            toast.error("Login failed. Please try again.");
        }
       

    };

    return (
      <div>
        
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <form onSubmit={handleSubmit}>
                       
                        <input 
                            type="email" 
                            className="form-control mb-4 p-2" 
                            placeholder="Enter your Email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                        <input 
                            type="password" 
                            className="form-control mb-4 p-2" 
                            placeholder="Enter your Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                        <button className="btn btn-primary" type="submit">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
       
           
        </div>
        </div>
    );
}

export default Login;
