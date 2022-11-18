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
import { EditPost } from "../../components/EditPost";

const urlApi = "http://localhost:3000/posts";

export const Dashboard = () => {
  const { data, setData } = useContext(PostsContext);
  const { user } = useContext(AuthContext);
  const { setModalPost } = useContext(ModalNewPostContext);

  const [postsUser, setPostsUser] = useState([]);
  const [modalEditPost, setModalEditPost] = useState(false);

  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [errorEditModal, setErrorEditModal] = useState(null);

  const [idPost, setIdPost] = useState("");
  const [uidPost, setUidPost] = useState("");
  const [imgPost, setImgPost] = useState("");

  const [createdByPost, setCreatedByPost] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tags, setTags] = useState([]);

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

  async function handleEditPost(e, id, uid, name) {
    e.preventDefault();

    if (title !== "" && tags.length !== 0 && desc !== "") {
      try {
        setLoading(true);
        const res = await fetch(`${urlApi}/${id}`, {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          method: "PUT",
          body: JSON.stringify({
            title: title,
            id: id,
            img: imgPost,
            desc: desc,
            tags: tags,
            createdBy: name,
            uid: uid,
          }),
        });

        const data = await res.json();

        setPostsUser([...postsUser]);
        setData(data);

        setTitle("");
        setDesc("");
        setTags([]);

        setErrorEditModal(null);
        setLoading(false);
        setModalEditPost(false);
      } catch (error) {
        setPostsUser([...postsUser]);
        setData(data);
        console.log(error.message);
        setErrorEditModal("Erro!");
        setLoading(false);
      }
      document.body.classList.remove("active");
    } else {
      setErrorEditModal("Preencha todos os campos!");
    }
  }

  return (
    <section className="dashboard">
      <Navbar />
      <div className="wrappler">
        <h2>Dashboard | {user.displayName}</h2>
        {loading && <Loading />}
        {error && (
          <>
            <Error message={error} />
            <div className="noPost">
              <SmileyXEyes size={250} />
              <p>{error}</p>
            </div>
          </>
        )}
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
                            <button
                              className="btn-outline"
                              onClick={() => {
                                setIdPost(post.id);
                                setUidPost(post.uid);
                                setCreatedByPost(post.createdBy);
                                setImgPost(post.img);
                                setModalEditPost(true);
                              }}
                            >
                              Editar
                            </button>
                            <button
                              className="btn"
                              onClick={() => {
                                deletePost(post.id);
                              }}
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
        {modalEditPost && (
          <EditPost
            handleEditPost={(e) =>
              handleEditPost(e, idPost, uidPost, createdByPost)
            }
            titleEdit={setTitle}
            descEdit={setDesc}
            tagsEdit={setTags}
            tags={tags}
            img={imgPost}
            modalEditPost={modalEditPost}
            setModalEditPost={setModalEditPost}
            loading={loading}
            error={errorEditModal}
            setError={setErrorEditModal}
          />
        )}
      </div>
      <Footer />
    </section>
  );
};
