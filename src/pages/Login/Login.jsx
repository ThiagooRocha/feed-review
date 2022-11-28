import "./Login.css";
import { useEffect, useState, useRef } from "react";

import { Link } from "react-router-dom";

import { Logo } from "../../components/Logo";
import { Error } from "../../components/Error";

import {
  Envelope,
  Lock,
  Eye,
  EyeSlash,
  ArrowBendDownLeft,
} from "phosphor-react";

import { useAuthentication } from "../../hooks/useAuthentication";

export const Login = () => {
  const inputRef = useRef();

  const { login, loading, error: authError } = useAuthentication();

  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [typePassword, setTypePassword] = useState("password");

  async function handleLogin(event) {
    event.preventDefault();

    if (email != "" && password != "") {
      const user = {
        email,
        password,
      };

      const response = await login(user);

      setEmail("");
      setPassword("");

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
    <section className="login">
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
            <input
              ref={inputRef}
              type="email"
              name=""
              id="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
            />
            <Envelope size="24" className="iconForm" />
          </div>
        </label>
        <label>
          <span className="text-md">Sua senha</span>
          <div className="box-input">
            <input
              type={typePassword}
              name=""
              id="password"
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
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
        {!loading && <button className="btn">ENTRAR</button>}
        {loading && (
          <button className="btn disabled" disabled>
            ENTRAR
          </button>
        )}
      </form>
      {error && <Error message={error} />}
      <Link to="/register" className="create-account">
        Não possuí conta? Crie uma agora!
      </Link>
    </section>
  );
};
