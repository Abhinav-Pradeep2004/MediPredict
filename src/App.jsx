import React, { useState } from "react";    
import SocialLogin from "/components/SocialLogin";
import InputField from "/components/InputField";
import PredictorForm from "/components/PredictorForm";
import Navbar from "/components/Navbar";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // You can add authentication logic here
    setIsLoggedIn(true); // switch to prediction screen
  };



  return (
  <>
    <Navbar />
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      {!isLoggedIn ? (
        <div className="login-container bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
          <h2 className="form-title text-2xl font-bold mb-4 text-center">Log in with</h2>
          <SocialLogin />
          <p className="separator text-center text-sm my-4 text-gray-500"><span>or</span></p>
          <form onSubmit={handleLoginSubmit} className="login-form flex flex-col gap-4">
            <InputField type="email" placeholder="Email address" icon="mail" />
            <InputField type="password" placeholder="Password" icon="lock" />
            <a href="#" className="forgot-password-link text-sm text-right text-blue-500 hover:underline">Forgot password?</a>
            <button type="submit" className="login-button bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">Log In</button>
          </form>
          <p className="signup-prompt text-sm text-center mt-4">
            Don&apos;t have an account? <a href="#" className="signup-link text-blue-600 hover:underline">Sign up</a>
          </p>
        </div>
      ) : (
        <PredictorForm />
      )}
    </div>
  </>
);

}

export default App; 
