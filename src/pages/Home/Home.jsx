import "./Home.css";
import { useEffect, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";


//Components
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { Post } from "../../components/Post";
import { Loading } from "../../components/Loading";
import { Error } from "../../components/Error";

//Context
import { PostsContext } from "../../context/PostsContext";
import { useState } from "react";


export const Home = () => {
  const { posts, setPosts, data } = useContext(PostsContext);
  
  const navigate = useNavigate()
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  
  
  const urlApi = "http://localhost:3000/posts";
  const urlSearch = `http://localhost:3000/posts?${searchParams}`;

  useEffect(() => {
    async function searchPosts() {
      try {
        const res = await fetch(urlSearch);
        const data = await res.json();

        const dataFormat = data.slice(0).reverse()

        if(!dataFormat.length) {
          navigate("/")
        } else {
          setPosts(dataFormat);
        }

      } catch (error) {
        console.log(error.message);
        setError("erro ao carregar os dados!");
        setLoading(false);
      }
    }
    searchPosts();
  }, [urlSearch]);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);

      try {
        const res = await fetch(urlApi);
        const data = await res.json();

        const dataPosts = data.slice(0).reverse();

        setPosts(dataPosts);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setError("erro ao carregar os dados!");
        setLoading(false);
      }
    }

    fetchPosts();
  }, [data]);

  return (
    <section className="home">
      <Navbar />
      <div className="wrappler">
        {!loading && (
          <>
            {posts.map((post) => (
              <Post
                key={post.id}
                createdBy={post.createdBy}
                title={post.title}
                desc={post.desc}
                img={post.img}
                tags={post.tags}
              />
            ))}
          </>
        )}
        {loading && <Loading />}
        {error && <Error message={error} />}
      </div>
      <Footer />
    </section>
  );
};
