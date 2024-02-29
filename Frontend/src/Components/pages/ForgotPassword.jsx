
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import OtpVerificationPopup from "./OtpVerificationPopup";

const ForgotPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

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
        setShowOtpPopup(true); // Show the OTP verification popup
      } else {
        console.error('Invalid response:', responseData);
        alert('Failed to send OTP');
      }
    } catch (error) {
      console.error("Send OTP error:", error.message);
      alert('Failed to send OTP');
    }
  };

  const handleVerification = async (status) => {
    setIsVerified(status);
    setShowOtpPopup(false); // Hide the OTP verification popup
  
    if (status) { // Check the status directly
      try {
        // Change the password only if the OTP is verified
        const response = await fetch("http://localhost:5000/forgot-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
  
        if (!response.ok) {
          throw new Error(`Change password failed: ${await response.text()}`);
        }
  
        console.log("Password changed successfully");
        alert("Password changed successfully. You can now login.");
  
        // Redirect or perform other actions after successful password change
        navigate("/");
      } catch (error) {
        setError(true);
        console.error("Change password error:", error);
      }
    }
  };


  const handleGoBack = () => {
    navigate("/");
  };
  return (
    <div className="login-main">
      <div className="login-left"></div>
      <div className="login-right">
        <div className="login-right-container">
          <div className="login-logo"></div>
          <div className="login-center">
            <p>Reset Password</p>
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
                  <FaEyeSlash
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <FaEye onClick={() => setShowPassword(!showPassword)} />
                )}
              </div>

              <div className="login-center-buttons">
                <button type="button" onClick={handleSendOtp}>
                  Change Password
                </button>
                <button type="button" onClick={handleGoBack}>
                  Back
                </button>
                {error && (
                  <span>User not found. Please check your email address</span>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      {showOtpPopup && (
        <OtpVerificationPopup
          email={email}
          onVerification={handleVerification}
        />
      )}
    </div>
  );
};

export default ForgotPassword;
