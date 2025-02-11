import React, { useState } from 'react';

const Signup = () => {

    // state
  const [users, setUsers] = useState({
     firstName : '',
     lastName : '',
     serviceCenter : '',
     phoneNumber: '',
     password: '',
     repPassword: ''
    });
 
  const [errors, setErrors] = useState({
     firstName : '',
     lastName: '',
     serviceCenter: '',
     phoneNumber: '',
     password: '',
     repPassword: ''
    });
  const [touched, setTouched] = useState({}); // state pour champ touché
 
   //  const [succesMessage, setSuccesMessage] = useState(null);
 //
 
    // comportement

    //validation en temps réel
  const validate = (name, value) => {
    let error = "";
    if(name === 'firstName') {
      if (value.length < 3 || value.length > 15) {
        error = "Minimum 3, maximum 15 letters !";
      }
    }
    
    if(name === 'lastName') {
      if (value.length < 3 || value.length > 15) {
        error = "Minimum 3, maximum 15 letters !";
      }
    }
    if (name === "serviceCenter") {
      if (value.length < 2) {
        error = "Wrong service center";
      }
    }

    if (name === "phoneNumber") {
      if (value.length !== 10) {
        error = "Wrong number !";
      }
    }

    if (name === "password") {
      if (value.length < 4) {
        error = "Minimum 4 letters !";
      }
    }

    if (name === "repPassword") {
      if (value !== users.password && value.length > 1) {
        error = "The password isn't correct !";
      }
    }
    return error;
  }

  const handleChange = (event) => {
    const {name, value} = event.target;
    setUsers((prevUsers) => ({
      ...prevUsers,
      [name] : value
    }));
    //mise à jour des erreurs en temps réels
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validate(name,value)
    }))
  }

    // détecter quand un champ est touché
    const handleBlur = (event) => {
      const {name} = event.target;
      setTouched((prevTouched) => ({
        ...prevTouched,
        [name]: true
      }));
    }
    const showError = (field) => touched[field] && errors[field];




 const handleSubmit = async (event) => {
   event.preventDefault();
   
   //affichage des messages d'erreurs
   let tmpErrors = {};
   if(users.firstName.length<3 || users.firstName.length > 15) {
     tmpErrors.firstName = "minimum 3, maximum 15 letters !";
   }
   if(users.lastName.length <3 || users.lastName.length > 15) {
     tmpErrors.lastName = "errors !";
   }
   if(users.serviceCenter.length <2) {
    tmpErrors.serviceCenter = "wrong service center";
   }
   if(users.phoneNumber.length !== 10) {
     tmpErrors.phoneNumber = "wrong number !";
   }
   if(users.password.length < 4) {
     tmpErrors.password = "minimum 4 letters !";
   }
   else if(users.repPassword !== users.password && users.repPassword.length>1) {
     tmpErrors.repPassword = "the password isn't correct !";
   }
 
   setErrors(tmpErrors);
 
   if(Object.keys(tmpErrors).length === 0) {
     console.log("tout est ok pour submit");
 
     try {
       const response = await fetch (`http://localhost:3001/users?phoneNumber=${users.phoneNumber}`);
       const existingUsers = await response.json();
       if (existingUsers.length > 0) {
         alert("This user already exists!");
       } 
       else {
         const newUserInfos = {
           id: Date.now(),
           firstName: users.firstName,
           lastName : users.lastName,
           serviceCenter : users.serviceCenter,
           phoneNumber: users.phoneNumber,
           password: users.password
         }
         console.log(newUserInfos);
 
         await fetch("http://localhost:3001/users", {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
           },
           body : JSON.stringify(newUserInfos),
         });
         alert("Registration successful!");
         setUsers({
          firstName : '',
          lastName : '',
          serviceCenter : '',
          phoneNumber: '',
          password: '',
          repPassword: ''
         });
       }
     }
     catch (error) {
       console.error("Error:", error);
       alert("An error occurred. Please try again.");
     }
  }
 };
 

 
    const usersForm = (
     <form action="submit" onSubmit={handleSubmit} className="sign-up-infos">
 
       <label htmlFor="firstName">First Name : {errors.firstName && <p className="errors-message">{errors.firstName}</p>}</label> 
       <input type="text" placeholder="Your first name..." name="firstName" value={users.firstName} onChange={handleChange} onBlur={handleBlur}/>
 
       <label htmlFor="lastName">Last Name : {errors.lastName && <p className="errors-message">{errors.lastName}</p>}</label> 
       <input type="text" placeholder="Your last name..." name="lastName" value={users.lastName} onChange={handleChange} onBlur={handleBlur}/>

       <label htmlFor="serviceCenter">Service Center : {errors.serviceCenter && <p className="errors-message">{errors.serviceCenter}</p>}</label> 
       <input type="text" placeholder="Your service center ..." name="serviceCenter" value={users.serviceCenter} onChange={handleChange} onBlur={handleBlur}/>
 
       <label htmlFor="phoneNumber">Phone number : {errors.phoneNumber && <p className="errors-message">{errors.phoneNumber}</p>}</label> 
       <input type="text" placeholder="Your phone number..." name="phoneNumber" value={users.phoneNumber} onChange={handleChange} onBlur={handleBlur}/>
 
       <label htmlFor="password">Password : {errors.password && <p className="errors-message">{errors.password}</p>}</label> 
       <input type="password"  name="password" value={users.password} onChange={handleChange} onBlur={handleBlur}/>
 
       <label htmlFor="repPassword">Repeat password : {errors.repPassword && <p className="errors-message">{errors.repPassword}</p>}</label> 
       <input type="password"  name="repPassword" value={users.repPassword} onChange={handleChange} onBlur={handleBlur}/>
 
       <button type="submit">Register</button>
     </form>
    );
 
   
   
   
     return (
       <div className='signup-container'>
         <h2>Register</h2>
         {usersForm}
       </div>
     );
};

export default Signup;
