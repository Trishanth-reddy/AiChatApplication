import React, { useState } from 'react';
import Silk from "../../DarkVeil/GradientBlinds"; // Make sure this path is correct for your project

function Signup() {
  // 1. State management for the form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // 2. Handler function for form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents the page from reloading
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log('Signup attempt with:', { name, email, password });
    // TODO: Add your actual user registration logic here (e.g., API call)
  };

  return (
    <>
      <div className="h-[100vh] relative">
        
        {/* Animated background component */}
        <Silk
          speed={5}
          scale={1}
          color="#211C84" // Using the same deep blue base color
          noiseIntensity={1.5}
          rotation={0}
          className="absolute inset-0 z-0"
        />

        {/* This container centers the signup form */}
        <div className="absolute inset-0 z-20 flex justify-center items-center p-4">
          
          {/* The Signup Form with matching styles */}
          <form 
            onSubmit={handleSubmit} 
            className="w-full max-w-sm p-8 space-y-6 bg-[#211C84]/35 backdrop-blur-md rounded-xl shadow-lg"
          >
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white">Create an Account</h1>
              <p className="text-gray-300 mt-2">Enter your details to get started</p>
            </div>
            
            {/* Full Name Input */}
            <div>
              <label 
                htmlFor="name" 
                className="block text-sm font-medium text-gray-300"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
                className="mt-1 block w-full px-3 py-2 bg-white/10 border border-gray-600 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5aa2fa]"
              />
            </div>

            {/* Email Input */}
            <div>
              <label 
                htmlFor="email" 
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
                className="mt-1 block w-full px-3 py-2 bg-white/10 border border-gray-600 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5aa2fa]"
              />
            </div>

            {/* Confirm Password Input */}
            <div>
              <label 
                htmlFor="confirm-password" 
                className="block text-sm font-medium text-gray-300"
              >
                Confirm Password
              </label>
              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="mt-1 block w-full px-3 py-2 bg-white/10 border border-gray-600 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5aa2fa]"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#5aa2fa] hover:bg-[#4a91e3] rounded-md text-white font-semibold transition-colors"
            >
              Sign Up
            </button>

            {/* Link to Login page */}
            <div className="text-center text-sm text-gray-300">
              <p>Already have an account? <a href="/login" className="font-medium text-[#5aa2fa] hover:underline">Sign In</a></p>
            </div>
          </form>

        </div>
        
      </div>
    </>
  )
} 

export default Signup;