import "./Login.css";
import { useState } from "react";

import { Link } from "react-router-dom";

import { Logo } from "../../components/Logo";
import { Envelope, Lock, ArrowBendDownLeft } from "phosphor-react";

import { useAuthentication } from "../../hooks/useAuthentication"

export const Login = () => {
  const { login } = useAuthentication()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(event) {
    event.preventDefault();

    if (email != "" && password != "") {

      const user = {
        email, 
        password
      }

      const response = await login(user)

      setEmail("");
      setPassword("");
      
    } else {
      alert("Erro!");
    }
  }


  return (
    <div className="login">
      <Link to="/" className="btn-backToHome">
        <ArrowBendDownLeft size={32} />
      </Link>
      <div className="form-heading">
        <Logo className="headind-xl" />
        <p className="text-lg">Faça login e compartilhe seus interesses!</p>
      </div>

      <form className="form" onSubmit={handleLogin}>
        <label>
          <span className="text-md">Endereço de e-mail</span>
          <div className="box-input">
            <Envelope size="24" color="#94a3b8" />
            <input
              type="email"
              name=""
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
              name=""
              id="password"
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </label>
        <button className="btn">ENTRAR</button>
      </form>
      <Link to="/register" className="create-account">
        Não possuí conta? Crie uma agora!
      </Link>
    </div>
  );
};
