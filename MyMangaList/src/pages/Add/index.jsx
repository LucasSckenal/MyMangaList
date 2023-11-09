import AddManga from "../../components/AddManga";
import { AiOutlineLeft } from "react-icons/ai";
import { Link } from "react-router-dom";

const Add = () => {
  return (
    <>
      <Link to="/MyMangaList">
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
      <AddManga />
    </>
  );
};

export default Add;
