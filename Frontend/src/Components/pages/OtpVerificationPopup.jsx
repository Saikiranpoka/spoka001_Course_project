// import React, { useState } from 'react';
// import "./popup.css";
// import { useNavigate } from "react-router-dom";


// const OtpVerificationPopup = ({ email, onVerification , isAdmin}) => {
//   const [otp, setOtp] = useState('');
//   const navigate = useNavigate();
//   const handleVerify = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/verify-otp", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, otp }),
//       });

//       // Log the response content
//       const responseData = await response.json();
//       console.log('Response:', responseData);

//       if (response.ok && responseData.message === 'OTP verified successfully') {
//         console.log(responseData.message);
//         alert('OTP verified successfully');
//         navigate("/user", { state: { isAdmin, email } });
//         // Pass the verification status back to the main component
//       } else {
//         console.error('Invalid response:', responseData);
//         alert('Please Enter Valid OTP');
//         // Pass the verification status back to the main component
//       }
//     } catch (error) {
//       console.error("OTP verification error:", error.message);
//       alert('Failed to verify OTP');
//       // Pass the verification status back to the main component
//     }
//   };



//   return (
//     <div className="otp-popup">
//       <div className="otp-container">
//         <span className="close-btn">
//           &times;
//         </span>
//         <h2>OTP Verification</h2>
//         <p>Please enter the OTP sent to your mobile number.</p>
//         <input
//           type="text"
//           placeholder="Enter OTP"
//           value={otp}
//           onChange={(e) => setOtp(e.target.value)}
//         />
//         <button onClick={handleVerify}>Verify</button>
//       </div>
//     </div>
//   );
// };

// export default OtpVerificationPopup;
import React, { useState } from 'react';
import "./popup.css";
import { useNavigate } from "react-router-dom";

const OtpVerificationPopup = ({ email, onVerification, isAdmin }) => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
  
    try {
      const response = await fetch("http://localhost:5000/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });
  
      // Log the response content
      const responseData = await response.json();
      console.log('Response:', responseData);
  
      if (response.ok && responseData.message === 'OTP verified successfully') {
        console.log(responseData.message);
        alert('OTP verified successfully');
        // Call the provided onVerification callback
        onVerification(true);
      } else {
        console.error('Invalid response:', responseData);
        alert('Please Enter Valid OTP');
        // Call the provided onVerification callback
        onVerification(false);
      }
    } catch (error) {
      console.error("OTP verification error:", error.message);
      alert('Failed to verify OTP');
      // Call the provided onVerification callback
      onVerification(false);
    }
  };
  
  return (
    <div className="otp-popup">
      <div className="otp-container">
        <span className="close-btn">
          &times;
        </span>
        <h2>OTP Verification</h2>
        <p>Please enter the OTP sent to your Registered Email.</p>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button onClick={(e) => handleVerify(e)}>Verify</button>

      </div>
    </div>
  );
};

export default OtpVerificationPopup;
