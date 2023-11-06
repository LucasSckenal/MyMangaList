import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../Api/firebase";
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import styles from "./styles.module.scss";

const Manga = ({ id, cap, name, img, stars }) => {
  const [localCap, setLocalCap] = useState(cap);
  const [localStars, setLocalStars] = useState(stars);

  const updateCap = async (newCap) => {
    try {
      const mangaRef = doc(db, "Mangas", id);
      await updateDoc(mangaRef, {
        cap: newCap,
      });
    } catch (error) {
      console.error("Erro ao atualizar o cap: ", error);
    }
  };

  const updateStars = async (newStars) => {
    try {
      const mangaRef = doc(db, "Mangas", id);
      await updateDoc(mangaRef, {
        stars: newStars,
      });
    } catch (error) {
      console.error("Erro ao atualizar as estrelas: ", error);
    }
  };

  const handleStarsChange = (e) => {
    const newStars = e.target.value;
    setLocalStars(newStars);
    updateStars(newStars);
  };

  const handleAddCap = () => {
    const newCap = localCap + 1;
    setLocalCap(newCap);
    updateCap(newCap);
  };

  function handleChangeCap(e) {
    const newCap = +e.target.value;
    setLocalCap(newCap + 1);
    updateCap(newCap + 1);
  }

  const handleDelete = async () => {
    try {
      const mangaRef = doc(db, "Mangas", id);
      await deleteDoc(mangaRef);
    } catch (error) {
      console.error("Erro ao excluir o documento: ", error);
    }
  };

  const starsOptions = Array.from({ length: 11 }, (_, index) => index);

  return (
    <main className={styles.bg}>
      <div className={styles.upInputs}>
        <div className={styles.capContainer}>
          <input
            type="number"
            value={localCap}
            onInput={handleChangeCap}
            className={styles.cap}
          />
          <button onClick={handleAddCap}>
            <p>+</p>
          </button>
        </div>
        <select
          id="rating"
          value={localStars}
          onChange={handleStarsChange}
          className={styles.stars}
        >
          {starsOptions.map((star) => (
            <option key={star} value={star}>
              {star}
            </option>
          ))}
        </select>
      </div>
      <img src={img} alt={name} />
      <div className={styles.bottom}>
        <p>{name}</p>
        <button onClick={handleDelete}>
          <AiOutlineDelete />
        </button>
      </div>
    </main>
  );
};

export default Manga;
