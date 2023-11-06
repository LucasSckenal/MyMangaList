import "./home.css";
import MangaContainer from "../../components/MangasContainer";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";

function Home() {
  return (
    <>
      <MangaContainer />
      <Link to="/add">
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
    </>
  );
}

export default Home;
