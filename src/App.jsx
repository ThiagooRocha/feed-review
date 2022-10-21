import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

//Pages
import { Home } from "../src/pages/Home/Home";
import { About } from "../src/pages/About/About";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Register } from "./pages/Register/Register";
import { Login } from "./pages/Login/Login";

//Context
import { AuthProvider } from "./context/AuthContext";
import { useState, useEffect } from "react";
import { useAuthentication } from "./hooks/useAuthentication";
import { NewPost } from "./components/NewPost";

import { ModalNewPostProvider } from "./context/ModalNewPostContext";

export function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return (
      <div className="logo-loading logo">
        <a>
          Feed<span>Review</span>
        </a>
      </div>
    );
  }

  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <ModalNewPostProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/dashboard"
                element={user ? <Dashboard /> : <Navigate to="/" />}
              />
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="/register"
                element={!user ? <Register /> : <Navigate to="/" />}
              />
            </Routes>
          </BrowserRouter>
          {user? <NewPost /> : null}
        </ModalNewPostProvider>
      </AuthProvider>
    </div>
  );
}
