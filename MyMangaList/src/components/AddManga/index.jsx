import { useState } from "react";
import { db } from "../../Api/firebase";
import { addDoc, collection } from "firebase/firestore";
import { getAuth } from "@firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import styles from "./styles.module.scss";
import { AiFillStar, AiOutlineBook, AiOutlinePlusSquare } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddManga = () => {
  const [name, setName] = useState("");
  const [stars, setStars] = useState(0);
  const [cap, setCap] = useState(0);
  const [img, setImg] = useState(null);
  const [imgURL, setImgURL] = useState(null);

  const handleAddManga = async () => {
    try {
      if (img) {
        const storage = getStorage();
        const storageRef = ref(storage, `images/${img.name}`);
        await uploadBytes(storageRef, img);

        const imageUrl = await getDownloadURL(storageRef);

        const auth = getAuth();
        const loggedInUserId = auth.currentUser.uid;

        const mangaData = {
          name: name,
          stars: stars,
          cap: cap,
          img: imageUrl,
          userId: loggedInUserId,
        };

        const mangasCollection = collection(db, "Mangas");
        await addDoc(mangasCollection, mangaData);

        setName("");
        setStars(0);
        setCap(0);
        setImg(null);
        setImgURL(null);

        toast.success("Manga adicionado com sucesso!");
      } else {
        toast.error("Nenhuma imagem selecionada.");
      }
    } catch (error) {
      toast.error("Erro ao adicionar manga: " + error.message);
    }
  };

  const handleImageChange = (e) => {
    const selectedImg = e.target.files[0];
    setImg(selectedImg);

    const imageURL = URL.createObjectURL(selectedImg);
    setImgURL(imageURL);
  };

  return (
    <main className={styles.Container}>
      <h2>Adicionar Novo Manga</h2>
      <div>
        <div className={styles.textInputs}>
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className={styles.stars}>
            <input
              type="number"
              placeholder="stars"
              value={stars}
              onChange={(e) => setStars(e.target.value)}
              max={10}
              min={0}
            />
            <AiFillStar />
          </div>
          <div className={styles.cap}>
            <input
              type="number"
              placeholder="Cap"
              value={cap}
              onChange={(e) => setCap(e.target.value)}
              min={0}
            />
            <AiOutlineBook />
          </div>
        </div>
        <div className={styles.file}>
          <label>
            <input type="file" onChange={handleImageChange} />
            {imgURL ? (
              <img src={imgURL} alt="Imagem selecionada" />
            ) : (
              <AiOutlinePlusSquare />
            )}
          </label>
        </div>
      </div>
      <button onClick={handleAddManga}>Adicionar Manga</button>
    </main>
  );
};

export default AddManga;
