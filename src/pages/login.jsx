import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    // state
 const [loginData, setLoginData] = useState({
    phoneNumber : '',
    password : '',
 });
 const [loginError, setLoginError] = useState({
    phoneNumber: '',
    password: '',
 });

 const navigate = useNavigate();


    // comportement
    const handleChange = (event) => {
        const {name, value} = event.target;
        setLoginData({
            ...loginData,
             [name] : value
        });
        setLoginError({...loginError, [name]: "",});
    }
    const handleSubmit = async(event) => {
        event.preventDefault();
        let tmpErrors = {};
        if(loginData.phoneNumber.length !== 10) {
            tmpErrors.phoneNumber = "This user doesn't exist !"
        }
        try {
            const response = await fetch(`http://localhost:3001/users?phoneNumber=${loginData.phoneNumber}`);
            const users = await response.json();

            if(users.length === 0) {
                tmpErrors.phoneNumber = "This user doesn't exist";
                setLoginError(tmpErrors);
                return;
            }
            const user = users[0];
            if(user.password !== loginData.password) {
                tmpErrors.password = "The password is incorrect";
                setLoginError(tmpErrors);
                return;
            }
            
            localStorage.setItem("currentUser", JSON.stringify(user));
            alert("Login succesful!");

            navigate("/dashboard");
        }
        catch (error) {
            console.error("Error during login:", error);
            
        }
        
        

    }

    // affichage
    const loginForm = 
    <form action="submit" onSubmit={handleSubmit} className="login-form">
        <label htmlFor="phoneNumber">Phone Number : {loginError.phoneNumber && <p className="errors-message">{loginError.phoneNumber}</p>} </label>
        <input type="text" placeholder="Your Phone Number..." name="phoneNumber" value={loginData.phoneNumber} onChange={handleChange}/>

        <label htmlFor="password">Password : {loginError.password && <p className="errors-message">{loginError.password}</p>} </label>
        <input type="password" placeholder="Your Password..." name="password" value={loginData.password} onChange={handleChange}/>

        <button type="submit">Login</button>
    </form>
    
    return <div className="login-container">
        <h2>Login</h2>
        {loginForm}
    </div>
}

export default Login;