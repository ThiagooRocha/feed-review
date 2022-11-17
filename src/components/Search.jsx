import "./Search.css";

import { useState, useContext } from "react";

import { Loading } from "../components/Loading";
import { Error } from "../components/Error";


import { useNavigate } from "react-router-dom";
import { MagnifyingGlass } from "phosphor-react";


export const Search = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(null);

  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();
    setLoading(true)
    if(search !== "") {
      navigate(`/search?q=${search}`)
      setSearch("");
      setLoading(false) 
    } else {
      navigate("/")
      setLoading(false) 
    }
  }

  return (
    <div className="search">
      <form onSubmit={handleSearch}>
        <div className="box-input">
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <button>
            <MagnifyingGlass size={20} weight="bold" />
          </button>
          {loading && <Loading />}
        </div>
      </form>
    </div>
  );
};
