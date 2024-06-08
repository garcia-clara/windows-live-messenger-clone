import React, { useState } from 'react';
import AvatarLarge from "../components/AvatarLarge";
import statusFrames from "../imports/statusFrames";
import Background from "../components/Background";
import Dropdown from "../components/Dropdown";
import { useNavigate } from "react-router-dom";
import "7.css/dist/7.scoped.css";
import useUserStore from '../lib/user-store';
import bg from '../assets/bg1.jpg';
import CryptoJS from 'crypto-js';

const LoginPage = () => {
  const navigate = useNavigate();
  const clearUser = useUserStore(state => state.clearUser);

  // Initialize state hooks for each input field and checkbox
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('Available');
  const [rememberMe, setRememberMe] = useState(false);
  const [rememberPassword, setRememberPassword] = useState(false);
  const [signInAutomatically, setSignInAutomatically] = useState(false);

  clearUser();

  const handleSignIn = () => {
    // Hash the password
    const hashedPassword = CryptoJS.SHA256(password).toString();

    // Store values in local storage
    localStorage.setItem('email', email);
    localStorage.setItem('password', hashedPassword);
    localStorage.setItem('status', status);
    localStorage.setItem('rememberme', rememberMe);
    localStorage.setItem('rememberpassword', rememberPassword);
    localStorage.setItem('signinautomatically', signInAutomatically);

    localStorage.setItem('name', '');
    localStorage.setItem('message', '');

    // Navigate to the home page
    navigate("/");
  };

  const options = [
    { value: 'Available', label: 'Available', image: statusFrames.onlineDot },
    { value: 'Busy', label: 'Busy', image: statusFrames.busyDot },
    { value: 'Away', label: 'Away', image: statusFrames.awayDot },
    { value: 'Offline', label: 'Appear offline', image: statusFrames.offlineDot },
  ];

  return (
    <Background>
      <div className="bg-no-repeat bg-[length:100%_100px] h-screen" style={{ backgroundImage: `url(${bg})`}}>
        <div className="flex flex-col items-center w-full pt-4 win7 font-sans text-base">
          <AvatarLarge />
          <p className="mt-4 text-xl text-[#1D2F7F]">Sign in</p>
          <p className="mb-4">Enter a name and a password to start chatting</p>

          <fieldset className="">
            {/* Connexion inputs */}
            <input
              className="w-full placeholder:italic"
              type="email"
              placeholder="Example555@hotmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="w-full mt-2 placeholder:italic"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Status */}
            <div className="flex my-4">
              <p>Sign in as: </p>
              <Dropdown 
                options={options} 
                value={status}
                onChange={(option) => setStatus(option.value)}
              />
            </div>

            {/* Checkboxes */}
            <div>
              <div className="mt-2">
                <input 
                  type="checkbox" 
                  id="rememberme" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="rememberme">Remember me</label>
              </div>
              <div className="mt-2">
                <input 
                  type="checkbox" 
                  id="rememberpassword" 
                  checked={rememberPassword}
                  onChange={(e) => setRememberPassword(e.target.checked)}
                />
                <label htmlFor="rememberpassword">Remember my password</label>
              </div>
              <div className="mt-2">
                <input 
                  type="checkbox" 
                  id="signinautomatically" 
                  checked={signInAutomatically}
                  onChange={(e) => setSignInAutomatically(e.target.checked)}
                />
                <label htmlFor="signinautomatically">Sign me in automatically</label>
              </div>
            </div>
          </fieldset>

          {/* Sign in button */}
          <button className="mt-4" onClick={handleSignIn}>
            Sign in
          </button>
        </div>
      </div>
    </Background>
  );
};

export default LoginPage;
