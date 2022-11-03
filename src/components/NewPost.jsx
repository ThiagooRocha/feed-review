import "./NewPost.css";

import { TextT, Image, X, Check } from "phosphor-react";
import { Error } from "../components/Error";

//Context
import { useState, useContext } from "react";
import { useAuthValue } from "../context/AuthContext";
import { ModalNewPostContext } from "../context/ModalNewPostContext";
import { PostsContext } from "../context/PostsContext";

const urlApi = "http://localhost:3000/posts";

export const NewPost = () => {
  const { modalPost, setModalPost } = useContext(ModalNewPostContext);
  const { setPosts, setData } = useContext(PostsContext);

  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [desc, setDesc] = useState("");
  const [textTag, setTextTag] = useState("");
  const [tags, setTags] = useState([]);

  const { user } = useAuthValue();

  if (modalPost) {
    document.body.classList.add("openModal");
  }

  function closeModal() {
    document.body.classList.remove("openModal");
    setTitle("");
    setImg("");
    setDesc("");
    setTags([]);
    setModalPost(false);
  }

  const handleNewPost = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!title == "" && !img == "" && tags.length !== 0 && !desc == "") {
      try {
        new URL(img);
      } catch (error) {
        return setError("A imagem precisa ser uma URL.");
      }

      const dateFormat = new Date().toLocaleTimeString("pt-br", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      const post = {
        title,
        img,
        desc,
        tags,
        id: dateFormat + user.uid,
        uid: user.uid,
        createdBy: user.displayName,
      };

      const res = await fetch(urlApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });

      const newPost = await res.json();

      setPosts((prevState) => [...prevState, newPost]);
      setData(post);
      setModalPost();
      setLoading(false);
    } else {
      setLoading(false);
      return setError("Preencha todos os campos!");
    }

    closeModal();
  };

  return (
    <>
      {modalPost && (
        <div className="newPost openModal">
          <div className="newPost-container">
            <button className="btn-close" onClick={closeModal}>
              <X size={24} color="#f1f5f9" />
            </button>

            <form className="form" onSubmit={handleNewPost}>
              <label>
                <span className="text-md">Titulo</span>
                <div className="box-input">
                  <input
                    required
                    type="title"
                    id="title"
                    placeholder="Titulo da sua postagem"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <TextT size="24" className="iconForm" />
                </div>
              </label>
              <label>
                <span className="text-md">URL da sua imagem</span>
                <div className="box-input">
                  <input
                    required
                    type="img"
                    id="img"
                    placeholder="https://image..."
                    value={img}
                    onChange={(e) => setImg(e.target.value)}
                  />
                  <Image size="24" className="iconForm" />
                </div>
              </label>
              <div className="infos">
                <label>
                  <span className="text-md">Descrição</span>
                  <div className="">
                    <textarea
                      required
                      id="description"
                      placeholder="Descrição da sua postagem"
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                    ></textarea>
                  </div>
                </label>

                <label className="tags-input">
                  <span className="text-md">Tags</span>
                  <div className="box-input">
                    <input
                      type="text"
                      name="tags"
                      placeholder="Insira as tags"
                      onChange={(e) => setTextTag(e.target.value)}
                      value={textTag}
                    />

                    <div
                      className="btn-tags"
                      onClick={() => {
                        if (textTag !== "") {
                          const tag = textTag.toLocaleLowerCase();
                          setTags((prev) => [...prev, tag]);
                          setTextTag("");
                        }
                      }}
                    >
                      <Check size={20} />
                    </div>
                  </div>
                </label>
              </div>

              <div className="tags">
                {tags.map((tag) => (
                  <p key={tag}>{tag}</p>
                ))}
              </div>
              {!loading && <button className="btn">POSTAR</button>}
              {loading && (
                <button className="btn disabled" disabled>
                  POSTANDO
                </button>
              )}
            </form>
            {error && <Error message={error} />}
          </div>
        </div>
      )}
    </>
  );
};
