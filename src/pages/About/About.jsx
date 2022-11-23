import "./About.css";

import { useContext } from "react";

import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { ModalNewPostContext } from "../../context/ModalNewPostContext";

import { Link } from "react-router-dom";

import { LinkedinLogo, GithubLogo } from "phosphor-react"

export const About = () => {
  const { setModalPost } = useContext(ModalNewPostContext);


  return (
    <section className="about">
      <Navbar />
      <div className="wrappler">
        <div className="heading">
          <h2>
            About 
          </h2>
          <p>
            <span>Feed</span>Review
          </p>
        </div>

        <div className="infos">
          <p>
            Desenvolvido com intuito de aprender sobre{" "}
            <span>Autenticação no Firebase.</span>
          </p>
          <p>
            <span>React-router</span> na criação de rotas baseadas na
            autenticação do usuario.
          </p>
          <p>
            Pesquisa individual de posts, dashboard com a funcionalidade de
            excluir ou editar os posts criados.
          </p>
          <p>
            Usando <span>json-sever</span> para armazenar os posts dos usuarios.
          </p>
          <p>
            Projeto criado por <a href="https://github.com/ThiagooRocha" target="blank"><span>Thiago Rocha.</span></a> 
          </p>
        </div>

        <ul className="contact">
          <li>
            <a
              href="https://www.linkedin.com/in/thiago-rocha-787468223/"
              target="blank"
            >
              <LinkedinLogo size={32} />
            </a>
          </li>
          <li>
            <a href="https://github.com/ThiagooRocha" target="blank">
              <GithubLogo size={32} />
            </a>
          </li>
        </ul>

        <div className="box-btn">
          <button className="btn-outline" onClick={() => setModalPost(true)}>Criar Postagem</button>
          <Link className="btn-outline" to="/">Ver Postagens</Link>
        </div>
      </div>
      <Footer />
    </section>
  );
};
