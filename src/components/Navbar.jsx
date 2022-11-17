import "./Navbar.css";

import { useContext } from "react";

import { NavLink } from "react-router-dom";

import { List, X, Plus, UserPlus } from "phosphor-react";
import { Logo } from "./Logo";

import { Search } from "./Search";

import { ModalNewPostContext } from "../context/ModalNewPostContext";

import { useAuthentication } from "../hooks/useAuthentication";
import { useAuthValue } from "../context/AuthContext";
import { useState } from "react";

export const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const { user } = useAuthValue();
  const { logout } = useAuthentication();

  const { setModalPost } = useContext(ModalNewPostContext);

  function convertUserName() {
    if (user) {
      if (user.displayName) {
        const splitName = user.displayName.split("");
        let getLetter = splitName.findIndex((name) => name === " ");

        if (getLetter === -1) {
          const convertName = `${splitName[0]}`.toUpperCase();
          return convertName;
        } else {
          const convertName = `${splitName[0]}${
            splitName[getLetter + 1]
          }`.toUpperCase();

          return convertName;
        }
      } else {
        return <UserPlus size={20} color="#0f172a" />;
      }
    }
  }

  if (openMenu) {
    document.body.classList.add("openModal");
  } else {
    document.body.classList.remove("openModal");
  }

  return (
    <nav className={openMenu ? "navbar openMenu" : "navbar"}>
      <Logo />

      <Search />

      <div className="menu-btn">
        {openMenu ? (
          <X size={28} onClick={() => setOpenMenu(false)} />
        ) : (
          <List size={28} onClick={() => setOpenMenu(true)} />
        )}
      </div>

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
            <li onClick={() => setOpenMenu(false)}>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
            <li className="user-img">
              <span>{convertUserName()}</span>
            </li>
            <li onClick={() => setOpenMenu(false)}>
              <button
                className="btn-createNewPost"
                onClick={() => setModalPost(true)}
              >
                <Plus size="28" />
              </button>
            </li>
            <li onClick={() => setOpenMenu(false)}>
              <a onClick={logout}>Sair</a>
            </li>
          </>
        ) : null}

        {!user ? (
          <>
            <li onClick={() => setOpenMenu(false)}>
              <NavLink to="/login">Entrar</NavLink>
            </li>
            <li onClick={() => setOpenMenu(false)}>
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
