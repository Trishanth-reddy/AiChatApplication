import React, { useState } from 'react';
import Silk from "../../DarkVeil/GradientBlinds"; // Assuming Silk is the GradientBlinds component
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  // 1. State management for the form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // 2. Handler function for form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents the page from reloading
    console.log('Login attempt with:', { email, password });
    navigate('/')
    // TODO: Add your actual authentication logic here (e.g., API call)
  };

  return (
    <>
      <div className="h-[100vh] relative">
        
        {/* Background component remains the same */}
        <Silk
          speed={5}
          scale={1}
          color="#211C84" // This is the deep blue base color
          noiseIntensity={1.5}
          rotation={0}
          className="absolute inset-0 z-0"
        />

        {/* This container centers the login form */}
        <div className="absolute inset-0 z-20 flex justify-center items-center p-4">
          
          {/* The Login Form with updated colors */}
          <form 
            onSubmit={handleSubmit} 
            // Changed background to the deep blue from your theme with opacity
            className="w-full max-w-sm p-8 space-y-6 bg-[#211C84]/35 backdrop-blur-md rounded-xl shadow-lg"
          >
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
              {/* Using gray-300 for paragraph text as specified */}
              <p className="text-gray-300 mt-2">Sign in to continue</p>
            </div>
            
            {/* Email Input */}
            <div>
              <label 
                htmlFor="email" 
                // Label text color is already gray-300, which matches the theme
                className="block text-sm font-medium text-gray-300"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                // Updated placeholder text color and focus ring color
                className="mt-1 block w-full px-3 py-2 bg-white/10 border border-gray-600 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5aa2fa]"
              />
            </div>

            {/* Password Input */}
            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-gray-300"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                // Updated placeholder text color and focus ring color
                className="mt-1 block w-full px-3 py-2 bg-white/10 border border-gray-600 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5aa2fa]"
              />
            </div>

            {/* Submit Button */}
            <button
            
              type="submit"
              // Updated button background color to the specified bright sky blue
              className="w-full py-3 px-4 bg-[#5aa2fa] hover:bg-[#4a91e3] rounded-md text-white font-semibold transition-colors"
            >
              Sign In
            </button>

            {/* Updated secondary text and link color */}
            <div className="text-center text-sm text-gray-300">
              <p>Don't have an account? <a href="/Signup" className="font-medium text-[#5aa2fa] hover:underline">Sign Up</a></p>
            </div>
          </form>

        </div>
        
      </div>
    </>
  )
}   

export default Login;