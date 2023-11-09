import { useState, useEffect } from "react";
import { db, auth } from "../../Api/firebase";
import { collection, getDocs } from "firebase/firestore";
import { AiOutlineSearch } from "react-icons/ai";

import Manga from "../mangas";

const MangaContainer = () => {
  const [mangas, setMangas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchMangas = async () => {
      try {
        const mangasCollection = collection(db, "Mangas");
        const querySnapshot = await getDocs(mangasCollection);

        const mangaList = [];
        querySnapshot.forEach((doc) => {
          const mangaData = doc.data();
          const loggedInUserId = auth.currentUser.uid;
          if (mangaData.userId === loggedInUserId) {
            mangaList.push({ id: doc.id, ...mangaData });
          }
        });

        setMangas(mangaList);
      } catch (error) {
        console.error("Erro ao recuperar a lista de mangas: ", error);
      }
    };

    fetchMangas();
  }, []);

  const filteredMangas = mangas.filter((manga) =>
    manga.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          position: "relative",
          width: "300px",
          flexDirection: "row",
        }}
      >
        <input
          type="text"
          placeholder="Pesquisar mangas"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "300px",
            height: "20px",
            borderRadius: "8px",
            border: "none",
            padding: "10px",
            position: "fixed",
            top: "10px",
          }}
        />
        <div style={{ position: "fixed", right: "42%", top: "20px" }}>
          <AiOutlineSearch />
        </div>
      </div>
      <p>Total de mangas: {mangas.length}</p>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "25px",
          flexWrap: "wrap",
        }}
      >
        {filteredMangas.map((manga) => (
          <Manga
            key={manga.id}
            id={manga.id}
            cap={manga.cap}
            name={manga.name}
            img={manga.img}
            stars={manga.stars}
            fav={manga.isFavorite}
            user={manga.userId}
          />
        ))}
      </div>
    </div>
  );
};

export default MangaContainer;
