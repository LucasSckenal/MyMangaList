import { useState, useEffect } from "react";
import { auth, db } from "../../Api/firebase";
const Profile = () => {
  const [user, setUser] = useState(null);
  const [newName, setNewName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [selectedPicture, setSelectedPicture] = useState(null);

  useEffect(() => {
    const userRef = auth.currentUser;

    if (userRef) {
      setUser(userRef);
    }
  }, []);

  const handleNameChange = () => {
    if (user && newName) {
      user
        .updateProfile({
          displayName: newName,
        })
        .then(() => {
          setUser({ ...user, displayName: newName });
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  };

  const handlePasswordChange = () => {
    if (user && newPassword) {
      user
        .updatePassword(newPassword)
        .then(() => {
          alert("Password updated successfully");
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const storageRef = db.storage().ref();
      const imageRef = storageRef.child(
        `profilePictures/${user.uid}/${file.name}`
      );
      imageRef.put(file).then(() => {
        imageRef.getDownloadURL().then((url) => {
          console.log("Downloaded URL:", url);
          user
            .updateProfile({
              photoURL: url,
            })
            .then(() => {
              setUser({ ...user, photoURL: url });
            })
            .catch((error) => {
              console.error("Error updating profile:", error.message);
            });
        });
      });

      setSelectedPicture(URL.createObjectURL(file));
    }
  };

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        localStorage.removeItem("userLoggedIn");
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <div>
      <h2>Profile</h2>
      {user && (
        <>
          <img
            src={selectedPicture || user.photoURL || ""}
            alt="Profile"
            width="100"
            height="100"
          />
          <input
            type="file"
            onChange={handleProfilePictureChange}
            accept="image/*"
          />
          <br />
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="New Name"
          />
          <button onClick={handleNameChange}>Change Name</button>
          <br />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
          />
          <button onClick={handlePasswordChange}>Change Password</button>
        </>
      )}
      <br />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
