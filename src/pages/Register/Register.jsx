import "./Register.css";

import { Envelope, Lock, ArrowBendDownLeft, User } from "phosphor-react";
import { Link } from "react-router-dom";
import { Logo } from "../../components/Logo";
import { useState } from "react";

import { useAuthentication } from "../../hooks/useAuthentication";

export const Register = () => {

  const { createUser } = useAuthentication()

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(event) {
    event.preventDefault();
    
    if (userName != "" && email != "" && password != "") {

      const user = {
        userName,
        email,
        password,
      }

      const response = await createUser(user)

      setUserName("");
      setEmail("");
      setPassword("");

      window.location.reload();
    } else {
      alert("Erro!")
    }
  }

  return (
    <div className="register">
      <Link to="/" className="btn-backToHome">
        <ArrowBendDownLeft size={32} />
      </Link>
      <div className="form-heading">
        <Logo className="headind-xl" />
        <p className="text-lg">Cria sua conta para publicar suas postagens!</p>
      </div>

      <form className="form" onSubmit={handleRegister}>
        <label>
          <span className="text-md">Nome de usuário</span>
          <div className="box-input">
            <User size="24" color="#94a3b8" />
            <input
              type="text"
              id="userName"
              placeholder="Nome de usuário"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
        </label>
        <label>
          <span className="text-md">Endereço de e-mail</span>
          <div className="box-input">
            <Envelope size="24" color="#94a3b8" />
            <input
              type="email"
              id="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </label>
        <label>
          <span className="text-md">Sua senha</span>
          <div className="box-input">
            <Lock size="24" color="#94a3b8" />
            <input
              type="password"
              id="password"
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </label>
        <button className="btn">CRIAR CONTA</button>
      </form>
      <Link to="/login" className="login-account">
        Já possuí conta? Faça o login!
      </Link>
    </div>
  );
};
