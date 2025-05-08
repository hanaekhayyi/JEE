import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Verify() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("http://localhost:8080/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, verificationCode: code }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Verification failed");
      }

      alert("Verification successful! You can now log in.");
      navigate("/login");
    } catch (err: any) {
      setError(err.message || "Verification failed. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h1>Verify Account</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleVerify}>
        <div style={{ marginBottom: "15px" }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "8px", fontSize: "16px" }}
            required
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <input
            type="text"
            placeholder="Verification Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={{ width: "100%", padding: "8px", fontSize: "16px" }}
            required
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
          Verify
        </button>
      </form>
      <p style={{ marginTop: "15px" }}>
        Back to <Link to="/login">Log in</Link>
      </p>
    </div>
  );
}

export default Verify;