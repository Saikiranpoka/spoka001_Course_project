import React from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import "./SignUpPage.css"
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";


function SignUpPage() {
   
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = async () => {
        try {
            const response = await fetch("http://localhost:5000/register", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ username,email, password,address,dateOfBirth }),
            });
        
            if (!response.ok) {
              const errorMessage = await response.text();
              throw new Error(`SingUp failed: ${errorMessage}`);
            }
        
            const responseText = await response.text();
            console.log("SignUp successful:", responseText);
            alert("SignUp successful Waiting for Approval")
            navigate("/")
        
        
          } catch (error) {
            setError(true)
            // Handle login failure, display an error message, etc.
            console.error("Login error:", error);
          }
        };
        
      const  handleGoBack = ()=>{navigate("/")}

 
  return (
    <body>
      <div className='heading'>
        <Typography variant="overline" className='heading' color="Blue" style={{ fontFamily: 'Roboto', fontSize: '4rem' }}>
          Welcome to Course Advising Portal
        </Typography>
      </div>
      <div className='updateProfileBody'>
        <div className='updateProfileArea'>
          <h3 >Create Your  Account </h3>
          <TextField id="usernamename" label="Name" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)} />
          <TextField id="email" label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField id="password" label="Password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} />
         
          <TextField id="dateOfBirth" type="date"  variant="outlined" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
          <TextField id="address" label="Address" variant="outlined" value={address} onChange={(e) => setAddress(e.target.value)} />
         
          <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
          <button type="button" onClick={handleGoBack}>
                  Back
                  </button>
                  {error && <span>Entered Email is Already Registered try Login</span>}
        </div>
        
    
      </div>
    </body>
  );
}

export default SignUpPage;
