import "./home.css";
import MangaContainer from "../../components/MangasContainer";
import { Link } from "react-router-dom";
import { AiOutlinePlus, AiFillHeart } from "react-icons/ai";

function Home() {
  return (
    <>
      <MangaContainer />
      <Link to="/MyMangaList/add">
        <button
          style={{
            position: "fixed",
            right: "50px",
            bottom: "30px",
            borderRadius: "8px",
            padding: "0.6em 1.2em",
          }}
        >
          <AiOutlinePlus />
        </button>
      </Link>
      <Link to="/MyMangaList/fav">
        <button
          style={{
            position: "fixed",
            right: "50px",
            bottom: "90px",
            borderRadius: "8px",
            padding: "0.6em 1.2em",
          }}
        >
          <AiFillHeart />
        </button>
      </Link>
    </>
  );
}

export default Home;
