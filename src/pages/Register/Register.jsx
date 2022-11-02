import "./Register.css";

import {
  Envelope,
  Lock,
  Eye,
  EyeSlash,
  ArrowBendDownLeft,
  User,
} from "phosphor-react";
import { Link } from "react-router-dom";
import { Logo } from "../../components/Logo";
import { Error } from "../../components/Error";
import { useEffect, useState, useRef } from "react";

import { useAuthentication } from "../../hooks/useAuthentication";

export const Register = () => {
  const inputRef = useRef();

  const { createUser, loading, error: authError } = useAuthentication();

  const [error, setError] = useState(null);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [typePassword, setTypePassword] = useState("password");

  async function handleRegister(event) {
    event.preventDefault();

    if (userName != "" && email != "" && password != "") {
      const user = {
        userName,
        email,
        password,
      };

      const response = await createUser(user);

      setUserName("");
      setEmail("");
      setPassword("");

      if (error !== null) {
        window.location.reload();
      }

    } else {
      inputRef.current.focus()
      setError("Preencha todos os campos!");
    }
  }

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <section className="register">
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
            <input
              ref={inputRef}
              type="text"
              id="userName"
              placeholder="Nome de usuário"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <User size="24" className="iconForm" />
          </div>
        </label>
        <label>
          <span className="text-md">Endereço de e-mail</span>
          <div className="box-input">
            <input
              type="email"
              id="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Envelope size="24" className="iconForm" />
          </div>
        </label>
        <label>
          <span className="text-md">Sua senha</span>
          <div className="box-input">
            <input
              type={typePassword}
              id="password"
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Lock size="24" className="iconForm" />
            {typePassword === "password" ? (
              <Eye
                className="iconPassword"
                size="20"
                onClick={() => setTypePassword("text")}
              />
            ) : (
              <EyeSlash
                className="iconPassword"
                size="20"
                onClick={() => setTypePassword("password")}
              />
            )}
          </div>
        </label>
        {!loading && <button className="btn">CRIAR CONTA</button>}
        {loading && <button className="btn disabled">CRIAR CONTA</button>}
      </form>
      {error && <Error message={error} />}
      <Link to="/login" className="login-account">
        Já possuí conta? Faça o login!
      </Link>
    </section>
  );
};
