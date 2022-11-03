import "./Home.css";
import { useEffect, useContext } from "react";

//Components
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { Post } from "../../components/Post";
import { Loading } from "../../components/Loading";
import { Error } from "../../components/Error";

//Context
import { PostsContext } from "../../context/PostsContext";
import { useState } from "react";

const urlApi = "http://localhost:3000/posts";

export const Home = () => {
  const { posts, setPosts, data } = useContext(PostsContext);

  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

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
