import "./NewPost.css";

import { TextT, Image, X } from "phosphor-react";

//Context
import { useState, useContext } from "react";
import { ModalNewPostContext } from "../context/ModalNewPostContext";

export const NewPost = () => {
  const { modalPost, setModalPost } = useContext(ModalNewPostContext);

  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");

  if(modalPost) {
    document.body.classList.add("openModal")
    
  }

  function closeModal() {
    document.body.classList.remove("openModal")
    setTitle("")
    setImg("")
    setModalPost(false)
  }

  return (
    <>
      {modalPost && (
        <div className="newPost openModal">

          <div className="newPost-container">
            <button className="btn-close" onClick={closeModal}>
              <X size={24} color="#f1f5f9" />
            </button>

            <form className="form">
              <label>
                <span className="text-md">Titulo</span>
                <div className="box-input">
                  <input
                    type="title"
                    name=""
                    id="title"
                    placeholder="Titulo da sua postagem"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <TextT size="24" className="iconForm"/>
                </div>
              </label>
              <label>
                <span className="text-md">URL da sua imagem</span>
                <div className="box-input">
                  <input
                    type="img"
                    name=""
                    id="img"
                    placeholder="https://image..."
                    value={img}
                    onChange={(e) => setImg(e.target.value)}
                  />
                  <Image size="24" className="iconForm" />
                </div>
              </label>
              <label>
                <span className="text-md">Titulo</span>
                <div className="">
                  <textarea name="" id="description"></textarea>
                </div>
              </label>
              <button className="btn">POSTAR</button>
            </form>
          </div>

        </div>
      )}
    </>
  );
};
