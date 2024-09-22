import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signin.css";

function SignupForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
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
    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long");
      setLoading(false);
      return;
    }
    if (password !== repeatPassword) {
      setErrorMessage("Passwords do not match");
      setLoading(false);
      return;
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div>
      <h1>Sign Up</h1>
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
            type="password"
            placeholder="Confirm Password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            aria-describedby="repeat-password-error"
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
        Already have an account?{" "}
        <button onClick={handleLoginRedirect} id="redirection">
          Login
        </button>
      </p>
    </div>
  );
}

export default SignupForm;
