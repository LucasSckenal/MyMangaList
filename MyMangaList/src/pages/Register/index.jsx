import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      await setPersistence(auth, browserSessionPersistence);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, {
        displayName: displayName,
      });

      const db = getFirestore();
      const usersCollection = collection(db, "users");

      const userDetails = {
        uid: userCredential.user.uid,
        displayName: displayName,
        email: email,
      };

      await addDoc(usersCollection, userDetails);
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form
        onSubmit={handleRegister}
        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
        <input
          style={{
            height: "25px",
            width: "500px",
            background: "none",
            border: "none",
            borderBottom: "1px solid #2f2f2f",
            padding: "5px 2px",
          }}
          type="text"
          placeholder="Display Name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <input
          style={{
            height: "25px",
            width: "500px",
            background: "none",
            border: "none",
            borderBottom: "1px solid #2f2f2f",
            padding: "5px 2px",
          }}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          style={{
            height: "25px",
            width: "500px",
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
        <button type="submit">Register</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Register;
