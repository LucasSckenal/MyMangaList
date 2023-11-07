import { doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from "../../Api/firebase";
import { useState, useEffect } from "react";
import { AiOutlineDelete, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import styles from "./styles.module.scss";

// eslint-disable-next-line react/prop-types
const Manga = ({ id, cap, name, img, stars, fav }) => {
  const [localCap, setLocalCap] = useState(cap);
  const [localStars, setLocalStars] = useState(stars);
  const [isFavorite, setIsFavorite] = useState(fav);

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

  const updateFavoriteStatus = async (newFavoriteStatus) => {
    try {
      const mangaRef = doc(db, "Mangas", id);
      await updateDoc(mangaRef, {
        isFavorite: newFavoriteStatus,
      });
    } catch (error) {
      console.error("Erro ao atualizar o status de favorito: ", error);
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
    const newCap = parseInt(e.target.value, 10);
    setLocalCap(newCap);
    updateCap(newCap);
  }

  const handleDelete = async () => {
    try {
      const mangaRef = doc(db, "Mangas", id);
      await deleteDoc(mangaRef);
    } catch (error) {
      console.error("Erro ao excluir o documento: ", error);
    }
  };

  const toggleFavorite = () => {
    const newFavoriteStatus = !isFavorite;
    setIsFavorite(newFavoriteStatus);
    updateFavoriteStatus(newFavoriteStatus);
  };

  const starsOptions = Array.from({ length: 11 }, (_, index) => index);

  useEffect(() => {
    const loadFavoriteStatus = async () => {
      try {
        const mangaRef = doc(db, "Mangas", id);
        const mangaSnapshot = await getDoc(mangaRef);
        if (mangaSnapshot.exists()) {
          const mangaData = mangaSnapshot.data();
          if (mangaData && mangaData.isFavorite !== undefined) {
            setIsFavorite(mangaData.isFavorite);
          }
        }
      } catch (error) {
        console.error("Erro ao carregar o status de favorito: ", error);
      }
    };
    loadFavoriteStatus();
  }, [id]);

  return (
    <main className={`${styles.bg} ${isFavorite ? styles.favorite : ""}`}>
      <div className={styles.upInputs}>
        <div className={styles.capContainer}>
          <input
            type="number"
            value={localCap}
            onChange={handleChangeCap}
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
        <div className={styles.btns}>
          <button onClick={handleDelete}>
            <AiOutlineDelete />
          </button>
          <button onClick={toggleFavorite}>
            {isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
          </button>
        </div>
      </div>
    </main>
  );
};

export default Manga;
