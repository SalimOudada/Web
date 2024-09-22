import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignupForm from "./Signin/Signin"; // Assure-toi que le chemin est correct
import LoginForm from "./Login/login"; // Assure-toi que le chemin est correct

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/" element={<Navigate to="/signup" replace />} />{" "}
      {/* Redirection vers sign up */}
    </Routes>
  );
}

export default App;
