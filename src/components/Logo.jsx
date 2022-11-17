import { Link } from "react-router-dom";

import { useContext } from "react"; 

//Context
import { PostsContext } from "../context/PostsContext";

export const Logo = () => {
  const { data, setData } = useContext(PostsContext);


  return (
    <div className="logo">
      <Link to="/" onClick={() => { setData(!data) }}>
        Feed<span>Review</span>
      </Link>
    </div>
  );
};
 