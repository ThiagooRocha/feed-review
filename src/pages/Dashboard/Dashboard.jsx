import "./Dashboard.css";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

//Components
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";

//Context
import { PostsContext } from "../../context/PostsContext";
import { ModalNewPostContext } from "../../context/ModalNewPostContext";
import { AuthContext } from "../../context/AuthContext";

const urlApi = "http://localhost:3000/posts";

export const Dashboard = () => {
  const { data, setData } = useContext(PostsContext);
  const { user } = useContext(AuthContext);
  const { setModalPost } = useContext(ModalNewPostContext);
  const [postsUser, setPostsUser] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch(urlApi);
      const data = await res.json();

      const dataPosts = data.filter((post) => post.uid === user.uid);
      const dataFormat = dataPosts.slice(0).reverse();

      setPostsUser(dataFormat);
    }

    fetchPosts();
  }, [data]);

  async function deletePost(id) {
    const res = await fetch(`${urlApi}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    setPostsUser([...postsUser]);
    setData(data);
  }

  return (
    <section className="dashboard">
      <Navbar />
      <div className="wrappler">
        <div className="cards">
          {postsUser.map((post) => (
            <div key={post.id} className="post-card">
              <img src={post.img} alt={post.title} />
              <div className="infos">
                <p className="heading-sm">{post.title}</p>
                <button className="btn" onClick={() => deletePost(post.id)}>
                  Excluir
                </button>
                <Link to={`/${post.id}`}>ver mais</Link>
              </div>
            </div>
          ))}
          {postsUser.map((post) => (
            <div key={post.id} className="post-card">
              <img src={post.img} alt={post.title} />
              <div className="infos">
                <p className="heading-sm">{post.title}</p>
                <button className="btn" onClick={() => deletePost(post.id)}>
                  Excluir
                </button>
                <Link to={`/${post.id}`}>ver mais</Link>
              </div>
            </div>
          ))}
        </div>
        
        {postsUser.length === 0 && (
          <button onClick={() => setModalPost(true)}>
            Crie sue primeiro post
          </button>
        )}
      </div>
      <Footer />
    </section>
  );
};
