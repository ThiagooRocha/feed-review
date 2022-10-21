import "./Navbar.css";

import { useContext } from "react"

import { NavLink } from "react-router-dom";

import { Plus, UserPlus } from "phosphor-react";
import { Logo } from "./Logo";

import { ModalNewPostProvider, ModalNewPostContext } from "../context/ModalNewPostContext";

import { useAuthentication } from "../hooks/useAuthentication";
import { useAuthValue } from "../context/AuthContext";

export const Navbar = () => {
  const { user } = useAuthValue();
  const { logout } = useAuthentication();

  function convertUserName() {
    if (user) {
      if (user.displayName) {
        const splitName = user.displayName.split("");
        let getLetter = splitName.findIndex((name) => name === " ");

        if (getLetter === -1) {
          getLetter = 0;
        }

        const convertName = `${splitName[0]}${
          splitName[getLetter + 1]
        }`.toUpperCase();

        return convertName;
      } else {
        return <UserPlus size={20} color="#0f172a" />;
      }
    }
  }

  const {setModalPost} = useContext(ModalNewPostContext)

  return (
      <nav className="navbar">
        <Logo />
        <ul>
          <li>
            <NavLink to="/" end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>

          {user ? (
            <>
              <li>
                <NavLink to="/dashboard">Dashboard</NavLink>
              </li>
              <li className="user-img">
                <span>{convertUserName()}</span>
              </li>
              <li>
                <button className="btn-createNewPost" onClick={() =>  setModalPost(true)}>
                  <Plus size="28" />
                </button>
              </li>
              <li>
                <a onClick={logout}>Sair</a>
              </li>
            </>
          ) : null}

          {!user ? (
            <>
              <li>
                <NavLink to="/login">Entrar</NavLink>
              </li>
              <li>
                <NavLink to="/register" className="btn-outline">
                  Criar conta <UserPlus size={20} weight="bold" />
                </NavLink>
              </li>
            </>
          ) : null}
        </ul>
      </nav>
  );
};
