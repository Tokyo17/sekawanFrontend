import { gql, useLazyQuery } from '@apollo/client';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const GET_USER=gql`
query MyQuery($password: String = "", $email: String = "") {
    user(where: {password: {_eq: $password}, email: {_eq: $email}}) {
      name
      url
    }
  }
  `

const Login = ({dataLogin,setDataLogin}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('' );
    const navigate = useNavigate()

    const [get_user,{data,loading}]=useLazyQuery(GET_USER,{
        onCompleted:()=>{
            if(data?.user[0]){
                setDataLogin({
                    name:data?.user[0].name,
                    url:data?.user[0].url
                })
                navigate(`/home`)
            }
        }
    })

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const validateForm = () => {
        let passwordError = '';
        if (password.length < 8) {
            passwordError = 'Password must be at least 8 characters long';
        }

        if ( passwordError) {
            setErrors( passwordError );
            return false;
        }

        setErrors( '' );
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            get_user({
                variables:{
                    email:email,
                    password:password
                }
            })
            console.log('Form submitted with:', email,password );
            // navigate(`/home`)
        }
    };

    return (
        <div style={{ border: "1px solid", display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
            <form className="border-login" onSubmit={handleSubmit}>
                <div className="center">
                    <div className="header-login-text">Log In to Dashboard</div>
                    <div className='header-login-caption'>Enter your email and password below</div>
                </div>
                <div className="email-input">
                    <div>Email : </div>
                    <input 
                        type="email" 
                        placeholder="Youremail@gmail.com" 
                        value={email} 
                        onChange={handleEmailChange} 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required 
                    />
                </div>
                <div className="password-input">
                    <div>Password : </div>
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={handlePasswordChange} 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required 
                    />
                    {errors && <div style={{ color: 'red',marginTop:"5px" }}>{errors}</div>}
                </div>
                <button type="submit" className="button-login">Log In</button>
            </form>
        </div>
    );
};

export default Login;
