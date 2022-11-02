import './Home.css'
import { useEffect, useContext } from 'react'

//Components
import { Navbar } from "../../components/Navbar"
import { Footer } from '../../components/Footer'
import { Post } from "../../components/Post"

//Context
import { PostsContext } from "../../context/PostsContext"

const urlApi = "http://localhost:3000/posts"

export const Home = () => {

  const {posts, setPosts, data} = useContext(PostsContext)

  useEffect(() => {
    async function fetchPosts () {
      const res = await fetch(urlApi)
      const data = await res.json()

      const dataPosts = data.slice(0).reverse();

      setPosts(dataPosts)
    }

    fetchPosts()

  }, [data])
  

  return (
    <section className='home'>
      <Navbar />
      <div className='wrappler'>

        {posts.map(post => (
          <Post key={post.id} createdBy={post.createdBy} title={post.title} desc={post.desc} img={post.img} tags={post.tags}/>
        ))}
      </div>
      <Footer/>
    </section>
  )
}