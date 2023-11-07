import { AiOutlineLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import Manga from "../../components/mangas";
import { db } from "../../Api/firebase";

const Fav = () => {
  const [favoriteMangas, setFavoriteMangas] = useState([]);

  useEffect(() => {
    const fetchFavoriteMangas = async () => {
      try {
        const mangasCollection = collection(db, "Mangas");
        const querySnapshot = await getDocs(mangasCollection);

        const favoriteMangaList = [];
        querySnapshot.forEach((doc) => {
          const mangaData = doc.data();
          if (mangaData.isFavorite) {
            favoriteMangaList.push({ id: doc.id, ...mangaData });
          }
        });

        setFavoriteMangas(favoriteMangaList);
      } catch (error) {
        console.error("Erro ao recuperar a lista de mangas: ", error);
      }
    };

    fetchFavoriteMangas();
  }, []);

  return (
    <>
      <Link to="/">
        <button
          style={{
            position: "absolute",
            top: "30px",
            left: "50px",
            padding: "0.6em 1.2em",
          }}
        >
          <AiOutlineLeft />
        </button>
      </Link>
      <div>
        <h2>Mangás Favoritos</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "25px",
            flexWrap: "wrap",
          }}
        >
          {favoriteMangas.map((manga) => (
            <Manga
              key={manga.id}
              id={manga.id}
              cap={manga.cap}
              name={manga.name}
              img={manga.img}
              stars={manga.stars}
              isFavorite={manga.isFavorite}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Fav;
