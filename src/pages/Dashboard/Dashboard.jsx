import "./Dashboard.css";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { SmileyXEyes } from "phosphor-react";

//Components
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { Loading } from "../../components/Loading";
import { Error } from "../../components/Error";

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

  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    async function fetchPosts() {
      try {
        const res = await fetch(urlApi);
        const data = await res.json();

        const dataPosts = data.filter((post) => post.uid === user.uid);
        const dataFormat = dataPosts.slice(0).reverse();

        setPostsUser(dataFormat);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setError("erro ao carregar os dados!");
        setLoading(false);
      }
    }

    fetchPosts();
  }, [data]);

  async function deletePost(id) {
    setLoading(true);

    try {
      const res = await fetch(`${urlApi}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      setPostsUser([...postsUser]);
      setData(data);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setError("Erro!");
      setLoading(false);
    }
  }

  return (
    <section className="dashboard">
      <Navbar />
      <div className="wrappler">
        <h2>Dashboard | {user.displayName}</h2>
        {loading && <Loading />}
        {error && <p><Error message={error}/></p>}
        {!error && (
          <>
            {!loading && (
              <>
                {postsUser.length > 0 ? (
                  <div className="cards">
                    {postsUser.map((post) => (
                      <div key={post.id} className="post-card">
                        <img src={post.img} alt={post.title} />
                        <div className="infos">
                          <p className="heading-sm">{post.title}</p>
                          <div className="box-btn">
                            <button className="btn-outline">Editar</button>
                            <button
                              className="btn"
                              onClick={() => deletePost(post.id)}
                            >
                              Excluir
                            </button>
                          </div>
                          <Link to={`/${post.id}`}>ver mais</Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="noPost">
                    <SmileyXEyes size={250} />
                    <button onClick={() => setModalPost(true)}>
                      Crie sue primeiro post
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
      <Footer />
    </section>
  );
};
