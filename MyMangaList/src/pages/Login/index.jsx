import { useState, useEffect } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);

        localStorage.setItem("userLoggedIn", "true");
      } else {
        setUser(null);
        localStorage.removeItem("userLoggedIn");
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      {user ? (
        <Navigate to="/MyMangaList/" />
      ) : (
        <div>
          <form
            onSubmit={handleLogin}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              background: "rgba(255, 255, 255, 0.1)",
              boxShadow: "0.5em 0.5em 0.5em rgba(2, 2, 2, 0.3)",
              width: "500px",
              height: "300px",
              borderRadius: "8px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h2>Login</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                height: "25px",
                width: "300px",
                background: "none",
                border: "none",
                borderBottom: "1px solid #2f2f2f",
                padding: "5px 2px",
              }}
            />
            <input
              style={{
                height: "25px",
                width: "300px",
                background: "none",
                border: "none",
                borderBottom: "1px solid #2f2f2f",
                padding: "5px 2px",
              }}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" style={{ width: "200px", height: "35px" }}>
              Login
            </button>
          </form>
          {error && <p>{error}</p>}
        </div>
      )}
    </div>
  );
};

export default Login;
