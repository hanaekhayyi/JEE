import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("MALE");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
          firstName,
          lastName,
          gender,
          role: "ANNOTATOR_ROLE", // Fixé pour les annotateurs
          email,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Signup failed");
      }

      const data = await response.json();
      alert(`Signup successful! Your verification code is: ${data.verificationCode}`);
      navigate("/verify");
    } catch (err: any) {
      setError(err.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h1>Sign Up (Annotator)</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSignup}>
        <div style={{ marginBottom: "15px" }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: "100%", padding: "8px", fontSize: "16px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "8px", fontSize: "16px" }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            style={{ width: "100%", padding: "8px", fontSize: "16px" }}
            
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            style={{ width: "100%", padding: "8px", fontSize: "16px" }}
            
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            style={{ width: "100%", padding: "8px", fontSize: "16px" }}
          >
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "8px", fontSize: "16px" }}
            
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Sign Up
        </button>
      </form>
      <p style={{ marginTop: "15px" }}>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
}

export default Signup;