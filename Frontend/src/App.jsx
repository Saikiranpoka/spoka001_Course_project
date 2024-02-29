
import './App.css';
import AdminPage from './Components/pages/AdminPage';

import LandingPage from './Components/pages/LandingPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UsersPage from './Components/pages/UsersPage';
import SignUpPage from './Components/SignUpPage';
import ForgotPassword from './Components/pages/ForgotPassword';
import DashBoard from './Components/pages/Dashboard';
import OtpVerificationPopup from './Components/pages/OtpVerificationPopup';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/user" element={<UsersPage/>} />
        <Route path="/signUP" element={<SignUpPage/>} />
        <Route path="/ForgotPassword" element={<ForgotPassword/>} />
        <Route path="/dashBoard" element={<DashBoard/>} />
        <Route path="/otpVerify" element={<OtpVerificationPopup/>} />

        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
