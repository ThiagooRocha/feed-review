import React from 'react'
import { Navbar } from "../../components/Navbar"
import { Footer } from '../../components/Footer'

import { useState, useEffect } from 'react'

const urlApi = "http://localhost:3000/posts"

export const Home = () => {

  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function fetchPosts () {
      const res = await fetch(urlApi)
      const data = await res.json()

      console.log(data)
      setPosts(data)
    }

    fetchPosts()

  }, [])
  

  return (
    <section className='home'>
      <Navbar />
      <div className='wrappler'>

        {posts.map(post => (
          <li key={post.id}>
            <p>{post.title}</p>
            <p>{post.desc}</p>
            <p>{post.uid}</p>
            <img src={post.img} alt={post.title} />
           <p>{post.tags}</p>
            <p>{post.createdBy}</p>
          </li>
        ))}
      </div>
      <Footer/>
    </section>
  )
}