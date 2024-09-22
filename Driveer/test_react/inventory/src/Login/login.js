import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    if (!username) {
      setErrorMessage("Username is required");
      setLoading(false);
      return;
    }
    if (!password) {
      setErrorMessage("Password is required");
      setLoading(false);
      return;
    }

    // Simulate login logic (replace with actual API call)
    try {
      // Example: await api.login(username, password);
      console.log("Login submitted", { username, password });
      // Navigate on success (replace with actual condition)
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignupRedirect = () => {
    navigate("/signup");
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            aria-describedby="username-error"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-describedby="password-error"
          />
        </div>
        <div>
          <input
            type="submit"
            value={loading ? "Submitting..." : "Submit"}
            disabled={loading}
          />
          {loading && <span className="spinner">Loading...</span>}
        </div>
        {errorMessage && (
          <p style={{ color: "red" }} role="alert">
            {errorMessage}
          </p>
        )}
      </form>
      <p>
        Don't have an account?{" "}
        <button onClick={handleSignupRedirect} id="redirection">
          Sign Up
        </button>
      </p>
    </div>
  );
}

export default LoginForm;
