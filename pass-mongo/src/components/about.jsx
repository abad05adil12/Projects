import React from 'react'
import Navbar from "./components/navbar"
import Footer from "./components/footer"
const about = () => {
  return (
    <>
    <Navbar/>
    <div className=''>
      <p className='text-2xl text-white font-light'>Hey there i have this <span className='text-yellow-600'>Password UI</span> for saving your passwords in your local storage. Where you can Delete , <span className='text-yellow-600'>Edit</span> and Save you data securely.</p>
    </div>
    <p>Hello</p>
    <Footer/>
    </>
  )
}
export default about