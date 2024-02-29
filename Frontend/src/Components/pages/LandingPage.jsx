import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import OtpVerificationPopup from "./OtpVerificationPopup";

const LandingPage = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isadmin, setIsAdmin] = useState(false);


  const handleSendOtp = async () => {
    try {
      const response = await fetch("http://localhost:5000/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const responseData = await response.json();

      if (response.ok && responseData.message === 'OTP sent successfully') {
        console.log(responseData.message);
        alert('OTP sent successfully');
      } else {
        console.error('Invalid response:', responseData);
        alert('Failed to send OTP');
      }
    } catch (error) {
      console.error("Send OTP error:", error.message);
      alert('Failed to send OTP');
    }
  };

  // const handleLogin = async () => {
  //   try {
  //     const response = await fetch("http://localhost:5000/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email, password }),
  //     });

  //     if (!response.ok) {
  //       const errorMessage = await response.text();
  //       throw new Error(`Login failed: ${errorMessage}`);
  //     }

  //     const user = await response.json();

  //     // Call the new route to check if the user is an admin
  //     const adminResponse = await fetch("http://localhost:5000/check-admin", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email }),
  //     });

  //     if (!adminResponse.ok) {
  //       throw new Error('Failed to check admin status');
  //     }

  //     const { isAdmin } = await adminResponse.json();

  //     // Add your logic here (if any) for handling the successful login and admin status
  //     if (isAdmin) {
  //       setIsAdmin(true)
  //       console.log("hi admin");
  //     }

  //     await handleSendOtp();
  //     setShowOtpPopup(true);
  //     // The next line was modified to correctly use setIsVerified
  //     // Also, the condition is checked for `isVerified` instead of `status`
  //     // if (isVerified) {
  //     //   setShowOtpPopup(false);
  //     //   navigate("/user", { state: { isAdmin, email } });
  //     // }
  //   } catch (error) {
  //     // Handle login failure, display an error message, etc.
  //     console.error("Login error:", error);
  //     setError(error.message);
  //   }
  // };
  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Login failed: ${errorMessage}`);
      }
  
      const user = await response.json();
  
      // Call the new route to check if the user is an admin
      const adminResponse = await fetch("http://localhost:5000/check-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
  
      if (!adminResponse.ok) {
        throw new Error('Failed to check admin status');
      }
  
      const { isAdmin } = await adminResponse.json();
  
      // Add your logic here (if any) for handling the successful login and admin status
      if (isAdmin) {
        setIsAdmin(true)
        console.log("hi admin");
      }
  
      // Now, initiate OTP verification
      await handleSendOtp();
  
      // After OTP verification, show the OTP popup
      setShowOtpPopup(true);
    } catch (error) {
      // Handle login failure, display an error message, etc.
      console.error("Login error:", error);
      setError(error.message);
    }
  };
  

  const handleForgotPassword = () => {
    navigate("/ForgotPassword");
  };

  const handleSignUp = () => {
    navigate("/signUp");
  };

  // This function will be passed as a callback to OtpVerificationPopup
  const handleVerification = (status) => {
    setIsVerified(status);
    setShowOtpPopup(false);
    if (status) {
      navigate("/user", { state: { isAdmin: isadmin, email } });
    }
  };
  
  useEffect(() => {
    if (isVerified) {
      navigate("/user", { state: { isAdmin: isadmin, email } });
    }
  }, [isVerified, isadmin, email, navigate]);
  return (
    <div className="login-main">
      <div className="login-left">
        {/* <img src={Image} alt="" /> */}
      </div>
      <div className="login-right">
        <div className="login-right-container">
          <div className="login-logo">
            {/* <img src={Logo} alt="" /> */}
          </div>
          <div className="login-center">
            <h2>Welcome back!</h2>
            <p>Please enter your details</p>
            <form>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {showPassword ? (
                  <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />
                ) : (
                  <FaEye onClick={() => setShowPassword(!showPassword)} />
                )}
              </div>

              <div className="login-center-options">
                <div className="remember-div">
                  <input type="checkbox" id="remember-checkbox" />
                  <label htmlFor="remember-checkbox">
                    Remember for 30 days
                  </label>
                </div>
                {showOtpPopup && (
                  <OtpVerificationPopup
                    email={email} isAdmin={isadmin}
                    onVerification={handleVerification}
                    navigate={navigate}

                  />
                )}
                <div>
                  <button type="button" onClick={handleForgotPassword}>
                    Forgot Password?
                  </button>
                </div>
                <div>
                  <button type="button" onClick={handleSignUp}>
                    Dont Have Account? SignUp
                  </button>
                </div>
              </div>
              <div className="login-center-buttons">
                <button type="button" onClick={handleLogin}>
                  Log In
                </button>
              </div>
              {error && <span>{error}</span>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
