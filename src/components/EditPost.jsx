import "./EditPost.css";
import { Check } from "phosphor-react";

import { useState, useRef, useEffect } from "react";

import { X } from "phosphor-react";

import { Error } from "../components/Error";

export const EditPost = ({
  handleEditPost,
  titleEdit,
  descEdit,
  img,
  tags,
  tagsEdit,
  modalEditPost,
  setModalEditPost,
  loading,
  error,
  setError,
}) => {
  const [textTag, setTextTag] = useState("");

  const inputRef = useRef();

  useEffect(() => {
    if (inputRef) {
      inputRef.current.focus();
    }
  }, []);

  if (modalEditPost) {
    document.body.classList.add("active");
  }

  function closeModal() {
    document.body.classList.remove("active");
    titleEdit("");
    descEdit("");
    tagsEdit([]);
    setError(null);
    setModalEditPost(false);
  }

  return (
    <div className="editPost">
      <div className="container">
        <button onClick={closeModal} className="btn-close">
          <X size={24} color="#f1f5f9" />
        </button>
        <div className="box-img">
          <img src={img} />
        </div>
        <div></div>
        <form onSubmit={handleEditPost}>
          <label>
            <span className="text-md">Titulo</span>
            <div className="box-input">
              <input
                type="text"
                onChange={(e) => titleEdit(e.target.value)}
                ref={inputRef}
              />
            </div>
          </label>
          <div className="infos">
            <label className="textArea">
              <span className="text-md">Descrição</span>
              <div>
                <textarea onChange={(e) => descEdit(e.target.value)}></textarea>
              </div>
            </label>

            <label className="tags-input">
              <span className="text-md">Tags</span>
              <div className="box-input">
                <input
                  type="text"
                  onChange={(e) => setTextTag(e.target.value)}
                  value={textTag}
                />

                <div
                  className="btn-tags"
                  onClick={() => {
                    if (textTag !== "") {
                      const tag = textTag.toLocaleLowerCase();
                      tagsEdit((prev) => [...prev, tag]);
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
            {tags && tags.map((tag) => <p key={tag}>{tag}</p>)}
          </div>{" "}
          {loading && (
            <button className="btn disabled" disabled>
              SALVANDO
            </button>
          )}
          {!loading && <button className="btn">SALVAR</button>}
          {error && <Error message={error} />}
        </form>
      </div>
    </div>
  );
};
