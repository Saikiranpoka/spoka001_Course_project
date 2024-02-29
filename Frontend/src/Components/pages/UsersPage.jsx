import React from 'react';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import "./UserPage.css";
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function UsersPage() {
    const location = useLocation();
    const navigate = useNavigate();
  
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [address, setAddress] = useState('');
    const [username, setUserName] = useState('');
    const [password, setpassword] = useState('');
    const [email, setEmail] = useState(location.state?.email || '');
    const [changePasswordMode, setChangePasswordMode] = useState(false);

    useEffect(() => {
      console.log('Received isAdmin:', location.state?.isAdmin);
    }, [location.state]);
  
    useEffect(() => {
      // Fetch data based on the email
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:5000/get-user-data', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
          });
    
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
    
          const userData = await response.json();
          // Update state with the fetched data
          setDateOfBirth(userData.dateOfBirth);
          setAddress(userData.address);
          setUserName(userData.username);
        } catch (error) {
          console.error('Error fetching user data:', error);
          // Handle error, show a message, etc.
        }
      };
    
      if (email) {
        fetchData();
      }
    }, [email]);
    

  //   const handleChangePassword = async () => {
  //     try {
  //         const response = await fetch("http://localhost:5000/forgot-password", {
  //             method: "POST",
  //             headers: {
  //                 "Content-Type": "application/json",
  //             },
  //             body: JSON.stringify({ email, password }),
  //         });
  
  //         if (!response.ok) {
  //             throw new Error(`Change password failed: ${await response.text()}`);
  //         }
  
  //         console.log("Password changed successfully");
  //         alert("password Changes Successfully U Can Login Now")
  
  //         // Handle success, redirect, or show a success message
  
  //     } catch (error) {
  //         console.error("Change password error:", error);
  //         // Handle change password failure, display an error message, etc.
  //     }
  // };
  const handleChangePassword = async () => {
    try {
      if (!changePasswordMode) {
        // Enable change password mode
        setChangePasswordMode(true);
      } else {
        // Perform password reset
        const response = await fetch('http://localhost:5000/forgot-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          throw new Error(`Change password failed: ${await response.text()}`);
        }

        console.log('Password changed successfully');
        alert('Password Changed Successfully');

        // Disable change password mode after successful reset
        setChangePasswordMode(false);
      }
    } catch (error) {
      console.error('Change password error:', error);
      // Handle change password failure, display an error message, etc.
    }
  };
  
  

   

      const trueAdmin = location.state && location.state.isAdmin;
    
      const  handleGoBack = ()=>{navigate("/")}
      const  handleDashBoard = ()=>{navigate("/dashBoard")}
 
  return (
    <body>
      <div className='heading'>
        <Typography variant="overline" className='heading' color="Blue" style={{ fontFamily: 'Roboto', fontSize: '4rem' }}>
          Welcome to our portal 
        </Typography>
      </div>
      <div className='updateProfileBody'>
        <div className='updateProfileArea'>
          <h3>User Profile</h3>
         <h3>User Name :{username}</h3>
         <h3>Email: {email}</h3>
         <h3>Address: {address}</h3>
         <h3>Date Of Birth : {dateOfBirth}</h3>
         {changePasswordMode ? (
            <div>
              <TextField
                type='password'
                label='New Password'
                variant='outlined'
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>
          ) : null}
          <Button type='button' onClick={handleChangePassword}>
            {changePasswordMode ? 'Reset Password' : 'Change Password'}
          </Button>
        </div>
    
      </div>
      <div>
      <button type="button" onClick={handleGoBack}>
                  Back
                  </button>
      </div>
                  {trueAdmin && (
        <button type="button" onClick={handleDashBoard} >
          Admin DashBoard
        </button>
      )}
      <div>
     
      </div>
    </body>
  );
}

export default UsersPage;
