import React from 'react'
import { Navbar } from "../../components/Navbar"
import { Footer } from '../../components/Footer'

export const Home = () => {
  return (
    <section className='home'>
      <Navbar />
      <div className='wrappler'>
        <div className='tt'>
          text
        </div>
      </div>
      <Footer/>
    </section>
  )
}