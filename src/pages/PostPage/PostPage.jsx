import "./PostPage.css";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

//Context
import { PostsContext } from "../../context/PostsContext";

//Components
import { Post } from "../../components/Post";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";

const urlApi = "http://localhost:3000/posts";

export const PostPage = () => {
  const [post, setPost] = useState();

  const { id } = useParams();
  const { data } = useContext(PostsContext);

  useEffect(() => {
    async function fetchPost() {
      const res = await fetch(`${urlApi}/${id}`);
      const data = await res.json();

      setPost(data);
    }

    fetchPost();
  }, [data]);

  return (
    <section className="post-page">
      <Navbar />
      <div className="wrappler">
        <div className="container">
          {post && (
            <Post
              img={post.img}
              title={post.title}
              desc={post.desc}
              tags={post.tags}
              createdBy={post.createdBy}
            />
          )}
        </div>
      </div>
      <Footer />
    </section>
  );
};
